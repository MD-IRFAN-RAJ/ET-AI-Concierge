import random
import time
from typing import Dict, List

# ET Ecosystem Product Definitions with Initial Relevance
ET_PRODUCTS = [
  { 
    "id": "et-prime", "type": "content", "name": "ET Prime Subscription", "target_persona": "professional", 
    "tags": ["analysis", "exclusive"], "fee": "₹399/mo", "rewards": "Exclusive Insights", "reason": "Deep-dive analysis for serious investors.",
    "initial_relevance": 0.8
  },
  { 
    "id": "et-markets", "type": "content", "name": "ET Markets Intelligence", "target_persona": "trader", 
    "tags": ["live", "data"], "rewards": "Real-time Tracking", "reason": "Stay ahead of the market with live streaming data.",
    "initial_relevance": 0.9
  },
  { 
    "id": "et-masterclass", "type": "learning", "name": "ET Masterclass", "target_persona": "beginner", 
    "tags": ["education", "skills"], "fee": "Enroll Now", "rewards": "Certification", "reason": "Accelerate your learning curve with expert modules.",
    "initial_relevance": 0.7
  },
  { 
    "id": "et-money", "type": "service", "name": "ET Money (SIP/MF)", "target_persona": "beginner", 
    "tags": ["investment", "savings"], "apr": "Variable", "limit": "Flexible", "reason": "Automate your wealth creation with smart SIPs.",
    "initial_relevance": 0.8
  },
  { 
    "id": "et-insurance", "type": "service", "name": "ET Insurance Services", "target_persona": "all", 
    "tags": ["protection", "health"], "fee": "Bespoke", "rewards": "Risk Cover", "reason": "Secure your future with AI-matched insurance plans.",
    "initial_relevance": 0.6
  }
]

class IntelligenceBandit:
    def __init__(self, epsilon=0.1):
        self.epsilon = epsilon
        # Per-user digital twin metrics:
        # {user_id: {product_id: {clicks, time_spent, ignore_rate, relevance, interactions, converts}}}
        self.user_metrics: Dict[str, Dict[str, Dict[str, float]]] = {}
        self.user_events: Dict[str, List[Dict[str, float | str]]] = {}
        # Weights as specified by architect
        self.w1, self.w2, self.w3, self.w4 = 0.4, 0.3, 0.3, 0.2

    def _default_metrics(self) -> Dict[str, Dict[str, float]]:
        return {
            str(p["id"]): {
                "clicks": 0.0,
                "time_spent": 0.0,
                "ignore_rate": 0.0,
                "relevance": float(p["initial_relevance"]),
                "interactions": 0.0,
                "converts": 0.0,
            }
            for p in ET_PRODUCTS
        }

    def _ensure_user(self, user_id: str) -> None:
        if user_id not in self.user_metrics:
            self.user_metrics[user_id] = self._default_metrics()
        if user_id not in self.user_events:
            self.user_events[user_id] = []

    def calculate_score(self, user_id: str, product_id: str) -> float:
        self._ensure_user(user_id)
        m = self.user_metrics[user_id].get(
            product_id,
            {"clicks": 0.0, "time_spent": 0.0, "ignore_rate": 1.0, "relevance": 0.1, "interactions": 0.0, "converts": 0.0},
        )
        # Score = w1*(clicks) + w2*(time_spent) + w3*(relevance) - w4*(ignore_rate)
        # Ensure primitive types for the linter
        c: float = float(m.get("clicks", 0))
        t: float = float(m.get("time_spent", 0.0))
        r: float = float(m.get("relevance", 0.1))
        i: float = float(m.get("ignore_rate", 1.0))
        interaction_bonus: float = float(m.get("interactions", 0.0)) * 0.1
        conversion_bonus: float = float(m.get("converts", 0.0)) * 0.4
        
        score: float = (self.w1 * c) + (self.w2 * t) + (self.w3 * r) - (self.w4 * i) + interaction_bonus + conversion_bonus
        return float(max(0.1, score))

    def get_scores(self, user_id: str) -> Dict[str, float]:
        self._ensure_user(user_id)
        return {str(p["id"]): self.calculate_score(user_id, str(p["id"])) for p in ET_PRODUCTS}

    def get_probabilities(self, user_id: str) -> Dict[str, float]:
        self._ensure_user(user_id)
        scores: Dict[str, float] = {}
        for p in ET_PRODUCTS:
            pid = str(p["id"])
            scores[pid] = self.calculate_score(user_id, pid)
            
        total_score: float = float(sum(scores.values()))
        return {pid: float(score) / total_score for pid, score in scores.items()}

    def get_ranked_product_ids(self, user_id: str) -> List[str]:
        probabilities = self.get_probabilities(user_id)
        return sorted(probabilities, key=probabilities.get, reverse=True)

    def get_recommendations(self, user_id: str, count: int = 3) -> List[dict]:
        self._ensure_user(user_id)
        probabilities = self.get_probabilities(user_id)
        product_ids = [p["id"] for p in ET_PRODUCTS]
        
        # Epsilon-Greedy Implementation (90% Best, 10% Explore)
        if random.random() < self.epsilon:
            # Explore: Randomly shuffle
            random.shuffle(product_ids)
            chosen_ids = product_ids[:count]
        else:
            # Exploit: Sort by probability
            chosen_ids = sorted(probabilities, key=probabilities.get, reverse=True)[:count]
            
        return [next(p for p in ET_PRODUCTS if p["id"] == pid) for pid in chosen_ids]

    def track_interaction(self, user_id: str, product_id: str, event_type: str, value: float = 1.0):
        self._ensure_user(user_id)
        if product_id not in self.user_metrics[user_id]:
            return

        metrics = self.user_metrics[user_id][product_id]
        
        if event_type == "click":
            metrics["clicks"] += 1
            metrics["interactions"] += 1
        elif event_type == "time" or event_type == "scroll":
            # Normalize time spent (seconds / 60)
            metrics["time_spent"] += (value / 60.0)
            metrics["interactions"] += 0.5
        elif event_type == "interaction":
            metrics["interactions"] += 1
            metrics["relevance"] += 0.03
        elif event_type == "read":
            metrics["interactions"] += 1
            metrics["time_spent"] += max(0.2, value / 60.0)
            metrics["relevance"] += 0.05
        elif event_type == "convert":
            metrics["converts"] += 1
            metrics["clicks"] += 1
            metrics["relevance"] += 0.1
        elif event_type == "ignore":
            metrics["ignore_rate"] = min(1.0, metrics["ignore_rate"] + 0.1)

        # Positive engagement reduces historical ignore bias.
        if event_type in {"click", "interaction", "read", "convert", "time", "scroll"}:
            metrics["ignore_rate"] = max(0.0, metrics["ignore_rate"] - 0.03)
        
        # Cross-sell rules adjustment (architect logic)
        if product_id == "et-markets" and event_type in {"click", "interaction", "read"}:
            self.user_metrics[user_id]["et-masterclass"]["relevance"] += 0.1

        if event_type == "read":
            self.user_metrics[user_id]["et-prime"]["relevance"] += 0.08

        if product_id == "et-prime" and event_type in {"click", "interaction"}:
            self.user_metrics[user_id]["et-prime"]["relevance"] += 0.05

        # Keep relevance in a stable range.
        for pid in self.user_metrics[user_id]:
            self.user_metrics[user_id][pid]["relevance"] = max(0.1, min(2.0, self.user_metrics[user_id][pid]["relevance"]))

        self.user_events[user_id].append(
            {
                "ts": time.time(),
                "product_id": product_id,
                "event_type": event_type,
                "value": float(value),
            }
        )
        self.user_events[user_id] = self.user_events[user_id][-200:]

    def get_recent_events(self, user_id: str, limit: int = 30) -> List[Dict[str, float | str]]:
        self._ensure_user(user_id)
        return self.user_events[user_id][-limit:]

# Global Instance
bandit_engine = IntelligenceBandit(epsilon=0.1)
