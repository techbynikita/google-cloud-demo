# Serverless Feedback Wall

A simple serverless backend API built with Node.js, Express, and Firestore, deployed on Google Cloud Run.

## Project Structure

```
.
├── backend/           # Node.js/Express backend API
├── cloudbuild.yaml    # Cloud Build configuration
└── README.md          # This file
```

## Configuration

- **Project ID**: `techbynikita`
- **Region**: `asia-south1` (Mumbai)
- **Firestore Database**: `techbynikita-default`

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/techbynikita/google-cloud-demo.git
cd google-cloud-demo
```

### 2. Deploy

```bash
gcloud builds submit --config=cloudbuild.yaml --project=techbynikita
```

### 3. Get Service URL

```bash
gcloud run services describe feedback-wall-backend \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)'
```

## API Endpoints

- `GET /` - Service information
- `GET /health` - Health check
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Submit feedback

## Local Development

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:8080`
