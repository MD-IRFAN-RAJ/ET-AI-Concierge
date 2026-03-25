from fastapi import APIRouter
from app.models.schemas import DashboardState, RecommendationResponse, NextBestAction, IntelligenceSegment, EngagementTrend, OnboardingSelection
from app.rl_engine.bandit import bandit_engine, ET_PRODUCTS
from app.rl_engine.intelligence_engine import intel_engine
from typing import Dict, List

router = APIRouter()

# Mock Database
mock_db: Dict[str, DashboardState] = {}
mock_portfolio_db: Dict[str, Dict[str, int | bool]] = {}

def create_default_profile() -> DashboardState:
    persona = "newcomer_explorer"
    return DashboardState(
        health_score=62,
        persona=persona,
        risk_level="moderate",
        investment_horizon="15+ Years",
        recommendations=[],
        next_best_actions=[],
        intelligence_segments=[
            IntelligenceSegment(label="Equity Markets", relevance=0.8),
            IntelligenceSegment(label="Skill Building", relevance=0.6),
            IntelligenceSegment(label="Tax Saving", relevance=0.9),
            IntelligenceSegment(label="ET Ecosystem", relevance=1.0)
        ],
        engagement_trends=EngagementTrend(
            usage_time_change="+0.0%",
            exploration_status="Warmup",
            resonance_data=[100, 110, 90, 120, 95, 100, 105, 115, 98, 102, 108, 112],
        ),
        ET_product_affinity={"et-prime": 0.25, "et-money": 0.25, "et-markets": 0.2, "et-masterclass": 0.2, "et-insurance": 0.1},
        engagement_score=35.0,
        predicted_next_action="Explore ET Markets and monitor top movers in your focus sectors.",
    )

def get_or_create_profile(user_id: str) -> DashboardState:
    if user_id not in mock_db:
        mock_db[user_id] = create_default_profile()
    if user_id not in mock_portfolio_db:
        mock_portfolio_db[user_id] = {"savings": 50000, "has_insurance": False}
    return mock_db[user_id]

def _build_engagement_trend(user_id: str) -> EngagementTrend:
    recent = bandit_engine.get_recent_events(user_id, limit=36)
    if not recent:
        return EngagementTrend(
            usage_time_change="+0.0%",
            exploration_status="Warmup",
            resonance_data=[100, 110, 90, 120, 95, 100, 105, 115, 98, 102, 108, 112],
        )

    buckets = [0] * 12
    for idx, _ in enumerate(recent):
        bucket = min(11, int((idx / max(1, len(recent))) * 12))
        buckets[bucket] += 1

    normalized = [80 + (b * 15) for b in buckets]
    first_half = sum(normalized[:6]) / 6
    second_half = sum(normalized[6:]) / 6
    delta = second_half - first_half
    usage_delta = f"{delta:+.1f}%"

    exploration_status = "Peak" if second_half > 140 else "Growing" if second_half > 110 else "Stable"
    return EngagementTrend(
        usage_time_change=usage_delta,
        exploration_status=exploration_status,
        resonance_data=normalized,
    )

def _persona_risk_horizon(persona: str) -> tuple[str, str]:
    if persona == "market_navigator":
        return "high", "1-5 Years"
    if persona == "executive_strategist":
        return "moderate", "5-10 Years"
    if persona == "wealth_builder":
        return "moderate", "10+ Years"
    if persona == "strategic_planner":
        return "moderate", "8-12 Years"
    if persona == "newcomer_explorer":
        return "low", "15+ Years"
    if persona == "trader":
        return "high", "1-5 Years"
    if persona == "professional":
        return "moderate", "5-10 Years"
    if persona == "investor":
        return "moderate", "10+ Years"
    return "low", "15+ Years"

def recompute_profile_state(user_id: str, persona_override: str | None = None) -> DashboardState:
    profile = get_or_create_profile(user_id)

    if persona_override:
        profile.persona = persona_override
    else:
        profile.persona = intel_engine.adapt_persona(user_id, profile.persona)

    probabilities = bandit_engine.get_probabilities(user_id)
    ranked = bandit_engine.get_ranked_product_ids(user_id)
    recommendations: List[RecommendationResponse] = []
    for pid in ranked[:4]:
        product = next(p for p in ET_PRODUCTS if p["id"] == pid)
        recommendations.append(
            RecommendationResponse(
                product_id=pid,
                name=str(product["name"]),
                type=str(product["type"]),
                match_score=round(probabilities.get(pid, 0.0), 4),
                reason=str(product.get("reason", "Ranked from your latest behavior.")),
                apr=product.get("apr"),
                fee=product.get("fee"),
                rewards=product.get("rewards"),
                limit=product.get("limit"),
            )
        )

    digital_twin = intel_engine.get_digital_twin(user_id, profile.persona)
    predicted_action = digital_twin.predicted_next_action
    gap_actions = intel_engine.detect_gaps(mock_portfolio_db[user_id])

    if predicted_action:
        gap_actions.insert(
            0,
            NextBestAction(
                title="Predicted Next Best Action",
                description=predicted_action,
                impact_score=90,
            ),
        )

    risk_level, horizon = _persona_risk_horizon(profile.persona)
    engagement_trend = _build_engagement_trend(user_id)
    health_score = int(max(20, min(99, digital_twin.engagement_score)))

    profile.health_score = health_score
    profile.risk_level = risk_level
    profile.investment_horizon = horizon
    profile.recommendations = recommendations
    profile.next_best_actions = gap_actions
    profile.intelligence_segments = [
        IntelligenceSegment(label=interest, relevance=round(probabilities.get(pid, 0.0), 4))
        for interest, pid in zip(digital_twin.interests, ranked[: len(digital_twin.interests)])
    ]
    profile.engagement_trends = engagement_trend
    profile.digital_twin = digital_twin
    profile.ET_product_affinity = probabilities
    profile.engagement_score = digital_twin.engagement_score
    profile.predicted_next_action = predicted_action
    profile.identity_score = round(digital_twin.identity_resonance * 10, 2)
    return profile


def _map_selection_to_persona(goal: str, experience: str, known_products: List[str]) -> str:
    exp = experience.lower()
    gl = goal.lower()
    known = {k.lower() for k in known_products if k.lower() != "none of these"}

    if "trader" in exp:
        return "market_navigator"

    if "executive" in exp:
        if len(known) >= 2:
            return "executive_strategist"
        return "strategic_planner"

    if "regular investor" in exp:
        if "et money" in known or "et wealth" in known:
            return "wealth_builder"
        if "market" in gl:
            return "market_navigator"
        return "strategic_planner"

    if "wealth" in gl or "tax" in gl or "sip" in gl:
        return "wealth_builder"

    if "market" in gl:
        return "market_navigator"

    return "newcomer_explorer"


@router.post("/{user_id}/initialize", response_model=DashboardState)
async def initialize_profile(user_id: str, payload: OnboardingSelection):
    profile = get_or_create_profile(user_id)

    persona = _map_selection_to_persona(payload.primary_goal, payload.experience_level, payload.known_products)
    profile.persona = persona

    goal = payload.primary_goal.lower()
    if "market" in goal:
        bandit_engine.track_interaction(user_id, "et-markets", "interaction", value=1.0)
        intel_engine.observe_action(user_id, "explore_markets")
    elif "skill" in goal:
        bandit_engine.track_interaction(user_id, "et-masterclass", "interaction", value=1.0)
        intel_engine.observe_action(user_id, "start_masterclass")
    elif "wealth" in goal or "tax" in goal:
        bandit_engine.track_interaction(user_id, "et-money", "interaction", value=1.0)
        intel_engine.observe_action(user_id, "start_sip")
    else:
        bandit_engine.track_interaction(user_id, "et-prime", "interaction", value=1.0)
        intel_engine.observe_action(user_id, "read_prime")

    known_map = {
        "et prime": "et-prime",
        "et markets": "et-markets",
        "et wealth": "et-money",
        "et money": "et-money",
    }
    known = [k.lower() for k in payload.known_products if k.lower() != "none of these"]
    for item in known:
        pid = known_map.get(item)
        if pid:
            bandit_engine.track_interaction(user_id, pid, "read", value=45.0)

    return recompute_profile_state(user_id, persona_override=persona)

@router.get("/{user_id}", response_model=DashboardState)
async def get_profile(user_id: str):
    return recompute_profile_state(user_id)


@router.post("/{user_id}/reset", response_model=DashboardState)
async def reset_profile(user_id: str):
    mock_db.pop(user_id, None)
    mock_portfolio_db.pop(user_id, None)
    bandit_engine.user_metrics.pop(user_id, None)
    bandit_engine.user_events.pop(user_id, None)
    intel_engine.user_actions.pop(user_id, None)

    # Recreate default profile after reset.
    get_or_create_profile(user_id)
    return recompute_profile_state(user_id)
