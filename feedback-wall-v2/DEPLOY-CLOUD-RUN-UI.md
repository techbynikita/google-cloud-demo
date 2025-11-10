# Deploy via Cloud Run UI (GitHub + Dockerfile)

This guide shows how to deploy the Feedback Wall app using **Cloud Run UI** directly with GitHub integration, instead of Cloud Build.

## 📋 Prerequisites

1. ✅ GitHub repository: `https://github.com/techbynikita/google-cloud-demo`
2. ✅ Google Cloud Project: `techbynikita`
3. ✅ Firestore database: `techbynikita-default` (already created)

## 🚀 Step 1: Deploy Backend

### 1.1 Go to Cloud Run Console
- Open: https://console.cloud.google.com/run?project=techbynikita
- Click **"CREATE SERVICE"**

### 1.2 Configure Service
- **Service name**: `feedback-wall-v2-backend`
- **Region**: `asia-south1` (Mumbai)
- **Platform**: Cloud Run (fully managed)

### 1.3 Source Code
- Select **"Continuously deploy new revisions from a source repository"**
- Click **"SET UP WITH CLOUD BUILD"**
- **Repository**: Select your GitHub repository
- **Branch**: `main`
- **Build type**: Dockerfile
- **Dockerfile location**: `feedback-wall-v2/backend/Dockerfile`
- **Docker context**: `feedback-wall-v2/backend`

### 1.4 Container Settings
- **Port**: `8080`
- **CPU**: 1
- **Memory**: 512 MiB
- **Min instances**: 0
- **Max instances**: 10

### 1.5 Authentication
- **Allow unauthenticated invocations**: ✅ Check this

### 1.6 Environment Variables (Optional)
- `FIRESTORE_DATABASE`: `techbynikita-default`

### 1.7 Click "CREATE"

---

## 🎨 Step 2: Deploy Frontend

### 2.1 Create Another Service
- Click **"CREATE SERVICE"** again

### 2.2 Configure Service
- **Service name**: `feedback-wall-v2-frontend`
- **Region**: `asia-south1` (Mumbai)
- **Platform**: Cloud Run (fully managed)

### 2.3 Source Code
- Select **"Continuously deploy new revisions from a source repository"**
- Click **"SET UP WITH CLOUD BUILD"**
- **Repository**: Select your GitHub repository
- **Branch**: `main`
- **Build type**: Dockerfile
- **Dockerfile location**: `feedback-wall-v2/frontend/Dockerfile`
- **Docker context**: `feedback-wall-v2/frontend`

### 2.4 Build Arguments
- **Build arguments**: 
  - Name: `VITE_API_URL`
  - Value: `https://feedback-wall-v2-backend-xxxxx-xx.a.run.app` (use your backend URL)

**Note**: You'll need to get the backend URL first from Step 1, then update this.

### 2.5 Container Settings
- **Port**: `8080`
- **CPU**: 1
- **Memory**: 256 MiB
- **Min instances**: 0
- **Max instances**: 10

### 2.6 Authentication
- **Allow unauthenticated invocations**: ✅ Check this

### 2.7 Click "CREATE"

---

## 🔄 Alternative: Update Frontend After Backend Deployment

If you already created the frontend service, you can update it:

1. Go to the frontend service
2. Click **"EDIT & DEPLOY NEW REVISION"**
3. Go to **"Variables & Secrets"** tab
4. Add build argument:
   - `VITE_API_URL` = `https://feedback-wall-v2-backend-xxxxx-xx.a.run.app`
5. Click **"DEPLOY"**

---

## 📝 Quick Steps Summary

### Backend:
1. Cloud Run → CREATE SERVICE
2. Connect GitHub repo
3. Dockerfile: `feedback-wall-v2/backend/Dockerfile`
4. Port: 8080
5. Allow unauthenticated
6. Deploy

### Frontend:
1. Cloud Run → CREATE SERVICE
2. Connect GitHub repo
3. Dockerfile: `feedback-wall-v2/frontend/Dockerfile`
4. Build arg: `VITE_API_URL` = backend URL
5. Port: 8080
6. Allow unauthenticated
7. Deploy

---

## ✅ After Deployment

### Get Service URLs:
```bash
# Backend URL
gcloud run services describe feedback-wall-v2-backend \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)'

# Frontend URL
gcloud run services describe feedback-wall-v2-frontend \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)'
```

### Enable Public Access:
If you see "Forbidden", enable public access:
1. Go to service → **PERMISSIONS** tab
2. Click **"ADD PRINCIPAL"**
3. Principal: `allUsers`
4. Role: `Cloud Run Invoker`
5. Save

---

## 🎉 Benefits of Cloud Run UI Deployment

- ✅ **Visual Interface** - No command line needed
- ✅ **GitHub Integration** - Automatic deployments on push
- ✅ **Easy Updates** - Just push to GitHub
- ✅ **Build Logs** - View in Cloud Console
- ✅ **Service Management** - All in one place

---

## 📊 Comparison

| Feature | Cloud Build (v1) | Cloud Run UI (v2) |
|---------|------------------|-------------------|
| Deployment | `gcloud builds submit` | UI clicks |
| GitHub Integration | Manual | Automatic |
| Build Config | `cloudbuild.yaml` | Dockerfile only |
| Updates | Manual build | Auto on push |

Both methods work great! Choose what you prefer! 🚀

