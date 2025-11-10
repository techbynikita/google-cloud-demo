# Feedback Wall V2 - Cloud Run UI Deployment

This is the second version of the Feedback Wall app, deployed using **Cloud Run UI** with GitHub integration.

## 📁 Structure

```
feedback-wall-v2/
├── backend/          # Node.js + Express API
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── frontend/         # React + Tailwind CSS
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
└── DEPLOY-CLOUD-RUN-UI.md  # Deployment guide
```

## 🚀 Deployment Method

**Cloud Run UI** - Deploy directly from GitHub using Dockerfiles

- No `cloudbuild.yaml` needed
- Deploy via Google Cloud Console UI
- Automatic builds on GitHub push
- Visual interface for management

## 📖 Deployment Guide

See **[DEPLOY-CLOUD-RUN-UI.md](./DEPLOY-CLOUD-RUN-UI.md)** for step-by-step instructions.

## 🔄 Differences from V1

| Feature | V1 (Cloud Build) | V2 (Cloud Run UI) |
|---------|------------------|-------------------|
| Build Config | `cloudbuild.yaml` | Dockerfile only |
| Deployment | CLI command | UI interface |
| GitHub | Manual push | Auto-deploy on push |
| Service Names | `feedback-wall-backend` | `feedback-wall-v2-backend` |

## ✅ Same Features

- React frontend with Tailwind CSS
- Node.js backend with Express
- Firestore database integration
- Real-time feedback updates
- Beautiful UI
- Serverless architecture

---

**Note**: This app uses the same Firestore database (`techbynikita-default`) as V1, so feedback will be shared between both versions.

