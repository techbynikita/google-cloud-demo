# Add Firestore Permission via UI - Step by Step

This guide shows exactly how to grant Firestore access to your Cloud Run service account.

## 📋 Prerequisites

1. ✅ Google Cloud Project: `techbynikita`
2. ✅ Cloud Run service created: `feedback-wall-v2`
3. ✅ Service account: `987410717236-compute@developer.gserviceaccount.com`

## 🎯 Step-by-Step Instructions

### Step 1: Open IAM & Admin

1. Go to: https://console.cloud.google.com/iam-admin/iam?project=techbynikita
2. Or navigate: **IAM & Admin** → **IAM** (from left menu)

### Step 2: Find Your Service Account

1. In the IAM page, look for the service account:
   ```
   987410717236-compute@developer.gserviceaccount.com
   ```
2. You'll see it has roles like:
   - Artifact Registry Writer
   - Cloud Run Admin
   - Editor
   - Logs Writer
   - Service Account User

### Step 3: Grant Firestore Permission

**Method A: Edit Existing Service Account**

1. Find the row with `987410717236-compute@developer.gserviceaccount.com`
2. Click the **pencil icon (✏️)** on the right side of that row
3. Click **"ADD ANOTHER ROLE"** button
4. In the role dropdown, type: `datastore`
5. Select: **"Cloud Datastore User"**
6. Click **"SAVE"**

**Method B: Grant Access (Alternative)**

1. Click the **"GRANT ACCESS"** button at the top
2. In **"New principals"** field, paste:
   ```
   987410717236-compute@developer.gserviceaccount.com
   ```
3. Click **"SELECT A ROLE"** dropdown
4. Type: `datastore`
5. Select: **"Cloud Datastore User"**
6. Click **"SAVE"**

### Step 4: Verify Permission Added

After saving, you should see the service account now has:
- ✅ Artifact Registry Writer
- ✅ Cloud Run Admin
- ✅ Editor
- ✅ Logs Writer
- ✅ Service Account User
- ✅ **Cloud Datastore User** ← NEW!

### Step 5: Wait for Propagation

- Wait **10-30 seconds** for the permission to propagate
- No need to restart or rebuild the service

### Step 6: Test Your App

1. Go to your app: `https://feedback-wall-v2-xxxxx-xx.a.run.app`
2. Refresh the page
3. The "Failed to load feedback" error should be gone
4. You should see an empty feedback list (or existing feedback)

---

## 🔍 Alternative: Check via Service Account Page

### Method: Direct Service Account Access

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=techbynikita
2. Find: `987410717236-compute@developer.gserviceaccount.com`
3. Click on it
4. Go to **"PERMISSIONS"** tab
5. Click **"GRANT ACCESS"**
6. Add role: **"Cloud Datastore User"**
7. Save

---

## ✅ Quick Verification

After adding the permission, test the API:

```bash
# Get your service URL first
SERVICE_URL=$(gcloud run services describe feedback-wall-v2 \
  --region=asia-south1 \
  --project=techbynikita \
  --format='value(status.url)')

# Test the API
curl $SERVICE_URL/api/feedback
```

Should return: `[]` (empty array) or existing feedback data.

---

## 🎯 What This Permission Does

**Cloud Datastore User** role allows the service account to:
- ✅ Read data from Firestore
- ✅ Write data to Firestore
- ✅ Query collections
- ✅ Access the `feedback` collection

---

## 📝 Summary

1. Go to **IAM & Admin** → **IAM**
2. Find `987410717236-compute@developer.gserviceaccount.com`
3. Click **Edit (pencil icon)**
4. Add role: **Cloud Datastore User**
5. **Save**
6. Wait 30 seconds
7. Test your app

**That's it!** Your app should now be able to access Firestore! 🎉

