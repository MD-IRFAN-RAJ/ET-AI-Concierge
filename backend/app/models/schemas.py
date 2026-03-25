from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ChatMessage(BaseModel):
    role: str # "user" or "assistant"
    content: str
    
class ChatRequest(BaseModel):
    user_id: str
    messages: List[ChatMessage]

class RecommendationResponse(BaseModel):
    product_id: str
    name: str
    type: str # 'content', 'service', 'learning'
    match_score: float
    reason: str
    apr: Optional[str] = None
    limit: Optional[str] = None
    fee: Optional[str] = None
    rewards: Optional[str] = None

class NextBestAction(BaseModel):
    title: str
    description: str
    impact_score: int
    completed: bool = False

class IntelligenceSegment(BaseModel):
    label: str
    relevance: float

class EngagementTrend(BaseModel):
    usage_time_change: str # e.g. "+24.5%"
    exploration_status: str # e.g. "Peak"
    resonance_data: List[int] # simplified data for the graph

class DigitalTwin(BaseModel):
    persona: str
    interests: List[str] = []
    engagement_score: float = 0.0
    product_scores: Dict[str, float] = {} # Score = w1*clicks + w2*time + w3*rel - w4*ignore
    predicted_next_action: str = ""
    identity_resonance: float = 0.0

class DashboardState(BaseModel):
    health_score: int
    persona: str # 'beginner', 'trader', 'professional', 'investor'
    risk_level: str # 'low', 'medium', 'high'
    investment_horizon: str # e.g. "15+ Years"
    recommendations: List[RecommendationResponse]
    next_best_actions: List[NextBestAction] = []
    intelligence_segments: List[IntelligenceSegment] = []
    engagement_trends: Optional[EngagementTrend] = None
    identity_score: float = 9.8
    # Digital Twin & AI Intelligence
    digital_twin: Optional[DigitalTwin] = None
    ET_product_affinity: Dict[str, float] = {} 
    engagement_score: float = 0.0
    predicted_next_action: str = ""
    
class ChatResponse(BaseModel):
    reply: str
    dashboard_state: DashboardState

class TrackingEvent(BaseModel):
    event_type: str # 'click', 'ignore', 'scroll'
    product_id: Optional[str] = None
    duration_ms: Optional[int] = None


class OnboardingSelection(BaseModel):
    primary_goal: str
    experience_level: str
    known_products: List[str] = []
    persona: Optional[str] = None
