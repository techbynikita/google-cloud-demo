# Troubleshooting Guide

## Issue: "Failed to load feedback"

### Check 1: Firestore Permissions

The Cloud Run service needs permission to access Firestore. Check:

1. **Go to Cloud Run service** → **PERMISSIONS** tab
2. **Service account**: Note the service account email (usually `xxxxx@techbynikita.iam.gserviceaccount.com`)
3. **Go to IAM & Admin**: https://console.cloud.google.com/iam-admin/iam?project=techbynikita
4. **Find the service account** and ensure it has:
   - `Cloud Datastore User` role
   - OR `Firestore User` role

### Check 2: Firestore Database

Verify the database exists:
- Go to: https://console.cloud.google.com/firestore/databases?project=techbynikita
- Database: `techbynikita-default` should exist
- Location: `asia-south1` (Mumbai)

### Check 3: Service Logs

View logs to see the actual error:

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=feedback-wall-v2" --limit 50 --project=techbynikita
```

Or in Console:
- Go to service → **LOGS** tab

### Check 4: Test API Directly

Test the API endpoint directly:

```bash
# Get service URL
SERVICE_URL=$(gcloud run services describe feedback-wall-v2 \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)')

# Test health endpoint
curl $SERVICE_URL/health

# Test feedback endpoint
curl $SERVICE_URL/api/feedback
```

### Check 5: Environment Variables

Verify environment variables are set:
- Go to service → **VARIABLES & SECRETS** tab
- `FIRESTORE_DATABASE` should be `techbynikita-default` (optional, has default)

### Check 6: Browser Console

Open browser DevTools (F12) → Console tab
- Look for network errors
- Check if `/api/feedback` request is being made
- See the actual error response

---

## Common Fixes

### Fix 1: Grant Firestore Permissions

```bash
# Get service account
SERVICE_ACCOUNT=$(gcloud run services describe feedback-wall-v2 \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(spec.template.spec.serviceAccountName)')

# Grant Firestore User role
gcloud projects add-iam-policy-binding techbynikita \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/datastore.user"
```

### Fix 2: Check Firestore Index

If you see "index not found" error:
- Go to Firestore → **Indexes** tab
- Create index for `feedback` collection on `timestamp` field (descending)

### Fix 3: Verify Route Order

The API routes must be defined BEFORE static file serving in `server.js`:
1. API routes (`/api/feedback`, `/health`)
2. Static files (`app.use(express.static('public'))`)
3. Catch-all (`app.get('*')`)

---

## Quick Test

Test if the service is working:

```bash
# 1. Health check
curl https://feedback-wall-v2-xxxxx-xx.a.run.app/health

# 2. API endpoint
curl https://feedback-wall-v2-xxxxx-xx.a.run.app/api/feedback

# 3. Submit feedback
curl -X POST https://feedback-wall-v2-xxxxx-xx.a.run.app/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"message": "Test", "author": "Test User"}'
```

If these work, the issue is in the frontend. If they don't, check backend/Firestore.

