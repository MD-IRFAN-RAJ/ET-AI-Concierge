from __future__ import annotations

from typing import Dict

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.api.profile import recompute_profile_state
from app.rl_engine.bandit import bandit_engine
from app.rl_engine.intelligence_engine import intel_engine
from app.services.hf_service import (
    combine_scores,
    detect_persona,
    get_product_scores,
    map_persona_to_internal,
)
from app.services.voice_service import build_voice_reply, speaking_state_payload

router = APIRouter()

PRODUCT_NAME_TO_ID: Dict[str, str] = {
    "ET Prime": "et-prime",
    "ET Markets": "et-markets",
    "ET Masterclass": "et-masterclass",
    "ET Money": "et-money",
    "ET Insurance": "et-insurance",
}

PRODUCT_ID_TO_NAME: Dict[str, str] = {
    "et-prime": "ET Prime",
    "et-markets": "ET Markets",
    "et-masterclass": "ET Masterclass",
    "et-money": "ET Money",
    "et-insurance": "ET Insurance",
}

ACTION_BY_PRODUCT: Dict[str, str] = {
    "et-prime": "read_prime",
    "et-markets": "explore_markets",
    "et-masterclass": "start_masterclass",
    "et-money": "start_sip",
    "et-insurance": "buy_insurance",
}


class VoiceChatRequest(BaseModel):
    text: str
    user_id: str = "demo-user"


class VoiceChatResponse(BaseModel):
    response: str
    persona: str
    recommendations: Dict[str, float]
    confidence: Dict[str, float]
    voice: Dict[str, str | bool]


@router.post("/voice-chat", response_model=VoiceChatResponse)
async def voice_chat(payload: VoiceChatRequest):
    user_text = payload.text.strip()
    if not user_text:
        raise HTTPException(status_code=400, detail="text is required")

    persona_result = detect_persona(user_text)
    internal_persona, persona_label = map_persona_to_internal(str(persona_result["persona"]))

    profile = recompute_profile_state(payload.user_id, persona_override=internal_persona)

    hf_scores = get_product_scores(user_text)

    rl_scores_named: Dict[str, float] = {
        PRODUCT_ID_TO_NAME.get(pid, pid): round(float(score) * 100.0, 2)
        for pid, score in profile.ET_product_affinity.items()
    }

    blended_scores = combine_scores(hf_scores, rl_scores_named)
    ranked = sorted(blended_scores.items(), key=lambda x: x[1], reverse=True)

    if ranked:
        top_product_name = ranked[0][0]
        top_product_id = PRODUCT_NAME_TO_ID.get(top_product_name, "et-prime")
        bandit_engine.track_interaction(payload.user_id, top_product_id, "interaction", value=1.0)
        intel_engine.observe_action(payload.user_id, ACTION_BY_PRODUCT.get(top_product_id, "read_prime"))

    recompute_profile_state(payload.user_id, persona_override=internal_persona)

    response_text = build_voice_reply(persona_label, ranked[:3])
    return VoiceChatResponse(
        response=response_text,
        persona=persona_label,
        recommendations=dict(ranked),
        confidence={
            "persona": round(float(persona_result["confidence"]) * 100.0, 2),
            "hf_weight": 70.0,
            "rl_weight": 30.0,
        },
        voice=speaking_state_payload(response_text),
    )
