# DevFest Raipur Feedback Wall

A full-stack serverless feedback wall application built for **DevFest Raipur** and deployed as a **single Cloud Run service** using Cloud Run UI with GitHub integration.

## 🎯 Architecture

- **Single Dockerfile** - Builds both frontend (React) and backend (Express)
- **One Service** - Combined frontend + backend on Cloud Run
- **Express serves React** - Backend serves frontend static files
- **Firestore** - Serverless NoSQL database (`techbynikita-default`)
- **Google Brand Colors** - Beautiful UI using Google's official color palette

## 📁 Project Structure

```
dev-fest-raipur-feedback-wall/
├── Dockerfile              # Single Dockerfile for combined app
├── backend/
│   ├── server.js          # Express API server
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/               # React application
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js    # Vite configuration
├── DEPLOYMENT-FLOW.md     # Complete deployment guide
├── DEMO-EXPLANATION.md    # Tech stack & architecture overview
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

1. **Firestore Database**: `techbynikita-default` (already created)
2. **Service Account Permission**: `Cloud Datastore User` role

### Deployment Steps

1. **Go to Cloud Run Console**
   - https://console.cloud.google.com/run?project=techbynikita

2. **Create Service**
   - Click "CREATE SERVICE"
   - Service name: `dev-fest-raipur-feedback-wall`
   - Region: `asia-south1`

3. **Connect GitHub**
   - Select "Continuously deploy from source repository"
   - Repository: `techbynikita/google-cloud` (or your repo name)
   - Branch: `main`
   - Dockerfile: `dev-fest-raipur-feedback-wall/Dockerfile`
   - Context: `dev-fest-raipur-feedback-wall`

4. **Configure Service**
   - Port: `8080`
   - Memory: 512 MiB
   - Allow unauthenticated: ✅ Yes

5. **Deploy**
   - Click "CREATE"

📖 **Detailed guide**: See [DEPLOYMENT-FLOW.md](./DEPLOYMENT-FLOW.md)

## 🔧 How It Works

```
Single Service (dev-fest-raipur-feedback-wall)
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

- ✅ **React Frontend** - Beautiful UI with Tailwind CSS and Google brand colors
- ✅ **Node.js Backend** - Express API server
- ✅ **Firestore Integration** - Real-time database
- ✅ **Single Service** - Simpler architecture
- ✅ **Auto-deploy** - Push to GitHub = automatic deployment
- ✅ **Serverless** - Scales to zero, pay per use
- ✅ **Google Cloud Integration** - Full serverless stack

## 🔄 Updates

When you push code to GitHub:
- Cloud Build automatically rebuilds
- New revision is deployed
- Zero downtime

## 📚 Documentation

- **[DEPLOYMENT-FLOW.md](./DEPLOYMENT-FLOW.md)** - Complete deployment flow & configuration guide
- **[DEMO-EXPLANATION.md](./DEMO-EXPLANATION.md)** - Tech stack, architecture, and demo explanation

## 🎨 Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Google Brand Colors** - Official Google color palette

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-Origin Resource Sharing

### Database
- **Google Cloud Firestore** - Serverless NoSQL database

### Deployment
- **Google Cloud Run** - Serverless container platform
- **Cloud Build** - Automated builds
- **Artifact Registry** - Docker image storage (automatic)

## 🎯 Configuration

- **Project ID**: `techbynikita`
- **Region**: `asia-south1` (Mumbai)
- **Firestore Database**: `techbynikita-default`
- **Service Name**: `dev-fest-raipur-feedback-wall`

## ✅ After Deployment

### Get Service URL
```bash
gcloud run services describe dev-fest-raipur-feedback-wall \
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

**Built with ❤️ for DevFest Raipur using Google Cloud's serverless stack** 🚀
