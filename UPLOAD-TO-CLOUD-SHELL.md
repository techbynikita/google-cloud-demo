# How to Upload Files to Google Cloud Shell

## Method 1: Upload Files via Cloud Shell UI (Easiest)

1. **Open Google Cloud Shell**: https://shell.cloud.google.com/?project=techbynikita

2. **Click the three-dot menu (⋮)** in the Cloud Shell toolbar

3. **Select "Upload file"** or **"Upload folder"**

4. **Upload your entire project folder**:
   - Select the `google-cloud` folder
   - Or upload individual files/folders (frontend/, backend/, cloudbuild.yaml)

5. **Files will appear in your Cloud Shell home directory** (`~/`)

6. **Navigate to the uploaded folder**:
   ```bash
   cd ~/google-cloud
   # or whatever name the folder was uploaded as
   ```

## Method 2: Using Git (Recommended for Updates)

### If you have a Git repository:

1. **In Cloud Shell, clone your repository**:
   ```bash
   git clone <your-repo-url>
   cd <repo-name>
   ```

2. **Or if you want to push from local to a new repo**:
   ```bash
   # On your local machine
   cd /Users/nikita.mourya/Nikita-Personal-Space/google-cloud
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   
   # Then in Cloud Shell
   git clone <your-github-repo-url>
   cd google-cloud
   ```

## Method 3: Create Files Directly in Cloud Shell

You can copy-paste file contents directly:

1. **Create directory structure**:
   ```bash
   mkdir -p google-cloud/{frontend/src/components,backend}
   cd google-cloud
   ```

2. **Create files using nano/vim**:
   ```bash
   nano cloudbuild.yaml
   # Paste content, save (Ctrl+X, Y, Enter)
   ```

3. **Or use echo/cat to create files**:
   ```bash
   cat > cloudbuild.yaml << 'EOF'
   # Paste your file content here
   EOF
   ```

## Method 4: Download from Local Machine to Cloud Shell

1. **In Cloud Shell, create a temporary upload script**:
   ```bash
   # This will show you a command to run on your local machine
   ```

2. **On your local machine, use gcloud to copy files**:
   ```bash
   # From your local terminal
   cd /Users/nikita.mourya/Nikita-Personal-Space/google-cloud
   
   # Create a tar archive
   tar -czf google-cloud.tar.gz .
   
   # Upload to Cloud Storage (temporary)
   gsutil mb gs://techbynikita-temp 2>/dev/null || true
   gsutil cp google-cloud.tar.gz gs://techbynikita-temp/
   
   # In Cloud Shell, download
   gsutil cp gs://techbynikita-temp/google-cloud.tar.gz .
   tar -xzf google-cloud.tar.gz
   rm google-cloud.tar.gz
   ```

## Quick Start After Upload

Once files are in Cloud Shell:

```bash
# Navigate to project directory
cd ~/google-cloud  # or wherever you uploaded

# Verify files are there
ls -la
ls frontend/
ls backend/

# Now follow the deployment steps from README.md
gcloud config set project techbynikita
# ... continue with deployment steps
```

## Recommended Approach

**For first time**: Use **Method 1** (Upload via UI) - it's the simplest.

**For ongoing updates**: Use **Method 2** (Git) - easier to sync changes.

