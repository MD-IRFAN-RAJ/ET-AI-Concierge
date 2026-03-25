import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import ai, chat, profile, recommendations, tracking

app = FastAPI(
    title="ET AI Concierge OS API",
    description="Intelligent Financial Operating System API for the Economic Times",
    version="1.0.0"
)

def _parse_origins(raw: str) -> list[str]:
    if not raw or raw.strip() == "*":
        return ["*"]
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


# CORS config
cors_origins = _parse_origins(os.getenv("CORS_ALLOWED_ORIGINS", "*"))
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok", "message": "ET AI Concierge OS is running"}

app.include_router(chat.router, prefix="/api/v1/chat", tags=["chat"])
app.include_router(profile.router, prefix="/api/v1/profile", tags=["profile"])
app.include_router(recommendations.router, prefix="/api/v1/recommend", tags=["recommend"])
app.include_router(tracking.router, prefix="/api/v1/track", tags=["track"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["ai"])
