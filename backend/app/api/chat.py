from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.rl_engine.bandit import bandit_engine
from app.rl_engine.intelligence_engine import intel_engine
from app.api.profile import recompute_profile_state

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def handle_chat(request: ChatRequest):
    last_msg = request.messages[-1].content.lower()
    persona = "newcomer_explorer"
    interaction_type = "content"
    sample_product = "et-prime"
    action_key = "read_prime"
    
    if any(k in last_msg for k in ["trade", "options", "stock", "market"]):
        persona = "market_navigator"
        interaction_type = "markets"
        sample_product = "et-markets"
        action_key = "explore_markets"
    elif any(k in last_msg for k in ["learn", "skill", "masterclass", "course"]):
        persona = "newcomer_explorer"
        interaction_type = "learning"
        sample_product = "et-masterclass"
        action_key = "start_masterclass"
    elif any(k in last_msg for k in ["invest", "sip", "fund", "money", "save"]):
        persona = "wealth_builder"
        interaction_type = "intent"
        sample_product = "et-money"
        action_key = "start_sip"
    elif any(k in last_msg for k in ["insurance", "cover", "health", "protection", "risk"]):
        persona = "executive_strategist"
        interaction_type = "protection"
        sample_product = "et-insurance"
        action_key = "buy_insurance"
    elif any(k in last_msg for k in ["news", "article", "insight", "prime"]):
        persona = "strategic_planner"
        interaction_type = "content"
        sample_product = "et-prime"
        action_key = "read_prime"
        
    user_id = request.user_id or "demo-user"

    # Rule 2 + Rule 5: Track chat-intent engagement and update transition model.
    bandit_engine.track_interaction(user_id, sample_product, "interaction")
    intel_engine.observe_action(user_id, action_key)

    updated_dash = recompute_profile_state(user_id, persona_override=persona)
    top = updated_dash.recommendations[0] if updated_dash.recommendations else None

    if top:
        reply = (
            f"Intelligence updated in real-time. Based on your latest {interaction_type} intent, "
            f"{top.name} is now ranked highest at {top.match_score * 100:.1f}% confidence. "
            f"Next best action: {updated_dash.predicted_next_action}"
        )
    else:
        reply = "Intelligence updated in real-time. Continue exploring ET products to unlock ranked recommendations."
    
    return ChatResponse(
        reply=reply,
        dashboard_state=updated_dash
    )
