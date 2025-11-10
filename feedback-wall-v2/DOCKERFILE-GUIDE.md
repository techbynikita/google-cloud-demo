# Dockerfile Selection Guide

When deploying via Cloud Run UI, you need to create **TWO separate services**, each with its own Dockerfile.

## 🎯 Service 1: Backend

### Dockerfile Location:
```
feedback-wall-v2/backend/Dockerfile
```

### Configuration:
- **Service Name**: `feedback-wall-v2-backend`
- **Dockerfile Path**: `feedback-wall-v2/backend/Dockerfile`
- **Docker Context**: `feedback-wall-v2/backend`
- **Port**: `8080`

### What this builds:
- Node.js backend API
- Express server
- Firestore integration

---

## 🎨 Service 2: Frontend

### Dockerfile Location:
```
feedback-wall-v2/frontend/Dockerfile
```

### Configuration:
- **Service Name**: `feedback-wall-v2-frontend`
- **Dockerfile Path**: `feedback-wall-v2/frontend/Dockerfile`
- **Docker Context**: `feedback-wall-v2/frontend`
- **Port**: `8080`
- **Build Argument**: 
  - Name: `VITE_API_URL`
  - Value: `https://feedback-wall-v2-backend-xxxxx-xx.a.run.app` (backend URL)

### What this builds:
- React application
- Built with Vite
- Served with Nginx

---

## 📋 Step-by-Step in Cloud Run UI

### For Backend Service:

1. **CREATE SERVICE** → Name: `feedback-wall-v2-backend`
2. **Source**: Connect GitHub repository
3. **Dockerfile location**: 
   ```
   feedback-wall-v2/backend/Dockerfile
   ```
4. **Docker context**: 
   ```
   feedback-wall-v2/backend
   ```
5. Deploy

### For Frontend Service:

1. **CREATE SERVICE** → Name: `feedback-wall-v2-frontend`
2. **Source**: Connect GitHub repository
3. **Dockerfile location**: 
   ```
   feedback-wall-v2/frontend/Dockerfile
   ```
4. **Docker context**: 
   ```
   feedback-wall-v2/frontend
   ```
5. **Build arguments**:
   - Add: `VITE_API_URL` = `https://feedback-wall-v2-backend-xxxxx-xx.a.run.app`
6. Deploy

---

## 🗂️ File Structure

```
google-cloud/
├── feedback-wall-v2/
│   ├── backend/
│   │   ├── Dockerfile      ← Use this for BACKEND service
│   │   ├── server.js
│   │   └── package.json
│   │
│   └── frontend/
│       ├── Dockerfile      ← Use this for FRONTEND service
│       ├── src/
│       └── package.json
```

---

## ✅ Quick Reference

| Service | Dockerfile Path | Context |
|---------|----------------|---------|
| Backend | `feedback-wall-v2/backend/Dockerfile` | `feedback-wall-v2/backend` |
| Frontend | `feedback-wall-v2/frontend/Dockerfile` | `feedback-wall-v2/frontend` |

---

## 💡 Important Notes

1. **Two Separate Services**: You create 2 different Cloud Run services
2. **Different Dockerfiles**: Each service uses its own Dockerfile
3. **Backend First**: Deploy backend first to get its URL
4. **Frontend Second**: Use backend URL as build argument for frontend
5. **Same Repository**: Both services connect to the same GitHub repo

---

## 🎯 Visual Guide

```
Cloud Run Console
│
├── Service 1: feedback-wall-v2-backend
│   └── Dockerfile: feedback-wall-v2/backend/Dockerfile
│
└── Service 2: feedback-wall-v2-frontend
    └── Dockerfile: feedback-wall-v2/frontend/Dockerfile
```

That's it! Two services, two Dockerfiles! 🚀

