# Quick Start Guide

## ✅ Build Successful!

Your backend is now deployed. Get your service URL:

```bash
gcloud run services describe feedback-wall-backend \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)'
```

## Test Your Backend

Your backend URL should be something like:
`https://feedback-wall-backend-987410717236.asia-south1.run.app`

### Test Endpoints:

1. **Root** (should work now):
   ```
   https://feedback-wall-backend-987410717236.asia-south1.run.app/
   ```

2. **Health Check**:
   ```
   https://feedback-wall-backend-987410717236.asia-south1.run.app/health
   ```

3. **Get Feedback**:
   ```
   https://feedback-wall-backend-987410717236.asia-south1.run.app/api/feedback
   ```

4. **Submit Feedback** (use curl or Postman):
   ```bash
   curl -X POST https://feedback-wall-backend-987410717236.asia-south1.run.app/api/feedback \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello from Cloud Run!", "author": "Test User"}'
   ```

## If You Still See "Forbidden"

Run this command to allow unauthenticated access:

```bash
gcloud run services add-iam-policy-binding feedback-wall-backend \
  --region=asia-south1 \
  --member="allUsers" \
  --role="roles/run.invoker" \
  --project=techbynikita
```

