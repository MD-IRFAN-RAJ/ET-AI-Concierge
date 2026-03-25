from fastapi import APIRouter
from app.models.schemas import RecommendationResponse
from app.api.profile import recompute_profile_state

router = APIRouter()

@router.get("/{user_id}", response_model=RecommendationResponse)
async def get_recommendation(user_id: str, persona: str = "beginner"):
    state = recompute_profile_state(user_id, persona_override=persona)
    if not state.recommendations:
        return RecommendationResponse(
            product_id="et-prime",
            name="ET Prime Subscription",
            type="content",
            match_score=0.5,
            reason=f"Based on your profile as a {persona}, this is a strong baseline recommendation.",
        )
    return state.recommendations[0]
