# Troubleshooting Build Issues

## Step 1: Pull Latest Changes in Cloud Shell

```bash
cd ~/google-cloud-demo
git pull
```

## Step 2: Check Build Logs

The error message shows a link to the build logs. Click it or run:

```bash
# Get the latest build ID
BUILD_ID=$(gcloud builds list --limit=1 --format='value(id)' --project=techbynikita)

# View detailed logs
gcloud builds log $BUILD_ID --project=techbynikita
```

## Step 3: Verify Files Are Present

```bash
cd ~/google-cloud-demo
ls -la backend/
# Should show: Dockerfile, package.json, server.js
```

## Step 4: Test Docker Build Locally (Optional)

If you want to test the Docker build locally in Cloud Shell:

```bash
cd ~/google-cloud-demo/backend
docker build -t test-backend .
```

This will show you the exact error.

## Common Issues

### Issue: "package.json not found"
- **Solution**: Make sure you're in the right directory and files are committed/pushed

### Issue: "npm install fails"
- **Solution**: Check if there are network issues or try with `--legacy-peer-deps` flag

### Issue: "COPY failed"
- **Solution**: Verify the build context includes all necessary files

## Get Detailed Error

Run the build with verbose logging:

```bash
gcloud builds submit --config=cloudbuild.yaml --project=techbynikita --verbosity=debug
```

