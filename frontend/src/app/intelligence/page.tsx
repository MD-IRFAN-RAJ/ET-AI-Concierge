"use client";
import { useDashboard } from "@/context/DashboardContext";

export default function IntelligencePage() {
  const { state: dashboardState, loading, trackAction } = useDashboard();

  if (loading || !dashboardState) return <div className="pt-24 md:pt-32 px-4 md:px-8 md:ml-20 text-zinc-500">Initializing Neural Layer...</div>;

  const resonancePoints = dashboardState.engagement_trends?.resonance_data || [100, 110, 95, 130, 115, 120, 125, 118, 132, 140, 136, 145];
  const topRecommendation = dashboardState.recommendations?.[0];
  const trendPath = resonancePoints
    .map((p: number, i: number) => {
      const x = (i / Math.max(1, resonancePoints.length - 1)) * 1000;
      const y = Math.max(20, Math.min(280, 300 - p));
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  const riskSignature = Math.max(5, Math.min(98, Math.round(dashboardState.engagement_score || 35)));

  return (
    <main className="pt-28 pb-12 px-6 lg:ml-20 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Header Section */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7701d0]/20 text-[#bf81ff] text-xs font-bold uppercase tracking-widest mb-4 border border-[#bf81ff]/20">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              Neural Analysis Active
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight">
              Behavioral<br /><span className="text-[#859aff]">Intelligence</span> Layer
            </h1>
            <p className="mt-4 text-zinc-400 max-w-xl text-base sm:text-lg leading-relaxed">
              Your Sovereign AI maps every interaction, intent, and preference to curate a bespoke financial ecosystem designed around your unique signature.
            </p>
          </div>
          <div className="flex gap-3 sm:gap-4 flex-wrap">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#262626] text-white rounded-xl font-bold hover:bg-[#2c2c2c] transition-all">Export JSON</button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#97a9ff] text-[#002283] rounded-xl font-bold glow-primary hover:scale-105 active:scale-95 transition-all">Refine Strategy</button>
          </div>
        </section>

        {/* Bento Grid Intelligence Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Predicted Next Action Card */}
          <div className="col-span-12 lg:col-span-7 relative overflow-hidden rounded-xl glass-card p-6 sm:p-8 lg:p-12 glow-primary border border-white/5">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#97a9ff]/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#859aff]/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#859aff] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">Cognitive Forecast</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug max-w-md">
                AI anticipates your next move: <span className="text-[#bf81ff]">{dashboardState.predicted_next_action}</span>
              </h2>
              <p className="text-zinc-400 max-w-md">Predicted using transition probabilities from your latest interactions and digital twin alignment.</p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => topRecommendation && trackAction(topRecommendation.product_id, "click")}
                  className="px-6 py-3 bg-[#bf81ff] text-[#32005c] rounded-full font-bold shadow-lg shadow-[#bf81ff]/20 flex items-center gap-2"
                >
                  Review Projections <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button
                  onClick={() => topRecommendation && trackAction(topRecommendation.product_id, "ignore")}
                  className="px-6 py-3 border border-zinc-800 text-white rounded-full font-bold hover:bg-white/5 transition-all"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#97a9ff]/10 blur-[100px] rounded-full"></div>
          </div>

          {/* Interest Bubbles Card */}
          <div className="col-span-12 lg:col-span-5 rounded-xl glass-card p-6 sm:p-8 bg-[#131313]/50 relative overflow-hidden min-h-[320px] sm:min-h-[400px] border border-white/5">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#dab4ff]/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#dab4ff]">bubble_chart</span>
              </div>
              Intent Ecosystem
            </h3>
            <div className="flex flex-wrap gap-3 justify-center items-center h-full max-w-sm mx-auto content-center">
              {dashboardState.intelligence_segments.map((seg: any, i: number) => (
                <span
                  key={i}
                  className={`floating-bubble px-4 sm:px-6 py-2.5 sm:py-3 border rounded-full font-bold transition-all shadow-lg ${
                    i % 3 === 0 ? "bg-[#97a9ff]/20 border-[#97a9ff]/40 text-[#97a9ff] text-lg" :
                    i % 3 === 1 ? "bg-[#bf81ff]/10 border-[#bf81ff]/30 text-[#bf81ff] text-sm" :
                    "bg-[#ff7162]/10 border-[#ff7162]/30 text-[#ff7162] text-xl"
                  }`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  #{seg.label}
                </span>
              ))}
            </div>
          </div>

          {/* Engagement Trend Line Graph Card */}
          <div className="col-span-12 rounded-xl glass-card p-6 sm:p-8 lg:p-10 glow-secondary border border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#97a9ff]">monitoring</span>
                  Resonance Frequency
                </h3>
                <p className="text-zinc-500">Active exploration & core app usage across the last 30 intervals.</p>
              </div>
              <div className="flex items-center gap-6 sm:gap-8 bg-black/50 px-4 sm:px-6 py-3 rounded-2xl border border-zinc-800 w-full md:w-auto justify-between">
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Usage Time</p>
                  <p className="text-xl font-black text-white">{dashboardState.engagement_trends?.usage_time_change}</p>
                </div>
                <div className="w-[1px] h-8 bg-zinc-800"></div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Exploration</p>
                  <p className="text-xl font-black text-[#bf81ff]">{dashboardState.engagement_trends?.exploration_status}</p>
                </div>
              </div>
            </div>

            <div className="relative w-full h-[300px] mt-8 group">
              <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(151,169,255,0.2)]" viewBox="0 0 1000 300">
                <defs>
                  <linearGradient id="gradient-line" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#97a9ff" />
                    <stop offset="50%" stopColor="#bf81ff" />
                    <stop offset="100%" stopColor="#ff7162" />
                  </linearGradient>
                </defs>
                <path
                  d={trendPath}
                  fill="none"
                  stroke="url(#gradient-line)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="500" cy="120" fill="#bf81ff" r="6" className="cursor-pointer group-hover:scale-150 transition-transform" />
                <circle cx="500" cy="120" fill="#bf81ff" fillOpacity="0.2" r="12" />
              </svg>
            </div>
          </div>

          {/* Secondary Bento Tiles */}
          <div className="col-span-12 lg:col-span-4 rounded-xl glass-card p-8 flex flex-col justify-between border border-white/5">
            <div>
              <span className="material-symbols-outlined text-[#ff7162] mb-4">verified</span>
              <h4 className="text-lg font-bold">Risk Signature</h4>
              <p className="text-zinc-500 mt-2 text-sm leading-relaxed">Your current behavior aligns with {riskSignature}% of your active persona profile.</p>
            </div>
            <div className="w-full bg-[#262626] h-2 rounded-full mt-6 overflow-hidden">
              <div className="bg-[#ff7162] h-full rounded-full shadow-[0_0_10px_rgba(255,113,98,0.4)]" style={{ width: `${riskSignature}%` }}></div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 rounded-xl glass-card p-8 flex flex-col gap-6 border border-white/5">
            {[
              { label: "Active Source", val: topRecommendation?.name || "ET Intelligence", icon: "language", color: "text-[#97a9ff]", bg: "bg-[#97a9ff]/10" },
              { label: "Neural Nodes", val: `${(dashboardState.intelligence_segments || []).length * 32} Synchronized`, icon: "hub", color: "text-[#bf81ff]", bg: "bg-[#bf81ff]/10" },
              { label: "Identity Score", val: dashboardState.identity_score.toFixed(1) + "/10", icon: "token", color: "text-[#ff7162]", bg: "bg-[#ff7162]/10" },
            ].map((node, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${node.bg} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${node.color}`}>{node.icon}</span>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{node.label}</p>
                  <p className="font-bold">{node.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-12 lg:col-span-4 rounded-xl overflow-hidden relative border border-white/5">
            <img 
              alt="Abstract tech background" 
              className="w-full h-full object-cover opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4bnuXNcNVBkWQjnLlE32pAxGkQ5dz3QGVLP0bW2xczSKss0ntbfoZEIs3-7Rh5xpclgQcaK0ys7dXAbNb45SS6EhZvyxFBMnn1Sb5Sugv2vnmoxgBod6rcA3bIbCK_m3O2Ht1gpg3NXEhvwF9DFPFgohApa70XV7YqrnPnjV3vH5-J6DJsiyZcQfArr15pF36IM5cr9vEldrf8r94tjI2-AqpV7DRW6LKMltlSVbI7_hf7JhOHM6BwO94eDS56HES8eLche7QXbGG"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-bold text-xl leading-tight">Elite Tier: Intelligence Plus</p>
              <p className="text-zinc-500 text-sm mt-1">Unlock deeper behavioral cross-mapping.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Prompt */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-6 lg:bottom-12 lg:right-12 z-50">
        <button className="group flex items-center gap-2 sm:gap-3 bg-[#262626] hover:bg-[#2c2c2c] transition-all p-2 sm:pr-6 rounded-full shadow-2xl border border-white/5 glow-primary active:scale-95">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#97a9ff] to-[#bf81ff] flex items-center justify-center text-[#002283] flex-shrink-0">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
          </div>
          <span className="hidden sm:inline text-white font-bold text-sm whitespace-nowrap">Ask Intelligence</span>
        </button>
      </div>
    </main>
  );
}
