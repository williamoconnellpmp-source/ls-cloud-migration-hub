# .\cloudformation\prod\deploy-prod.ps1

$ErrorActionPreference = "Stop"
$env:AWS_DEFAULT_REGION = "us-west-2"

# -------------------------
# Fixed settings (per decisions)
# -------------------------
$EnvironmentName    = "prod"
$HostedDomainPrefix = "vdc-prod-williamoconnellpmp"
$CallbackUrls       = "http://localhost:3000/life-sciences/app/login,https://williamoconnellpmp.com/life-sciences/app/login"
$LogoutUrls         = "http://localhost:3000/life-sciences/app/login,https://williamoconnellpmp.com/life-sciences/app/login"

# Start OFF, flip ON after smoke test
$EnforceApproverMfa = "false"

# Audit WORM (locked)
$AuditWormEnabled       = "true"
$AuditWormMode          = "COMPLIANCE"
$AuditWormRetentionDays = "90"

# Stacks
$IdentityStack = "vdc-prod-identity"
$AppStack      = "vdc-prod-app"

# Templates
$IdentityTemplate = ".\cloudformation\prod\vdc-prod-identity.yaml"
$AppTemplate      = ".\cloudformation\prod\vdc-prod-app.yaml"

# CFN artifacts bucket (deployment support bucket)
# IMPORTANT: this is NOT your docs bucket and NOT your WORM bucket.
$ArtifactsBucket = "vdc-cfn-artifacts-391611737316-usw2"
$ArtifactsPrefix = "vdc/prod"

# DEV lambdas to clone (exactly your 8)
$DevLambdas = @(
  "vdc-upload-init-dev",
  "vdc-submit-dev",
  "vdc-approvals-pending-dev",
  "vdc-approve-dev",
  "vdc-reject-dev",
  "vdc-download-dev",
  "vdc-documents-list-dev",
  "vdc-document-audit-dev"
)

# Local artifacts dir
$LocalArtifactsDir = ".\cloudformation\prod\artifacts"
New-Item -ItemType Directory -Force $LocalArtifactsDir | Out-Null

Write-Host "Verifying AWS identity/region..."
aws sts get-caller-identity | Out-Host
Write-Host "Region: $env:AWS_DEFAULT_REGION"

# Ensure artifacts bucket exists
Write-Host "Ensuring artifacts bucket exists: $ArtifactsBucket"
try {
  aws s3api head-bucket --bucket $ArtifactsBucket | Out-Null
} catch {
  aws s3api create-bucket --bucket $ArtifactsBucket --create-bucket-configuration LocationConstraint=us-west-2 | Out-Null
  aws s3api put-bucket-versioning --bucket $ArtifactsBucket --versioning-configuration Status=Enabled | Out-Null
  aws s3api put-public-access-block --bucket $ArtifactsBucket --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true | Out-Null
}

# -------------------------
# 1) Deploy Identity stack
# -------------------------
Write-Host "Deploying Identity stack: $IdentityStack"
aws cloudformation deploy `
  --stack-name $IdentityStack `
  --template-file $IdentityTemplate `
  --capabilities CAPABILITY_NAMED_IAM `
  --parameter-overrides `
    EnvironmentName=$EnvironmentName `
    HostedDomainPrefix=$HostedDomainPrefix `
    CallbackUrls=$CallbackUrls `
    LogoutUrls=$LogoutUrls | Out-Host

# Read Identity outputs
Write-Host "Reading Identity outputs..."
$identity = aws cloudformation describe-stacks --stack-name $IdentityStack --query "Stacks[0].Outputs" --output json | ConvertFrom-Json

function Get-OutputValue($outputs, $key) {
  ($outputs | Where-Object { $_.OutputKey -eq $key } | Select-Object -First 1 -ExpandProperty OutputValue)
}

$userPoolId = Get-OutputValue $identity "CognitoUserPoolId"
$clientId   = Get-OutputValue $identity "CognitoAppClientId"
$issuerUrl  = Get-OutputValue $identity "CognitoIssuerUrl"

Write-Host "CognitoUserPoolId: $userPoolId"
Write-Host "CognitoAppClientId: $clientId"
Write-Host "CognitoIssuerUrl: $issuerUrl"

if ([string]::IsNullOrWhiteSpace($userPoolId) -or [string]::IsNullOrWhiteSpace($clientId) -or [string]::IsNullOrWhiteSpace($issuerUrl)) {
  throw "Missing required Identity outputs. Check vdc-prod-identity outputs."
}

# -------------------------
# 2) Download DEV lambda code packages (read-only) and upload to artifacts bucket
# -------------------------
Write-Host "Downloading DEV Lambda ZIPs to: $LocalArtifactsDir"
foreach ($fn in $DevLambdas) {
  $zipName = $fn.Replace("-dev","") + ".zip"  # vdc-submit.zip etc.
  $localZip = Join-Path $LocalArtifactsDir $zipName

  Write-Host "  -> Fetching code location for $fn"
  $codeUrl = aws lambda get-function --function-name $fn --query "Code.Location" --output text

  if ([string]::IsNullOrWhiteSpace($codeUrl)) {
    throw "Could not get Code.Location for $fn. Check permissions."
  }

  Write-Host "  -> Downloading $zipName"
  Invoke-WebRequest -Uri $codeUrl -OutFile $localZip

  Write-Host "  -> Uploading to s3://$ArtifactsBucket/$ArtifactsPrefix/$zipName"
  aws s3 cp $localZip "s3://$ArtifactsBucket/$ArtifactsPrefix/$zipName" | Out-Null
}

# -------------------------
# 3) Deploy App stack
# -------------------------
Write-Host "Deploying App stack: $AppStack"
aws cloudformation deploy `
  --stack-name $AppStack `
  --template-file $AppTemplate `
  --capabilities CAPABILITY_NAMED_IAM `
  --parameter-overrides `
    EnvironmentName=$EnvironmentName `
    CognitoIssuerUrl=$issuerUrl `
    CognitoClientId=$clientId `
    LambdaArtifactsBucket=$ArtifactsBucket `
    LambdaArtifactsPrefix=$ArtifactsPrefix `
    EnforceApproverMfa=$EnforceApproverMfa `
    AuditWormEnabled=$AuditWormEnabled `
    AuditWormMode=$AuditWormMode `
    AuditWormRetentionDays=$AuditWormRetentionDays | Out-Host

Write-Host "App stack outputs:"
aws cloudformation describe-stacks --stack-name $AppStack --query "Stacks[0].Outputs" --output table | Out-Host

# -------------------------
# 4) Create Cognito groups (idempotent)
# -------------------------
Write-Host "Ensuring Cognito groups exist (Submitter, Approver)..."
try { aws cognito-idp create-group --user-pool-id $userPoolId --group-name Submitter | Out-Null } catch {}
try { aws cognito-idp create-group --user-pool-id $userPoolId --group-name Approver  | Out-Null } catch {}

Write-Host "DONE."
Write-Host "Next steps:"
Write-Host "  1) Create 2 Submitters + 2 Approvers in the PROD User Pool"
Write-Host "  2) Smoke test auth + workflow"
Write-Host "  3) Flip EnforceApproverMfa=true via stack update when ready"
Write-Host "  4) Update .env.production for frontend and deploy to S3/CloudFront"
