from __future__ import annotations

from typing import Dict, List, Tuple


def build_voice_reply(persona_label: str, ranked_items: List[Tuple[str, float]]) -> str:
    if not ranked_items:
        return "I analyzed your request. Let us start with ET Prime to build your financial edge."

    top_name, top_score = ranked_items[0]
    second_text = ""
    if len(ranked_items) > 1:
        second_name, second_score = ranked_items[1]
        second_text = f" and {second_name} ({second_score:.1f}%)"

    return (
        f"Great, I detected a {persona_label} profile. "
        f"Top recommendation is {top_name} ({top_score:.1f}%)"
        f"{second_text}. I will adapt your next suggestions in real time."
    )


def speaking_state_payload(response_text: str) -> Dict[str, str | bool]:
    # Frontend browser APIs handle actual speech synthesis. This payload helps UI state.
    return {
        "speak": True,
        "voice": "browser-default",
        "text": response_text,
    }
