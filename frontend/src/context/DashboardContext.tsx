"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface DashboardContextType {
  state: any;
  loading: boolean;
  refreshState: () => Promise<void>;
  trackAction: (productId: string, action: string, durationMs?: number) => Promise<void>;
  initializeProfile: (selection: {
    persona: string;
    primary_goal: string;
    experience_level: string;
    known_products: string[];
  }) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchFullState = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/profile/demo-user", {
        headers: { "bypass-tunnel-reminder": "true" }
      });
      const data = await res.json();
      setState(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching state", err);
    }
  }, []);

  const trackAction = async (productId: string, action: string, durationMs?: number) => {
    try {
      const userId = "demo-user";
      const currentPersona = state?.persona || "beginner";
      await fetch(`/api/v1/track/?persona=${currentPersona}&user_id=${userId}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "true"
        },
        body: JSON.stringify({
          product_id: productId,
          event_type: action,
          duration_ms: durationMs,
        })
      });
      await fetchFullState();
    } catch (e) {
      console.error("Tracking Error", e);
    }
  };

  const initializeProfile = async (selection: {
    persona: string;
    primary_goal: string;
    experience_level: string;
    known_products: string[];
  }) => {
    try {
      const userId = "demo-user";
      const res = await fetch(`/api/v1/profile/${userId}/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "true",
        },
        body: JSON.stringify(selection),
      });
      const data = await res.json();
      setState(data);
      setLoading(false);
    } catch (e) {
      console.error("Initialize Profile Error", e);
    }
  };

  useEffect(() => {
    fetchFullState();
    const poller = setInterval(fetchFullState, 4000);
    return () => clearInterval(poller);
  }, [fetchFullState]);

  return (
    <DashboardContext.Provider value={{ state, loading, refreshState: fetchFullState, trackAction, initializeProfile }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
