# Why Artifact Registry is Required

## 🎯 Simple Answer

**Artifact Registry stores your Docker images** that Cloud Run uses to deploy your service.

## 📊 The Deployment Flow

```
GitHub Repository
    ↓
Cloud Build (builds Docker image)
    ↓
Artifact Registry (stores Docker image)
    ↓
Cloud Run (pulls image and runs it)
```

## 🔍 Detailed Explanation

### Step 1: You Push Code to GitHub
- Your code (Dockerfile, source files) is in GitHub

### Step 2: Cloud Build Builds Docker Image
- Cloud Build reads your `Dockerfile`
- Builds a Docker image (contains your app)
- **This image needs to be stored somewhere**

### Step 3: Artifact Registry Stores the Image
- Cloud Build pushes the image to Artifact Registry
- Artifact Registry = Docker image storage (like Docker Hub, but private)

### Step 4: Cloud Run Deploys from Artifact Registry
- Cloud Run pulls the image from Artifact Registry
- Runs your container
- Serves your app

## 💡 Why Not Store Images Elsewhere?

### Option 1: Artifact Registry (What we use)
- ✅ **Integrated with Google Cloud**
- ✅ **Private and secure**
- ✅ **Fast access for Cloud Run**
- ✅ **Automatic with Cloud Build**

### Option 2: Docker Hub
- ❌ Requires separate account
- ❌ Public images (unless paid)
- ❌ Slower for Cloud Run

### Option 3: Container Registry (Old)
- ⚠️ Deprecated (being replaced by Artifact Registry)

## 🎯 In Your Use Case

When you deploy via **Cloud Run UI with GitHub**:

1. **You connect GitHub repo** → Cloud Build watches it
2. **You push code** → Cloud Build automatically builds
3. **Cloud Build creates Docker image** → Needs storage
4. **Artifact Registry stores it** → Required step
5. **Cloud Run pulls image** → Deploys your service

## 📝 What Happens Behind the Scenes

When you create a service in Cloud Run UI:

```
1. Cloud Build builds: docker build -t IMAGE_NAME .
2. Cloud Build pushes: docker push IMAGE_NAME → Artifact Registry
3. Cloud Run pulls: docker pull IMAGE_NAME from Artifact Registry
4. Cloud Run runs: docker run IMAGE_NAME
```

## 🔧 Artifact Registry Setup

### Automatic Creation
- When you first deploy via Cloud Run UI, it **automatically creates** an Artifact Registry repository
- Usually named: `cloud-run-source-deploy` or similar
- Location: Same region as your Cloud Run service

### Manual Creation (if needed)
```bash
gcloud artifacts repositories create feedback-wall \
  --repository-format=docker \
  --location=asia-south1 \
  --project=techbynikita
```

## ✅ Why It's Required

**Without Artifact Registry:**
- ❌ No place to store Docker images
- ❌ Cloud Run can't pull images
- ❌ Deployment fails

**With Artifact Registry:**
- ✅ Images are stored securely
- ✅ Cloud Run can pull and deploy
- ✅ Automatic integration with Cloud Build

## 🎯 Summary

**Artifact Registry = Docker Image Storage**

It's the **middleman** between:
- **Cloud Build** (builds images)
- **Cloud Run** (runs images)

Just like you need a **warehouse** to store products before shipping them to stores!

---

## 📊 Visual Flow

```
┌─────────────┐
│   GitHub    │ (Your code)
└──────┬──────┘
       │
       ↓
┌─────────────┐
│ Cloud Build │ (Builds Docker image)
└──────┬──────┘
       │
       ↓
┌──────────────────┐
│ Artifact Registry│ ← **REQUIRED** (Stores image)
└──────┬───────────┘
       │
       ↓
┌─────────────┐
│ Cloud Run   │ (Pulls image and runs it)
└─────────────┘
```

**Without Artifact Registry, the image has nowhere to go!** 🚀

