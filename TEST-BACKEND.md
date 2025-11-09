# Test Your Backend

## ✅ Your Backend is Live!

URL: `https://feedback-wall-backend-987410717236.asia-south1.run.app`

## Test Endpoints

### 1. Health Check
```
https://feedback-wall-backend-987410717236.asia-south1.run.app/health
```

Should return:
```json
{"status":"ok","service":"feedback-wall-backend"}
```

### 2. Get All Feedback
```
https://feedback-wall-backend-987410717236.asia-south1.run.app/api/feedback
```

### 3. Submit Feedback
```
POST https://feedback-wall-backend-987410717236.asia-south1.run.app/api/feedback
Content-Type: application/json

{
  "message": "Hello from the serverless feedback wall!",
  "author": "Your Name"
}
```

## Test in Browser

1. **Health Check**: Open `https://feedback-wall-backend-987410717236.asia-south1.run.app/health`
2. **Get Feedback**: Open `https://feedback-wall-backend-987410717236.asia-south1.run.app/api/feedback`

## Test with curl (in Cloud Shell)

```bash
# Health check
curl https://feedback-wall-backend-987410717236.asia-south1.run.app/health

# Get feedback
curl https://feedback-wall-backend-987410717236.asia-south1.run.app/api/feedback

# Submit feedback
curl -X POST https://feedback-wall-backend-987410717236.asia-south1.run.app/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Cloud Run!", "author": "Test User"}'
```

## Note

The root path `/` is not defined, which is why you see "Forbidden". Use the endpoints above instead.

