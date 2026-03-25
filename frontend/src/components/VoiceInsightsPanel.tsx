"use client";

type VoiceInsights = {
  persona: string;
  recommendations: Record<string, number>;
  confidence: {
    persona: number;
    hf_weight: number;
    rl_weight: number;
  };
};

export default function VoiceInsightsPanel({ insights }: { insights: VoiceInsights | null }) {
  if (!insights) return null;

  const topEntries = Object.entries(insights.recommendations).slice(0, 4);

  return (
    <div className="mb-4 sm:mb-6 rounded-xl border border-white/10 bg-[#121212]/80 backdrop-blur-sm p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">Voice Intelligence</p>
          <h3 className="text-sm sm:text-base text-white font-semibold">
            Persona: <span className="text-[#97a9ff]">{insights.persona}</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
          <span className="px-2 py-1 rounded-full bg-[#97a9ff]/15 text-[#97a9ff]">Persona {insights.confidence.persona.toFixed(1)}%</span>
          <span className="px-2 py-1 rounded-full bg-[#bf81ff]/15 text-[#bf81ff]">HF {insights.confidence.hf_weight}%</span>
          <span className="px-2 py-1 rounded-full bg-[#ff7162]/15 text-[#ff7162]">RL {insights.confidence.rl_weight}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {topEntries.map(([name, score]) => (
          <div key={name}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-zinc-300 font-medium">{name}</span>
              <span className="text-zinc-500">{score.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#97a9ff] via-[#bf81ff] to-[#ff7162] transition-all duration-500"
                style={{ width: `${Math.max(4, Math.min(100, score))}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
