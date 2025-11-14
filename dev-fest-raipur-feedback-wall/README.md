# Feedback Wall V2 - Single Service Deployment

A full-stack serverless feedback wall application deployed as a **single Cloud Run service** using Cloud Run UI with GitHub integration.

## 🎯 Architecture

- **Single Dockerfile** - Builds both frontend (React) and backend (Express)
- **One Service** - Combined frontend + backend on Cloud Run
- **Express serves React** - Backend serves frontend static files
- **Firestore** - Serverless NoSQL database (`techbynikita-default`)

## 📁 Project Structure

```
feedback-wall-v2/
├── Dockerfile              # Single Dockerfile for combined app
├── backend/
│   ├── server.js          # Express API server
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/               # React application
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js    # Vite configuration
├── DEPLOY-SINGLE-SERVICE.md    # Deployment guide
├── ADD-FIRESTORE-PERMISSION.md # Prerequisites
├── TROUBLESHOOTING.md           # Debug guide
└── WHY-ARTIFACT-REGISTRY.md     # Architecture explanation
```

## 🚀 Quick Start

### Prerequisites

1. **Firestore Database**: `techbynikita-default` (already created)
2. **Service Account Permission**: `Cloud Datastore User` role
   - See [ADD-FIRESTORE-PERMISSION.md](./ADD-FIRESTORE-PERMISSION.md)

### Deployment Steps

1. **Go to Cloud Run Console**
   - https://console.cloud.google.com/run?project=techbynikita

2. **Create Service**
   - Click "CREATE SERVICE"
   - Service name: `feedback-wall-v2`
   - Region: `asia-south1`

3. **Connect GitHub**
   - Select "Continuously deploy from source repository"
   - Repository: `techbynikita/google-cloud-demo`
   - Branch: `main`
   - Dockerfile: `feedback-wall-v2/Dockerfile`
   - Context: `feedback-wall-v2`

4. **Configure Service**
   - Port: `8080`
   - Memory: 512 MiB
   - Allow unauthenticated: ✅ Yes

5. **Deploy**
   - Click "CREATE"

📖 **Detailed guide**: See [DEPLOY-SINGLE-SERVICE.md](./DEPLOY-SINGLE-SERVICE.md)

## 🔧 How It Works

```
Single Service (feedback-wall-v2)
│
├── Express Server (Port 8080)
│   ├── /api/feedback (GET, POST) → Firestore
│   ├── /health → Health check
│   └── /* → Serves React app (static files)
│
└── React Frontend (Built & Served as Static)
    └── Uses relative URLs (/api/feedback)
```

## 📊 Features

- ✅ **React Frontend** - Beautiful UI with Tailwind CSS
- ✅ **Node.js Backend** - Express API server
- ✅ **Firestore Integration** - Real-time database
- ✅ **Single Service** - Simpler architecture
- ✅ **Auto-deploy** - Push to GitHub = automatic deployment
- ✅ **Serverless** - Scales to zero, pay per use

## 🔄 Updates

When you push code to GitHub:
- Cloud Build automatically rebuilds
- New revision is deployed
- Zero downtime

## 📚 Documentation

- **[DEPLOY-SINGLE-SERVICE.md](./DEPLOY-SINGLE-SERVICE.md)** - Step-by-step deployment
- **[ADD-FIRESTORE-PERMISSION.md](./ADD-FIRESTORE-PERMISSION.md)** - Grant Firestore access
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Debug common issues
- **[WHY-ARTIFACT-REGISTRY.md](./WHY-ARTIFACT-REGISTRY.md)** - Architecture explanation

## 🆚 Comparison with V1

| Feature | V1 (Cloud Build) | V2 (Single Service) |
|---------|------------------|---------------------|
| Services | 2 (frontend + backend) | 1 (combined) |
| Dockerfiles | 2 | 1 |
| Deployment | CLI (`gcloud builds submit`) | UI + GitHub |
| Build Config | `cloudbuild.yaml` | Dockerfile only |
| Architecture | Separate services | Combined service |

## 🎯 Configuration

- **Project ID**: `techbynikita`
- **Region**: `asia-south1` (Mumbai)
- **Firestore Database**: `techbynikita-default`
- **Service Account**: `987410717236-compute@developer.gserviceaccount.com`

## ✅ After Deployment

### Get Service URL
```bash
gcloud run services describe feedback-wall-v2 \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)'
```

### Enable Public Access
If you see "Forbidden":
1. Go to service → **PERMISSIONS** tab
2. Click **"ADD PRINCIPAL"**
3. Principal: `allUsers`
4. Role: `Cloud Run Invoker`
5. Save

---

**Built with ❤️ using Google Cloud's serverless stack**
