from __future__ import annotations

from functools import lru_cache
from typing import Dict, Tuple, Any, List
import os

import requests
import numpy as np

PERSONA_LABELS = [
    "Beginner Investor",
    "Active Trader",
    "Long-term Investor",
]

PRODUCT_DESCRIPTIONS: Dict[str, str] = {
    "ET Prime": "Learn finance basics and insights",
    "ET Markets": "Track stocks and real-time trading",
    "ET Masterclass": "Advanced finance courses",
    "ET Money": "SIP, mutual funds, and long-term wealth building",
    "ET Insurance": "Loans, insurance, and financial protection tools",
}


def _fallback_persona(text: str) -> Dict[str, float | str]:
    lower = text.lower()
    if any(k in lower for k in ["trade", "options", "intraday", "stocks", "market"]):
        return {"persona": "Active Trader", "confidence": 0.72}
    if any(k in lower for k in ["long", "retire", "future", "wealth", "sip"]):
        return {"persona": "Long-term Investor", "confidence": 0.7}
    return {"persona": "Beginner Investor", "confidence": 0.65}


@lru_cache(maxsize=1)
def _get_zero_shot_pipeline():
    try:
        from transformers import pipeline

        return pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    except Exception:
        return None


@lru_cache(maxsize=1)
def _get_embedder():
    try:
        from sentence_transformers import SentenceTransformer

        return SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    except Exception:
        return None


def _call_hf_model(model: str, payload: dict, timeout: int = 30) -> Any:
    """Call the Hugging Face Inference API for a given model.

    Returns parsed JSON on success or None on failure or if no token is configured.
    """
    token = os.getenv("HF_API_TOKEN")
    if not token:
        return None

    url = f"https://api-inference.huggingface.co/models/{model}"
    headers = {"Authorization": f"Bearer {token}"}
    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=timeout)
        resp.raise_for_status()
        return resp.json()
    except Exception:
        return None


def detect_persona(text: str) -> Dict[str, float | str]:
    # Prefer Hugging Face Inference API when token is present to avoid local downloads
    if os.getenv("HF_API_TOKEN"):
        hf_model = os.getenv("HF_ZERO_SHOT_MODEL", "facebook/bart-large-mnli")
        resp = _call_hf_model(hf_model, {"inputs": text, "parameters": {"candidate_labels": PERSONA_LABELS}})
        if resp and isinstance(resp, dict):
            labels = resp.get("labels") or resp.get("label")
            scores = resp.get("scores") or resp.get("score")
            if labels and scores:
                try:
                    top_label = str(labels[0])
                    top_score = float(scores[0])
                    return {"persona": top_label, "confidence": round(top_score, 4)}
                except Exception:
                    pass

    # Fall back to local model if available
    classifier = _get_zero_shot_pipeline()
    if classifier is None:
        return _fallback_persona(text)

    try:
        result = classifier(text, PERSONA_LABELS)
        top_label = str(result["labels"][0])
        top_score = float(result["scores"][0])
        return {"persona": top_label, "confidence": round(top_score, 4)}
    except Exception:
        return _fallback_persona(text)


def _normalize_percentages(values: Dict[str, float]) -> Dict[str, float]:
    total = float(sum(max(v, 0.0) for v in values.values()))
    if total <= 0:
        equal = 100.0 / max(1, len(values))
        return {k: round(equal, 2) for k in values}
    return {k: round((max(v, 0.0) / total) * 100.0, 2) for k, v in values.items()}


def _fallback_product_scores(user_input: str) -> Dict[str, float]:
    text = user_input.lower()
    raw = {
        "ET Prime": 0.3,
        "ET Markets": 0.3,
        "ET Masterclass": 0.2,
        "ET Money": 0.2,
        "ET Insurance": 0.2,
    }
    if any(k in text for k in ["learn", "basics", "course", "education"]):
        raw["ET Prime"] += 0.5
        raw["ET Masterclass"] += 0.4
    if any(k in text for k in ["trade", "stocks", "market", "intraday"]):
        raw["ET Markets"] += 0.7
    if any(k in text for k in ["insurance", "loan", "tools", "service", "cover"]):
        raw["ET Insurance"] += 0.7
    if any(k in text for k in ["sip", "invest", "wealth", "long-term"]):
        raw["ET Prime"] += 0.2
        raw["ET Money"] += 0.5
    return _normalize_percentages(raw)


def get_product_scores(user_input: str) -> Dict[str, float]:
    # Prefer Hugging Face Inference API embeddings when token is present
    if os.getenv("HF_API_TOKEN"):
        hf_model = os.getenv("HF_EMBEDDER_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
        texts = [user_input, *PRODUCT_DESCRIPTIONS.values()]
        resp = _call_hf_model(hf_model, {"inputs": texts})
        # Expecting a list of vectors
        if resp:
            embeddings = None
            if isinstance(resp, list) and all(isinstance(x, list) for x in resp):
                embeddings = resp
            elif isinstance(resp, dict) and "embeddings" in resp:
                embeddings = resp["embeddings"]

            if embeddings:
                try:
                    embeddings = [np.asarray(e, dtype=np.float32) for e in embeddings]
                    user_vec = np.asarray(embeddings[0], dtype=np.float32)

                    similarities: Dict[str, float] = {}
                    for idx, product_name in enumerate(PRODUCT_DESCRIPTIONS.keys(), start=1):
                        product_vec = np.asarray(embeddings[idx], dtype=np.float32)
                        denom = float(np.linalg.norm(user_vec) * np.linalg.norm(product_vec))
                        sim = 0.0 if denom == 0 else float(np.dot(user_vec, product_vec) / denom)
                        similarities[product_name] = max(0.0, (sim + 1.0) / 2.0)

                    return _normalize_percentages(similarities)
                except Exception:
                    return _fallback_product_scores(user_input)

    # Fall back to local embedder if available
    embedder = _get_embedder()
    if embedder is None:
        return _fallback_product_scores(user_input)

    try:
        texts = [user_input, *PRODUCT_DESCRIPTIONS.values()]
        embeddings = embedder.encode(texts)
        user_vec = np.asarray(embeddings[0], dtype=np.float32)

        similarities: Dict[str, float] = {}
        for idx, product_name in enumerate(PRODUCT_DESCRIPTIONS.keys(), start=1):
            product_vec = np.asarray(embeddings[idx], dtype=np.float32)
            denom = float(np.linalg.norm(user_vec) * np.linalg.norm(product_vec))
            sim = 0.0 if denom == 0 else float(np.dot(user_vec, product_vec) / denom)
            # Shift cosine from [-1, 1] to [0, 1]
            similarities[product_name] = max(0.0, (sim + 1.0) / 2.0)

        return _normalize_percentages(similarities)
    except Exception:
        return _fallback_product_scores(user_input)


def combine_scores(hf_scores: Dict[str, float], rl_scores: Dict[str, float]) -> Dict[str, float]:
    combined: Dict[str, float] = {}
    for name in PRODUCT_DESCRIPTIONS.keys():
        hf = float(hf_scores.get(name, 0.0))
        rl = float(rl_scores.get(name, 0.0))
        combined[name] = round((0.7 * hf) + (0.3 * rl), 2)
    return combined


def map_persona_to_internal(persona: str) -> Tuple[str, str]:
    label = persona.lower()
    if "trader" in label:
        return "trader", "Active Trader"
    if "long-term" in label:
        return "investor", "Long-term Investor"
    return "beginner", "Beginner Investor"
