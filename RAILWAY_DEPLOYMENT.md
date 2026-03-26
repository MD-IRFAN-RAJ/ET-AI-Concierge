# Railway Deployment Guide for ET AI Concierge Backend

## Quick Summary

Your backend will run 24/7 on Railway with these environment variables set.

---

## Environment Variables Checklist

### Required Variables

| Variable | Value | Where to get it |
|----------|-------|-----------------|
| `CORS_ALLOWED_ORIGINS` | `https://your-project.vercel.app` | From Vercel after frontend deployment |

### Recommended Variables (for better performance)

| Variable | Value | Where to get it |
|----------|-------|-----------------|
| `HF_API_TOKEN` | Your token | https://huggingface.co/settings/tokens |
| `HF_ZERO_SHOT_MODEL` | `facebook/bart-large-mnli` | Default (don't change unless needed) |
| `HF_EMBEDDER_MODEL` | `sentence-transformers/all-MiniLM-L6-v2` | Default (don't change unless needed) |

---

## Step-by-Step Railway Setup

### Step 1: Create Hugging Face Token (5 minutes)

1. Go to: https://huggingface.co/settings/tokens
2. Click **"New token"**
3. Name: `railway-backend`
4. Type: `read`
5. Click **"Create token"**
6. Copy the token (you'll use it in Railway)

**Why?** Without HF token, your container will download 2GB+ of models on startup → slow cold starts, larger container. With token, uses API instead → fast, lightweight.

### Step 2: Deploy Backend on Railway

1. Go to Railway dashboard: https://railway.app/dashboard
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repo: `ET-AI-Concierge`
4. Set **Source Directory** to: `backend`
5. Railroad detects `backend/Dockerfile` automatically
6. Click **"Deploy"**

**Wait for build** (2-5 minutes)

### Step 3: Get Your Backend URL

After deployment:
1. Go to Railway project
2. Click "backend" service
3. Under "Deployments" → View current deployment
4. Copy public URL (looks like: `https://your-backend.up.railway.app`)

**Save this URL** — you'll need it for Vercel.

### Step 4: Set Environment Variables in Railway

1. In Railway project, select **"backend"** service
2. Go to **"Variables"** tab
3. Click **"New Variable"** and add:

```
CORS_ALLOWED_ORIGINS = https://your-project.vercel.app
HF_API_TOKEN = hf_xxxxxxxxxxxx (your token from Step 1)
HF_ZERO_SHOT_MODEL = facebook/bart-large-mnli
HF_EMBEDDER_MODEL = sentence-transformers/all-MiniLM-L6-v2
```

4. Click **"Create"** for each variable
5. Railway auto-redeploys when vars are added

**Wait for redeploy** (1-2 minutes)

### Step 5: Verify Backend is Working

Open in browser:
```
https://your-backend.up.railway.app/docs
```

Should see **FastAPI Swagger docs** ✅

Test the `/api/v1/health` endpoint — should return `{"status": "ok"}`

---

## Environment Variables Explained

### CORS_ALLOWED_ORIGINS
- **What**: Tells backend which frontends can call it
- **Why**: Security (prevents requests from unknown origins)
- **Set to**: Your Vercel frontend URL
- **Example**: `https://et-concierge.vercel.app`

### HF_API_TOKEN
- **What**: Hugging Face API authentication
- **Why**: Uses HF Inference API instead of downloading 2GB models locally
- **Impact without it**: Cold starts slow (5+ min), larger container (~2GB)
- **Impact with it**: Fast starts (30-60 sec), lightweight container (<500MB)
- **Get token**: https://huggingface.co/settings/tokens

### HF_ZERO_SHOT_MODEL
- **What**: Model for classifying user personas (beginner, trader, investor, etc.)
- **Only used if**: `HF_API_TOKEN` is set
- **Default**: `facebook/bart-large-mnli` (don't change)

### HF_EMBEDDER_MODEL
- **What**: Model for embedding text → recommendations ranking
- **Only used if**: `HF_API_TOKEN` is set
- **Default**: `sentence-transformers/all-MiniLM-L6-v2` (don't change)

---

## Testing Your Deployment

### From Frontend (Vercel)
1. Open your Vercel frontend URL
2. Use app features that call backend
3. Open browser DevTools → Network tab
4. Confirm API calls go to `https://your-backend.up.railway.app`
5. No CORS errors ✅

### From Terminal
```bash
# Test health endpoint
curl https://your-backend.up.railway.app/api/v1/health

# Expected response:
# {"status":"ok","message":"ET AI Concierge OS is running"}
```

### View Logs in Railway
1. Railway project → backend service
2. **"Logs"** tab
3. See all incoming requests in real-time

---

## Troubleshooting

### Issue: CORS Error in Frontend
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Fix**:
1. Check `CORS_ALLOWED_ORIGINS` in Railway variables
2. It must match **exactly** your Vercel frontend URL
3. Examples:
   - ❌ Wrong: `vercel.app` (missing https://)
   - ❌ Wrong: `https://yourdomain.com` (should be `https://your-project.vercel.app`)
   - ✅ Right: `https://et-concierge.vercel.app`

### Issue: Slow Cold Starts
**Symptom**: First request takes 5+ minutes

**Fix**: Add `HF_API_TOKEN` to Railway variables (see Step 1 and 4)

### Issue: Backend Returns 502 Bad Gateway
**Symptom**: `https://your-backend.up.railway.app` returns error

**Fix**:
1. Check Railway logs for errors
2. Try redeploying: Railway project → Deployments → **Redeploy** button
3. Check all env vars are set correctly

### Issue: Frontend Can't Call Backend
**Symptom**: Network requests fail silently

**Fix**:
1. Confirm `NEXT_PUBLIC_API_BASE_URL` in Vercel matches your Railway backend URL
2. Confirm `CORS_ALLOWED_ORIGINS` in Railway has your Vercel URL
3. Clear browser cache and refresh

---

## Monitoring & Logs

### View Real-Time Logs
Railway Dashboard → backend → **"Logs"** tab

### Monitor Performance
Railway Dashboard → backend → **"Metrics"** tab
- CPU usage
- Memory usage
- Disk I/O

### Get Alerts
Railway Dashboard → Project Settings → **"Notifications"**
- Set up email alerts for deployment failures

---

## Updating Backend Code

When you push code to GitHub:

1. Push to `main` branch:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. Railway auto-detects and redeploys
3. Check deployment status in Railway Dashboard
4. Test endpoint after redeployment

**No manual Docker commands needed!** Railway handles it.

---

## Cost Notes

- Railway free tier: $5/month credits
- Typical usage: $0-2/month for this backend
- You won't pay unless you exceed free tier
- Can monitor spend in Project Settings

---

## Next: Vercel Frontend Setup

After verifying backend works:

1. Use `NEXT_PUBLIC_API_BASE_URL = https://your-backend.up.railway.app` in Vercel
2. Deploy frontend to Vercel
3. Test full flow

See: `VERCEL_DEPLOYMENT.md` (if available)
