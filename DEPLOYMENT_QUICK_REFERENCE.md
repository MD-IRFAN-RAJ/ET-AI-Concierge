# 🚀 ET AI Concierge - Complete Deployment TL;DR

**Goal**: App runs 24/7 online (not on your laptop)  
**Solution**: Backend on Railway + Frontend on Vercel

---

## 1️⃣ BACKEND ENVIRONMENT VARIABLES (for Railway)

### Must Have:
```
CORS_ALLOWED_ORIGINS = https://you-project.vercel.app
```

### Strongly Recommended (for 10x better performance):
```
HF_API_TOKEN = hf_xxxxxxxxxxxx  (get from https://huggingface.co/settings/tokens)
HF_ZERO_SHOT_MODEL = facebook/bart-large-mnli
HF_EMBEDDER_MODEL = sentence-transformers/all-MiniLM-L6-v2
```

**Why HF_API_TOKEN?**
- WITHOUT: Cold starts = 5+ minutes, container = 2GB, slow
- WITH: Cold starts = 30 sec, container = 300MB, fast ✅

---

## 2️⃣ RAILWAY DEPLOYMENT (Backend)

```bash
# Terminal at project root
cd /c/Users/mdirf/Desktop/ET
git push origin main
```

Then in Railway Dashboard:
1. New Project → Deploy from GitHub
2. Select repo, set root to `backend/`
3. Deploy (auto detects Dockerfile)
4. Add env vars above in **Variables** tab
5. Copy your backend URL (https://your-backend.up.railway.app)

**Test**: Open https://your-backend.up.railway.app/docs → should show API docs ✅

---

## 3️⃣ VERCEL DEPLOYMENT (Frontend)

```bash
# Terminal at frontend
cd /c/Users/mdirf/Desktop/ET/frontend
npm install -g vercel
vercel login
vercel
vercel --prod
```

Then in Vercel Dashboard:
1. Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_BASE_URL = https://your-backend.up.railway.app`
3. Redeploy

**Result**: Get frontend URL like https://your-project.vercel.app

---

## 4️⃣ CONNECT THEM

### In Railway (after Vercel URL is live):
- Backend variables → `CORS_ALLOWED_ORIGINS = https://your-project.vercel.app`

### In Vercel:
- Environment variables → `NEXT_PUBLIC_API_BASE_URL = https://your-backend.up.railway.app`

---

## 5️⃣ TEST EVERYTHING

```bash
# Open these in browser
https://your-project.vercel.app                    # Frontend
https://your-backend.up.railway.app/docs           # Backend API docs

# DevTools → Network tab → use app → confirm API calls succeed
```

---

## 📋 Environment Variables Summary Table

| Variable | Set In | Value | Priority |
|----------|--------|-------|----------|
| `CORS_ALLOWED_ORIGINS` | Railway Variables | Your Vercel URL | 🔴 Required |
| `HF_API_TOKEN` | Railway Variables | Hugging Face token | 🟢 Recommended |
| `HF_ZERO_SHOT_MODEL` | Railway Variables | `facebook/bart-large-mnli` | 🟡 Optional |
| `HF_EMBEDDER_MODEL` | Railway Variables | `sentence-transformers/all-MiniLM-L6-v2` | 🟡 Optional |
| `NEXT_PUBLIC_API_BASE_URL` | Vercel Environment | Railway backend URL | 🔴 Required |

---

## 🔥 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| CORS error in frontend | `CORS_ALLOWED_ORIGINS` mismatch | Exact match your Vercel URL in Railway vars |
| Backend not responding | Env vars not set | Add to Railway Variables tab, redeploy |
| Slow cold starts (5+ min) | No `HF_API_TOKEN` | Add token to Railway Variables |
| Frontend can't call backend | `NEXT_PUBLIC_API_BASE_URL` wrong | Check prefix `NEXT_PUBLIC_`, exact URL match |
| Changes not appearing | Git not pushed | `git push origin main`, wait 2-5 min |

---

## 📁 Updated Files Reference

- [.env.example](backend/.env.example) - All backend env vars documented
- [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) - Detailed Railway setup guide
- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Detailed Vercel setup guide

---

## ✅ Success Checklist

- [ ] HF token created (https://huggingface.co/settings/tokens)
- [ ] Backend pushed to GitHub (`git push origin main`)
- [ ] Backend deployed on Railway
- [ ] Backend env vars set in Railway Dashboard
- [ ] Backend URL copied (https://your-backend.up.railway.app)
- [ ] Frontend deployed on Vercel
- [ ] Frontend env var set in Vercel Dashboard
- [ ] Railway CORS updated with Vercel URL
- [ ] Both URLs tested in browser ✅
- [ ] API calls work without CORS errors ✅

---

## 🎯 One-Line Summary

```
Backend: Railway (env vars: CORS_ALLOWED_ORIGINS, HF_API_TOKEN)
Frontend: Vercel (env var: NEXT_PUBLIC_API_BASE_URL = backend URL)
Result: 24/7 uptime, laptop can be off
```

---

## 📞 If Stuck

1. Check [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) - Troubleshooting section
2. Check [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Troubleshooting section
3. View Railway logs: Dashboard → backend → Logs
4. View Vercel logs: Dashboard → Deployments → select → Logs
5. Verify env vars exactly match (no spaces, no typos)
