from typing import List, Dict
from app.models.schemas import NextBestAction, DigitalTwin
from app.rl_engine.bandit import ET_PRODUCTS, bandit_engine

class IntelligenceEngine:
    def __init__(self):
        self.transitions: Dict[str, Dict[str, int]] = {}
        self.user_actions: Dict[str, List[str]] = {}
        self.default_transition_priors = {
            "explore_markets": {"start_masterclass": 3, "read_prime": 2},
            "read_prime": {"start_masterclass": 2, "start_sip": 3},
            "start_masterclass": {"start_sip": 4, "buy_insurance": 2},
            "start_sip": {"buy_insurance": 3, "read_prime": 2},
            "buy_insurance": {"read_prime": 2},
        }

    def observe_action(self, user_id: str, action: str) -> None:
        if user_id not in self.user_actions:
            self.user_actions[user_id] = []

        history = self.user_actions[user_id]
        if history:
            prev_action = history[-1]
            if prev_action not in self.transitions:
                self.transitions[prev_action] = {}
            self.transitions[prev_action][action] = self.transitions[prev_action].get(action, 0) + 1

        history.append(action)
        self.user_actions[user_id] = history[-200:]

    def get_transition_probabilities(self, user_id: str, current_action: str) -> Dict[str, float]:
        learned = self.transitions.get(current_action, {})
        priors = self.default_transition_priors.get(current_action, {})

        merged: Dict[str, int] = {}
        for action, count in priors.items():
            merged[action] = merged.get(action, 0) + count
        for action, count in learned.items():
            merged[action] = merged.get(action, 0) + count

        if not merged:
            return {"start_sip": 0.4, "read_prime": 0.3, "start_masterclass": 0.3}

        total = float(sum(merged.values()))
        return {k: v / total for k, v in merged.items()}

    def detect_gaps(self, portfolio: Dict) -> List[NextBestAction]:
        actions = []
        # Rule 7: Gap Detection
        savings = portfolio.get("savings", 0)
        has_insurance = portfolio.get("has_insurance", False)

        if savings < 100000:
            actions.append(NextBestAction(
                title="Emergency Fund Check",
                description="Your savings threshold is below optimal. Suggest activating ET Money SIP.",
                impact_score=85,
            ))
        
        if not has_insurance:
            actions.append(NextBestAction(
                title="Risk Protection Gap",
                description="No active insurance detected. Secure your future with ET Insurance Services.",
                impact_score=95,
            ))
        
        return actions

    def predict_next_action(self, user_id: str, persona: str) -> str:
        history = self.user_actions.get(user_id, [])
        current_action = history[-1] if history else "explore_markets"
        transition_probs = self.get_transition_probabilities(user_id, current_action)
        best_action = max(transition_probs, key=transition_probs.get)

        action_map = {
            "start_masterclass": "Enroll in ET Masterclass to build confidence in high-volatility decisions.",
            "read_prime": "Read ET Prime deep-dive reports before your next allocation change.",
            "start_sip": "Activate an ET Money SIP to improve savings consistency.",
            "buy_insurance": "Review ET Insurance plans to close your risk protection gap.",
            "explore_markets": "Open ET Markets and monitor top movers in your focus sectors.",
        }

        # Lightweight LLM-style synthesis (without external dependency).
        if persona == "trader" and best_action == "start_masterclass":
            return "Take an ET Masterclass module on options hedging to improve risk-adjusted returns."

        if persona == "professional" and best_action == "start_sip":
            return "Pair ET Prime research with a disciplined ET Money SIP strategy for long-term alpha."

        return action_map.get(best_action, "Explore the ET Ecosystem for personalized growth.")

    def adapt_persona(self, user_id: str, current_persona: str) -> str:
        metrics = bandit_engine.user_metrics.get(user_id, {})
        total_interactions = sum(float(v.get("interactions", 0.0)) for v in metrics.values())
        # Keep initial persona stable until behavior signal is meaningful.
        if total_interactions < 3.0:
            return current_persona

        probs = bandit_engine.get_probabilities(user_id)
        top_product_id = max(probs, key=probs.get)
        top_product = next((p for p in ET_PRODUCTS if p["id"] == top_product_id), None)
        if not top_product:
            return current_persona

        target_persona = str(top_product.get("target_persona", current_persona))
        if target_persona == "all":
            return current_persona

        # Preserve richer onboarding personas while still adapting by behavior.
        persona_map = {
            "beginner": "newcomer_explorer",
            "trader": "market_navigator",
            "professional": "executive_strategist",
            "investor": "wealth_builder",
        }
        mapped_target = persona_map.get(target_persona, target_persona)

        # Do not aggressively downgrade strategic personas to newcomer on sparse shifts.
        if current_persona in {"executive_strategist", "strategic_planner", "wealth_builder"} and mapped_target == "newcomer_explorer":
            return current_persona

        return mapped_target

    def _derive_interests(self, probs: Dict[str, float]) -> List[str]:
        top_ids = sorted(probs, key=probs.get, reverse=True)[:3]
        id_to_label = {
            "et-prime": "Institutional Insights",
            "et-markets": "Live Markets",
            "et-masterclass": "Skill Building",
            "et-money": "SIP & Wealth",
            "et-insurance": "Risk Protection",
        }
        return [id_to_label.get(pid, pid) for pid in top_ids]

    def compute_engagement_score(self, user_id: str) -> float:
        metrics = bandit_engine.user_metrics.get(user_id, {})
        clicks = sum(v.get("clicks", 0.0) for v in metrics.values())
        interactions = sum(v.get("interactions", 0.0) for v in metrics.values())
        time_spent = sum(v.get("time_spent", 0.0) for v in metrics.values())
        ignore_rate = sum(v.get("ignore_rate", 0.0) for v in metrics.values()) / max(1, len(metrics))

        score = 35 + (clicks * 4.0) + (interactions * 2.5) + (time_spent * 3.0) - (ignore_rate * 25.0)
        return max(0.0, min(100.0, score))

    def get_digital_twin(self, user_id: str, persona: str) -> DigitalTwin:
        # Rule 1: User Profile structure
        probs = bandit_engine.get_probabilities(user_id)
        scores = bandit_engine.get_scores(user_id)
        interests = self._derive_interests(probs)
        engagement_score = self.compute_engagement_score(user_id)
        identity_resonance = min(0.99, 0.55 + max(probs.values()) * 0.4)

        return DigitalTwin(
            persona=persona,
            interests=interests,
            engagement_score=engagement_score,
            product_scores=scores,
            predicted_next_action=self.predict_next_action(user_id, persona),
            identity_resonance=identity_resonance,
        )

intel_engine = IntelligenceEngine()
