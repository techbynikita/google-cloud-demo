# Git Setup Guide

## Step 1: Initialize Git Repository (Already Done)

The repository has been initialized. Now you need to:

## Step 2: Create a Repository on GitHub/GitLab

### Option A: GitHub

1. Go to https://github.com/new
2. Repository name: `serverless-feedback-wall` (or any name you prefer)
3. Make it **Public** or **Private** (your choice)
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Option B: GitLab

1. Go to https://gitlab.com/projects/new
2. Create blank project
3. Set project name and visibility
4. Click "Create project"

## Step 3: Add Files and Push to Repository

Run these commands in your terminal:

```bash
# Navigate to project directory
cd /Users/nikita.mourya/Nikita-Personal-Space/google-cloud

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Serverless Feedback Wall"

# Add remote repository (replace with your actual repo URL)
# For GitHub:
git remote add origin https://github.com/techbynikita/serverless-feedback-wall.git

# Or for GitLab:
# git remote add origin https://gitlab.com/techbynikita/serverless-feedback-wall.git

# Push to repository
git branch -M main
git push -u origin main
```

## Step 4: Clone in Google Cloud Shell

Once your code is on GitHub/GitLab:

1. **Open Cloud Shell**: https://shell.cloud.google.com/?project=techbynikita

2. **Clone your repository**:
   ```bash
   git clone https://github.com/techbynikita/serverless-feedback-wall.git
   # or
   git clone https://gitlab.com/techbynikita/serverless-feedback-wall.git
   ```

3. **Navigate to project**:
   ```bash
   cd serverless-feedback-wall
   ```

4. **Verify files**:
   ```bash
   ls -la
   ls frontend/
   ls backend/
   ```

5. **Now follow deployment steps from README.md**

## Updating Code

When you make changes locally:

```bash
# On your local machine
cd /Users/nikita.mourya/Nikita-Personal-Space/google-cloud
git add .
git commit -m "Your commit message"
git push
```

Then in Cloud Shell:

```bash
cd serverless-feedback-wall
git pull
# Continue with deployment
```

## Benefits of Git Approach

✅ Code is backed up in the cloud
✅ Easy to sync between local and Cloud Shell
✅ Version control for your project
✅ Can collaborate with others
✅ Easy to update and redeploy

