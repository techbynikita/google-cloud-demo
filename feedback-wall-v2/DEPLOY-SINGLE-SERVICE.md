# Deploy Single Service via Cloud Run UI

This guide shows how to deploy the **combined frontend + backend** as **ONE service** using Cloud Run UI.

## 🎯 Architecture

- **One Dockerfile** - Builds both frontend and backend
- **One Service** - Single Cloud Run service
- **Express serves React** - Backend serves frontend static files
- **Firestore** - Same database (`techbynikita-default`)

## 📋 Deployment Steps

### Step 1: Go to Cloud Run Console
- Open: https://console.cloud.google.com/run?project=techbynikita
- Click **"CREATE SERVICE"**

### Step 2: Configure Service
- **Service name**: `feedback-wall-v2`
- **Region**: `asia-south1` (Mumbai)
- **Platform**: Cloud Run (fully managed)

### Step 3: Source Code
- Select **"Continuously deploy new revisions from a source repository"**
- Click **"SET UP WITH CLOUD BUILD"**
- **Repository**: Select your GitHub repository (`techbynikita/google-cloud-demo`)
- **Branch**: `main`
- **Build type**: Dockerfile
- **Dockerfile location**: `feedback-wall-v2/Dockerfile`
- **Docker context**: `feedback-wall-v2` (or leave empty, it will use root)

### Step 4: Container Settings
- **Port**: `8080`
- **CPU**: 1
- **Memory**: 512 MiB (or 1 GiB for better performance)
- **Min instances**: 0
- **Max instances**: 10

### Step 5: Environment Variables (Optional)
- `FIRESTORE_DATABASE`: `techbynikita-default`
- `PORT`: `8080` (usually set automatically)

### Step 6: Authentication
- **Allow unauthenticated invocations**: ✅ Check this

### Step 7: Click "CREATE"

---

## ✅ After Deployment

### Get Service URL:
```bash
gcloud run services describe feedback-wall-v2 \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)'
```

### Enable Public Access:
If you see "Forbidden":
1. Go to service → **PERMISSIONS** tab
2. Click **"ADD PRINCIPAL"**
3. Principal: `allUsers`
4. Role: `Cloud Run Invoker`
5. Save

---

## 🏗️ How It Works

```
Single Service (feedback-wall-v2)
│
├── Express Server (Port 8080)
│   ├── /api/feedback (GET, POST) → Firestore
│   ├── /health → Health check
│   └── /* → Serves React app (static files)
│
└── React Frontend (Built & Served as Static)
    └── Uses relative URLs to call /api/feedback
```

---

## 📁 Dockerfile Structure

The Dockerfile:
1. **Stage 1**: Builds React frontend
2. **Stage 2**: Sets up Node.js backend
3. **Copies** built frontend to `/public` folder
4. **Express** serves both API and static files

---

## 🔄 Updates

When you push to GitHub:
- Cloud Build automatically rebuilds
- New revision is deployed
- Zero downtime deployment

---

## 🎉 Benefits

- ✅ **One Service** - Simpler architecture
- ✅ **One Dockerfile** - Easier to manage
- ✅ **Same Domain** - No CORS issues
- ✅ **Auto-deploy** - Push to GitHub = deploy
- ✅ **Firestore** - Same database as V1

---

## 📊 Comparison

| Feature | V1 (Cloud Build) | V2 (Single Service) |
|---------|-------------------|---------------------|
| Services | 2 (frontend + backend) | 1 (combined) |
| Dockerfiles | 2 | 1 |
| Deployment | CLI command | UI + GitHub |
| Architecture | Separate services | Combined service |

---

**That's it! One service, one Dockerfile, fully serverless!** 🚀

