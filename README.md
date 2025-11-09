# Serverless Feedback Wall

A live demo showcasing the full power of Google Cloud's serverless stack.

## Architecture

- **Frontend**: React + Tailwind CSS, deployed on Cloud Run
- **Backend**: Node.js + Express, deployed on Cloud Run
- **Database**: Firestore (serverless NoSQL database)
- **Containerization**: Docker
- **CI/CD**: Cloud Build
- **Container Registry**: Artifact Registry

## Features

- Real-time feedback submission and display
- Auto-scaling serverless infrastructure
- Zero server management
- Pay-per-use pricing model
- Secure HTTPS endpoints

## Project Structure

```
.
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
├── cloudbuild.yaml    # Cloud Build configuration
└── README.md          # This file
```

## Configuration

- **Project ID**: `techbynikita`
- **Region**: `asia-south1` (Mumbai)
- **Firestore Database**: `techbynikita-default` ✅ (Already created)

## Setup Git Repository (Recommended)

### Step 1: Create Repository on GitHub/GitLab

1. **Create a new repository** on [GitHub](https://github.com/new) or [GitLab](https://gitlab.com/projects/new)
2. Name it: `serverless-feedback-wall` (or any name you prefer)
3. **Don't** initialize with README/gitignore (we already have these)
4. Copy the repository URL

### Step 2: Push Code to Repository

```bash
# Navigate to project directory
cd /Users/nikita.mourya/Nikita-Personal-Space/google-cloud

# Add all files
git add .

# Commit
git commit -m "Initial commit: Serverless Feedback Wall"

# Add remote (replace with your actual repo URL)
git remote add origin https://github.com/techbynikita/serverless-feedback-wall.git

# Push to repository
git branch -M main
git push -u origin main
```

### Step 3: Clone in Google Cloud Shell

1. **Open Cloud Shell**: https://shell.cloud.google.com/?project=techbynikita

2. **Clone your repository**:
   ```bash
   git clone https://github.com/techbynikita/serverless-feedback-wall.git
   cd serverless-feedback-wall
   ```

3. **Verify files**:
   ```bash
   ls -la
   ls frontend/
   ls backend/
   ```

**See `GIT-SETUP.md` for detailed Git setup instructions.**

## Deployment Steps

### Step 1: Set Google Cloud Project

```bash
gcloud config set project techbynikita
```

### Step 2: Enable Required APIs (One-time)

```bash
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  firestore.googleapis.com \
  --project=techbynikita
```

### Step 3: Create Artifact Registry (One-time)

```bash
gcloud artifacts repositories create feedback-wall \
  --repository-format=docker \
  --location=asia-south1 \
  --project=techbynikita
```

### Step 4: Configure Docker Authentication

```bash
gcloud auth configure-docker asia-south1-docker.pkg.dev
```

### Step 5: Deploy Application

**Option A: Using gcloud CLI**
```bash
gcloud builds submit --config=cloudbuild.yaml --project=techbynikita
```

**Option B: Using Google Cloud Console**
1. Go to [Cloud Build](https://console.cloud.google.com/cloud-build/builds?project=techbynikita)
2. Click "Run" or "Create Trigger"
3. Upload this folder or connect repository
4. Cloud Build will automatically use `cloudbuild.yaml`
5. Click "Run"

### Step 6: Get Service URLs

After deployment completes:

```bash
# Backend URL
gcloud run services describe feedback-wall-backend \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)'

# Frontend URL
gcloud run services describe feedback-wall-frontend \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)'
```

### Step 7: Update Frontend with Backend URL (If needed)

After first deployment, update frontend to use backend URL:

```bash
# Get backend URL
BACKEND_URL=$(gcloud run services describe feedback-wall-backend \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)')

# Redeploy frontend with backend URL
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_REGION=asia-south1,_ARTIFACT_REGISTRY=feedback-wall,_API_URL=$BACKEND_URL \
  --project=techbynikita
```

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

**Note**: Create `frontend/.env` file with:
```
VITE_API_URL=http://localhost:8080
```

## Architecture Details

- **Cloud Run**: Serverless container platform - auto-scales from 0 to 10 instances
- **Firestore**: Serverless NoSQL database - stores feedback in real-time
- **Artifact Registry**: Stores Docker container images
- **Cloud Build**: Automated CI/CD pipeline

