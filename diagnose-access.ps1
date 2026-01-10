# Diagnose CloudFront Access Issues
Write-Host "=== CloudFront Access Diagnosis ===" -ForegroundColor Green

Write-Host "`n1. Checking S3 bucket contents..." -ForegroundColor Yellow
aws s3 ls s3://ls-cloud-migration-hub-williamoconnellpmp/ --recursive | Select-Object -First 10

Write-Host "`n2. Checking S3 bucket policy..." -ForegroundColor Yellow
aws s3api get-bucket-policy --bucket ls-cloud-migration-hub-williamoconnellpmp 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "No bucket policy found - this is likely the issue!" -ForegroundColor Red
}

Write-Host "`n3. Checking S3 public access block..." -ForegroundColor Yellow
aws s3api get-public-access-block --bucket ls-cloud-migration-hub-williamoconnellpmp

Write-Host "`n4. Checking CloudFront distribution..." -ForegroundColor Yellow
aws cloudfront get-distribution --id E3GKP8EZSZFBWI --query 'Distribution.DistributionConfig.Origins.Items[0]'

Write-Host "`n5. Testing direct S3 access..." -ForegroundColor Yellow
$s3Url = "https://ls-cloud-migration-hub-williamoconnellpmp.s3.amazonaws.com/index.html"
Write-Host "Testing: $s3Url"
try {
    $response = Invoke-WebRequest -Uri $s3Url -Method Head -ErrorAction Stop
    Write-Host "S3 Direct Access: SUCCESS" -ForegroundColor Green
} catch {
    Write-Host "S3 Direct Access: FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n6. Testing CloudFront access..." -ForegroundColor Yellow
# You'll need to replace with your actual CloudFront domain
Write-Host "Test your CloudFront domain manually in browser" -ForegroundColor Cyan