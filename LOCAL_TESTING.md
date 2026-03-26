# 🧪 Local Testing Guide (Before Deployment)

If you want to test your app locally before deploying to Railway + Vercel.

---

## Option 1: Run Backend & Frontend Separately (Recommended Quick Test)

### Terminal 1: Start Backend

```bash
cd /c/Users/mdirf/Desktop/ET/backend

# Activate venv (first time only)
python -m venv .venv
source .venv/Scripts/activate

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Expected output**:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Terminal 2: Start Frontend

```bash
cd /c/Users/mdirf/Desktop/ET/frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

**Expected output**:
```
> next dev
  ▲ Next.js
  ✓ Ready in 2.5s
```

### Terminal 3: Set Frontend Env (if needed)

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Then restart frontend (Terminal 2: Ctrl+C, then `npm run dev` again)

---

## Option 2: Run Full Stack with Docker Compose (Production-Like)

### Terminal 1: Start Everything

```bash
cd /c/Users/mdirf/Desktop/ET

# First time: build images
docker compose up --build

# Next time: just start
docker compose up
```

**Expected output**:
```
backend-1   | INFO:     Uvicorn running on http://0.0.0.0:8000
frontend-1  | ▲ Next.js - Ready in 2.5s
```

### To Stop:

```bash
Ctrl+C in terminal
# or
docker compose down
```

### View Logs:

```bash
docker compose logs -f           # All services
docker compose logs -f backend   # Just backend
docker compose logs -f frontend  # Just frontend
```

---

## Testing the App

### 1. Frontend UI

Open: http://localhost:3000

- Should load without errors
- Try all features that call backend

### 2. Backend API Docs

Open: http://localhost:8000/docs

- Interactive API documentation
- Try test endpoints
- Check `/api/v1/health` → `{"status": "ok"}`

### 3. Developer Console (Troubleshooting)

In browser:
1. Press **F12** (DevTools)
2. **Console** tab → see any errors
3. **Network** tab → see API calls
4. **Sources** tab → debug code

### 4. Backend Logs

Terminal 1 (backend) shows all requests:
```
INFO:     "POST /api/v1/chat HTTP/1.1" 200 OK
INFO:     "GET /api/v1/health HTTP/1.1" 200 OK
```

---

## Common Local Testing Issues

### Issue: Port Already in Use

**Error**: `Address already in use`

**Fix**:
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
uvicorn app.main:app --port 8001
```

### Issue: Frontend Can't Call Backend

**Symptom**: Something like "Failed to fetch from localhost:8000"

**Fix**:
1. Confirm `frontend/.env.local` has:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```
2. Restart frontend: Ctrl+C, `npm run dev`
3. Clear browser cache: Ctrl+Shift+Del → select all → clear

### Issue: Dependencies Not Installed

**Error**: `ModuleNotFoundError` or `Cannot find module`

**Fix (Backend)**:
```bash
cd backend
source .venv/Scripts/activate  # or .venv\Scripts\Activate.ps1 on Windows
pip install -r requirements.txt
```

**Fix (Frontend)**:
```bash
cd frontend
rm -rf node_modules
npm install
```

### Issue: Next.js Build Errors

**Error**: TypeScript or build errors

**Fix**:
```bash
cd frontend
npm run build  # Check for errors
npm run dev    # Try again
```

---

## Environment Variables During Local Testing

### Backend (.env file in backend/)

```
# For local development - no restrictions
CORS_ALLOWED_ORIGINS=*

# Or specific:
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Optional (improves performance even locally)
HF_API_TOKEN=your_token_here
```

### Frontend (.env.local in frontend/)

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

---

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Frontend loads at http://localhost:3000
- [ ] Backend docs load at http://localhost:8000/docs
- [ ] `/health` endpoint returns 200 OK
- [ ] API calls from frontend to backend succeed
- [ ] No CORS errors in console
- [ ] No network errors in DevTools
- [ ] All features work as expected
- [ ] Can refresh page → app still works

---

## Next: Deploy to Production

After local testing passes:

1. **Backend to Railway**: See [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
2. **Frontend to Vercel**: See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

---

## Quick Command Reference

```bash
# Backend
cd backend
source .venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Frontend
cd frontend
npm install
npm run dev

# Docker Compose
docker compose up --build       # First time
docker compose up               # Next time
docker compose down             # Stop
docker compose logs -f          # View logs
```

---

## File Structure for Reference

```
ET/
├── backend/
│   ├── app/
│   │   ├── main.py              ← FastAPI app
│   │   ├── api/                 ← Endpoints
│   │   │   ├── ai.py
│   │   │   ├── chat.py
│   │   │   ├── profile.py
│   │   │   ├── recommendations.py
│   │   │   └── tracking.py
│   │   ├── models/
│   │   ├── rl_engine/
│   │   └── services/
│   ├── .env                     ← Backend vars (don't commit!)
│   ├── .env.example             ← Template
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx         ← Homepage
│   │   ├── components/
│   │   └── utils/
│   ├── .env.local               ← Frontend vars (don't commit!)
│   ├── package.json
│   ├── next.config.ts
│   └── Dockerfile
├── docker-compose.yml           ← Local full-stack
└── DEPLOYMENT_QUICK_REFERENCE.md
```

---

## Ports Reference

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend | http://localhost:8000 | 8000 |
| Backend Docs | http://localhost:8000/docs | 8000 |

---

## Done Testing? ✅

Move on to:
- [DEPLOYMENT_QUICK_REFERENCE.md](DEPLOYMENT_QUICK_REFERENCE.md) - overview
- [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) - backend deployment
- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - frontend deployment
