# 🌩️ Serverless Feedback Wall

A beautiful full-stack serverless application showcasing the power of Google Cloud's serverless stack.

## ✨ Features

- **React Frontend** - Beautiful UI with Tailwind CSS
- **Node.js Backend** - Express API with Firestore integration
- **Serverless Architecture** - Deployed on Cloud Run
- **Real-time Updates** - Live feedback display
- **Auto-scaling** - Scales from 0 to 10 instances automatically
- **Zero Ops** - Fully managed by Google Cloud

## 🏗️ Architecture

- **Frontend**: React + Tailwind CSS → Cloud Run
- **Backend**: Node.js + Express → Cloud Run  
- **Database**: Firestore (serverless NoSQL)
- **Build**: Cloud Build (automated CI/CD)
- **Registry**: Artifact Registry (Docker images)

## 🚀 Quick Deploy

### In Cloud Shell:

```bash
cd ~/google-cloud-demo
git pull
gcloud builds submit --config=cloudbuild.yaml --project=techbynikita
```

### After Deployment:

```bash
# Get frontend URL
gcloud run services describe feedback-wall-frontend \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)'

# Get backend URL
gcloud run services describe feedback-wall-backend \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)'
```

## 📝 Configuration

- **Project**: `techbynikita`
- **Region**: `asia-south1` (Mumbai)
- **Firestore**: `techbynikita-default`

## 🎨 What You'll See

A beautiful feedback wall with:
- Gradient header with welcome message
- Real-time feedback submission
- Live updates every 3 seconds
- Beautiful card-based UI
- Responsive design

## 💻 Local Development

### Backend:
```bash
cd backend
npm install
npm run dev
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` with:
```
VITE_API_URL=http://localhost:8080
```
