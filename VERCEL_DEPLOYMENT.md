# Vercel Frontend Deployment Guide

## Quick Summary

Your frontend will run 24/7 on Vercel (always free and always available).

---

## Complete Checklist

### Before You Start
- [ ] Backend deployed on Railway with URL (e.g., `https://your-backend.up.railway.app`)
- [ ] Vercel account created (https://vercel.com)
- [ ] GitHub repo connected to Vercel (auto on first deploy)

---

## Step-by-Step Vercel Deployment

### Step 1: Install Vercel CLI

Open VS Code **Bash** at project root:

```bash
cd /c/Users/mdirf/Desktop/ET
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Browser opens → authenticate with GitHub → confirm

### Step 3: Deploy Frontend First Time

Navigate to frontend:

```bash
cd /c/Users/mdirf/Desktop/ET/frontend
vercel
```

When prompted:
- **Set up and deploy?** → `y`
- **Which scope?** → Select your personal account
- **Link to existing project?** → `n` (first time)
- **What's your project's name?** → `et-concierge` (or your choice)
- **In which directory is your code?** → `.`
- **Auto-detect Next.js settings?** → `y`
- **Create GitHub deployment?** → `y`

**Output**: Copy your preview URL (staging), like:
```
https://your-project.vercel.app
```

### Step 4: Add Environment Variables to Vercel

**DO NOT COMMIT** `.env.local` to GitHub (it's sensitive).

In Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Select your project (`et-concierge`)
3. **Settings** → **Environment Variables**
4. Click **"Add"** and set:

```
NEXT_PUBLIC_API_BASE_URL = https://your-backend.up.railway.app
```

**Why `NEXT_PUBLIC_`?** Makes var available to browser (frontend needs to call backend API)

5. Click **"Save"**

### Step 5: Deploy to Production

After adding env vars, redeploy to production:

```bash
vercel --prod
```

**Output**: Your production URL, like:
```
https://et-concierge.vercel.app
```

### Step 6: Update Railway CORS

**IMPORTANT**: Now that Vercel URL is live, update Railway:

1. Railway Dashboard → backend service → **Variables**
2. Update `CORS_ALLOWED_ORIGINS`:
   ```
   https://et-concierge.vercel.app
   ```
3. **Update** (Railway auto-redeploys)

### Step 7: Test Full Flow

1. Open your production frontend:
   ```
   https://et-concierge.vercel.app
   ```

2. Use app features that call backend

3. Open browser DevTools → **Network** tab

4. Confirm:
   - API calls go to `https://your-backend.up.railway.app` ✅
   - No CORS errors ✅
   - Responses are successful ✅

5. Check browser **Console** for any errors ✅

---

## Environment Variables Reference

| Variable | Where to Set | Value |
|----------|--------------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | Vercel Dashboard → Environment Variables | `https://your-backend.up.railway.app` |

---

## Auto-Deploy When Code Changes

By default, Vercel auto-deploys when you push to GitHub.

### To push changes:

```bash
cd /c/Users/mdirf/Desktop/ET
git add .
git commit -m "Update feature"
git push origin main
```

Vercel auto-detects and redeploys (2-5 minutes).

Check deployment status: Vercel Dashboard → Deployments tab

---

## Troubleshooting

### Issue: NEXT_PUBLIC_API_BASE_URL Not Working
**Symptom**: Frontend can't call backend

**Fix**:
1. Confirm you added `NEXT_PUBLIC_` prefix
2. Value must be full Railway URL:
   - ❌ Wrong: `localhost:8000` (local only)
   - ❌ Wrong: `your-backend` (incomplete)
   - ✅ Right: `https://your-backend.up.railway.app`
3. After changing, redeploy:
   ```bash
   vercel --prod
   ```

### Issue: Blank Page or 404 on Vercel
**Symptom**: Frontend URL returns blank page

**Fix**:
1. Check Vercel logs: Dashboard → Deployments → select deployment → **"Logs"**
2. Look for build errors
3. Redeploy from dashboard if needed

### Issue: CORS Error When Calling Backend
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Fix**:
1. Update Railway `CORS_ALLOWED_ORIGINS` to your Vercel URL
   ```
   https://et-concierge.vercel.app
   ```
2. Exact match required (including https://)
3. Redeploy Railway backend

### Issue: Changes Not Showing on Vercel
**Symptom**: Pushed code but changes don't appear

**Fix**:
1. Verify push: `git log --oneline` (see your commit)
2. Check Vercel Dashboard → Deployments (wait for auto-deploy, 2-5 min)
3. If still stuck: manually redeploy from Dashboard → **Deployments** → **Redeploy**
4. Clear browser cache: `Ctrl+Shift+Del`

---

## Monitoring

### View Deployment Logs
Vercel Dashboard → Deployments → select deployment → **Logs**

### View Real-Time Errors
Vercel Dashboard → **Functions** / **Monitoring** (if using serverless functions)

### Performance Analytics
Vercel Dashboard → **Analytics** (requires pro plan, but free analytics available)

---

## Cost Notes

- **Vercel free tier**: Completely free for this project
- **What's included**: 
  - Unlimited deployments
  - GitHub integration
  - Auto HTTPS/SSL
  - Global CDN
  - Custom domain support
- **When you pay**: Only if you scale heavily (100+ concurrent users, TB of bandwidth)

---

## Next Steps

1. ✅ Backend on Railway (24/7 uptime)
2. ✅ Frontend on Vercel (24/7 uptime)
3. ✅ Both connected via env vars

Your app is now production-ready!

---

## Final Verification Checklist

- [ ] Vercel frontend loads without errors
- [ ] Backend API calls succeed from frontend
- [ ] No CORS errors in browser console
- [ ] All app features work as expected
- [ ] Refresh page → app still works
- [ ] Go offline → backend still responds
- [ ] Laptop off → app still works ✅

---

## Updating Code in Future

Every time you want to update:

```bash
cd /c/Users/mdirf/Desktop/ET

# Make changes to code

git add .
git commit -m "Feature description"
git push origin main

# Wait 2-5 minutes for auto-deploy on both Vercel + Railway
```

Done! No manual deployment needed anymore.
