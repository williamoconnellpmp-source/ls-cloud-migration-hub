# Fix CloudFront Access Denied Issues
# Run these commands in order

Write-Host "Step 1: Create Origin Access Control (OAC)" -ForegroundColor Green
$oacResult = aws cloudfront create-origin-access-control --origin-access-control-config file://cloudfront-oac-config.json
$oacId = ($oacResult | ConvertFrom-Json).OriginAccessControl.Id
Write-Host "OAC ID: $oacId" -ForegroundColor Yellow

Write-Host "`nStep 2: Get current CloudFront distribution config" -ForegroundColor Green
aws cloudfront get-distribution-config --id E3GKP8EZSZFBWI --output json > current-distribution-config.json

Write-Host "`nStep 3: Apply S3 bucket policy" -ForegroundColor Green
aws s3api put-bucket-policy --bucket ls-cloud-migration-hub-williamoconnellpmp --policy file://s3-bucket-policy.json

Write-Host "`nStep 4: Remove public access block (if needed)" -ForegroundColor Green
aws s3api delete-public-access-block --bucket ls-cloud-migration-hub-williamoconnellpmp

Write-Host "`nStep 5: Update CloudFront distribution with OAC" -ForegroundColor Green
Write-Host "MANUAL STEP REQUIRED:" -ForegroundColor Red
Write-Host "1. Edit current-distribution-config.json" -ForegroundColor Yellow
Write-Host "2. Add OriginAccessControlId: '$oacId' to the S3 origin" -ForegroundColor Yellow
Write-Host "3. Remove any OriginAccessIdentity settings" -ForegroundColor Yellow
Write-Host "4. Run: aws cloudfront update-distribution --id E3GKP8EZSZFBWI --distribution-config file://updated-distribution-config.json --if-match [ETAG]" -ForegroundColor Yellow

Write-Host "`nStep 6: Invalidate CloudFront cache" -ForegroundColor Green
aws cloudfront create-invalidation --distribution-id E3GKP8EZSZFBWI --paths "/*"

Write-Host "`nStep 7: Verify S3 bucket contents" -ForegroundColor Green
aws s3 ls s3://ls-cloud-migration-hub-williamoconnellpmp/ --recursive

Write-Host "`nCommon Issues to Check:" -ForegroundColor Cyan
Write-Host "- Ensure index.html exists in S3 bucket root" -ForegroundColor White
Write-Host "- Verify all HTML files have correct Content-Type (text/html)" -ForegroundColor White
Write-Host "- Check that S3 bucket is in the same region as expected" -ForegroundColor White
Write-Host "- Ensure CloudFront origin points to correct S3 domain" -ForegroundColor White