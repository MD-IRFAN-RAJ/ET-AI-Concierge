from fastapi import APIRouter, HTTPException
from app.models.schemas import TrackingEvent
from app.rl_engine.bandit import bandit_engine
from app.api.profile import recompute_profile_state, get_or_create_profile

router = APIRouter()

from app.rl_engine.intelligence_engine import intel_engine


def _to_action_key(product_id: str, event_type: str) -> str:
    if product_id == "et-markets":
        return "explore_markets"
    if product_id == "et-masterclass":
        return "start_masterclass"
    if product_id == "et-money":
        return "start_sip"
    if product_id == "et-insurance":
        return "buy_insurance"
    if product_id == "et-prime" and event_type == "read":
        return "read_prime"
    if product_id == "et-prime":
        return "read_prime"
    return "explore_markets"

@router.post("/")
async def record_event(event: TrackingEvent, persona: str = "beginner", user_id: str = "demo-user"):
    if not event.product_id:
        return {"status": "ignored", "reason": "No product associated with event"}

    profile = get_or_create_profile(user_id)
    value = float(event.duration_ms or 1000) / 1000.0

    # Rule 2 + Rule 3 + Rule 8: interaction tracking and cross-sell scoring updates.
    bandit_engine.track_interaction(user_id, event.product_id, event.event_type, value=value)
    intel_engine.observe_action(user_id, _to_action_key(event.product_id, event.event_type))

    # Update live profile with the new event.
    user_profile = recompute_profile_state(user_id, persona_override=persona or profile.persona)
    probabilities = bandit_engine.get_probabilities(user_id)
    ranked_ids = bandit_engine.get_ranked_product_ids(user_id)[:3]

    return {
        "status": "success",
        "event_recorded": event.event_type,
        "persona": user_profile.persona,
        "engagement_score": user_profile.engagement_score,
        "ranked_products": [
            {
                "product_id": pid,
                "confidence": round(probabilities.get(pid, 0.0) * 100, 2),
            }
            for pid in ranked_ids
        ],
        "predicted_next_action": user_profile.predicted_next_action,
    }
