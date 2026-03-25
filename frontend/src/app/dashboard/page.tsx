"use client";
import { useDashboard } from "@/context/DashboardContext";

export default function DashboardPage() {
  const { state: dashboardState, loading, trackAction } = useDashboard();

  if (loading || !dashboardState) return <div className="pt-24 md:pt-32 px-4 md:px-8 md:ml-20 text-zinc-500">Loading Intelligence...</div>;

  const personaContent: Record<string, { greeting: string; title: string; descriptor: string }> = {
    newcomer_explorer: {
      greeting: "Explorer",
      title: "Newcomer Explorer",
      descriptor: "foundational growth and guided discovery",
    },
    wealth_builder: {
      greeting: "Wealth Builder",
      title: "Wealth Builder",
      descriptor: "disciplined SIP growth and long-horizon compounding",
    },
    market_navigator: {
      greeting: "Market Navigator",
      title: "Market Navigator",
      descriptor: "active market moves and fast conviction execution",
    },
    strategic_planner: {
      greeting: "Strategic Planner",
      title: "Strategic Planner",
      descriptor: "balanced allocation and insight-first decision making",
    },
    executive_strategist: {
      greeting: "Executive Strategist",
      title: "Executive Strategist",
      descriptor: "capital protection with premium research-led decisions",
    },
    beginner: {
      greeting: "Explorer",
      title: "Beginner Explorer",
      descriptor: "foundational growth and discovery",
    },
    investor: {
      greeting: "Investor",
      title: "Long-term Investor",
      descriptor: "long-term growth and disciplined capital allocation",
    },
    trader: {
      greeting: "Trader",
      title: "Active Trader",
      descriptor: "high-conviction market tracking and tactical positioning",
    },
    professional: {
      greeting: "Expert",
      title: "Professional Strategist",
      descriptor: "insight-driven strategy and ecosystem optimization",
    },
  };

  const currentPersona = personaContent[dashboardState.persona] || {
    greeting: "Explorer",
    title: "Adaptive Explorer",
    descriptor: "personalized growth and discovery",
  };

  return (
    <main className="ml-0 md:ml-20 pt-28 pb-12 px-6 md:px-12 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Welcome back, {currentPersona.greeting}</h1>
            <p className="text-zinc-400 text-lg max-w-xl">Your ET AI Concierge is calibrated. Here’s your ecosystem discovery report.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
              <button className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
              <span className="material-symbols-outlined text-sm">explore</span>
              Explore ET Services
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 bg-[#131313] rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 p-6">
              <span className="material-symbols-outlined text-zinc-600">info</span>
            </div>
            <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-8">Financial Health Score</h3>
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[12px] border-[#262626]"></div>
              <div 
                className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-red-600 border-r-red-600 border-b-red-600/40 -rotate-45"
                style={{ clipPath: `conic-gradient(from 0deg, #dc2626 ${dashboardState.health_score}%, transparent 0)` }}
              ></div>
              <div className="text-center relative z-10">
                <span className="text-5xl sm:text-6xl font-black text-white leading-none">{dashboardState.health_score}</span>
                <span className="text-2xl text-zinc-500">/100</span>
                <div className="text-red-500 font-bold mt-2 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>+4.2%</span>
                </div>
              </div>
            </div>
            <div className="mt-10 text-center">
              <p className="text-white font-medium">Your score is <span className="text-red-500 font-bold uppercase tracking-tighter">Optimal</span></p>
              <p className="text-zinc-500 text-sm mt-1">Based on ET Wealth benchmarks.</p>
            </div>
          </div>

          <div className="md:col-span-7 bg-[#131313] rounded-xl overflow-hidden relative group border border-white/5">
            <div className="absolute inset-0 z-0 opacity-10 grayscale group-hover:grayscale-0 transition-all duration-700">
              <img 
                alt="Abstract AI" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhLsxM_TgHt37hmIQLmHQSE37n1GahKh1_o-g3Xf7OqZ077Ya3wBbaC3XfYKAjHvB0e7HOsaT2k3TaESlsw6bt4F8gm6est5u33UHRPUKmPW4gqpJ7kzJAnUsgLImUzrD8hmJdjK4yWPMuN7us_406X036j5HLQ3Fka0PamrhOAGHXrN6YpeE_C_GSTU1TbYzqC8NsHym8MxEa4QMN6eOkzY4lj3Z6xkueU10lSlBn_aZpAFmmFH8aWf1CjoGG7_64kwGiThHyIVAX"
              />
            </div>
            <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 backdrop-blur-md flex items-center justify-center border border-red-600/20 flex-shrink-0">
                    <span className="material-symbols-outlined text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  </div>
                  <span className="px-3 py-1 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-red-600/20 whitespace-nowrap">ET Persona Verified</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{currentPersona.title}</h2>
                <p className="text-zinc-400 max-w-md leading-relaxed">Tailoring your experience across the Economic Times ecosystem for <span className="text-white font-medium">{currentPersona.descriptor}</span>.</p>
              </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Risk Tolerance</span>
                  <span className="text-white font-semibold capitalize">{dashboardState.risk_level}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Ecosystem Affinity</span>
                  <span className="text-red-500 font-bold">{Number(dashboardState.engagement_score || 45).toFixed(0)}%</span>
                </div>
            </div>
          </div>

          {/* Digital Twin Visualization */}
          <div className="md:col-span-8 bg-[#131313] rounded-xl p-6 sm:p-8 border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500">face_retouching_natural</span>
                  Your Digital Twin
                </h3>
                <p className="text-zinc-500 text-xs mt-1 font-medium uppercase tracking-widest">Autonomous Profile Matching</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest block">Identity Resonance</span>
                <span className="text-red-500 font-black text-xl">{(dashboardState.digital_twin?.identity_resonance * 10 || 9.8).toFixed(1)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-zinc-400 text-sm font-medium">Predicted Next Action</span>
                    <span className="text-[10px] bg-red-600/10 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-tight border border-red-600/20">High Confidence</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:border-red-600/30 transition-all">
                    <p className="text-white font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-red-500 text-sm">bolt</span>
                      {dashboardState.digital_twin?.predicted_next_action || "Refine Profile"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest block">Interests & Affinity</span>
                  <div className="flex flex-wrap gap-2">
                    {(dashboardState.digital_twin?.interests || ["ET Prime", "Markets", "Savings"]).map((interest: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-[#262626] text-zinc-300 text-xs rounded-lg border border-white/5 hover:border-red-600/50 transition-colors">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest block">Product Affinity Scores</span>
                <div className="space-y-3">
                  {Object.entries(dashboardState.digital_twin?.product_scores || { "et-prime": 0.82, "et-markets": 0.45, "et-money": 0.67 }).slice(0, 4).map(([id, score]: [string, any], i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase tracking-tighter">
                        <span className="text-zinc-400 font-bold">{id.replace('et-', 'ET ')}</span>
                        <span className="text-red-500 font-black">{(score * 10).toFixed(1)}</span>
                      </div>
                      <div className="h-1 bg-[#262626] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-600 transition-all duration-1000" 
                          style={{ width: `${Math.min(100, score * 10)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#1a1919] rounded-xl p-6 sm:p-8 flex flex-col border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white font-bold text-lg">Next Best Actions</h3>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest cursor-pointer">View All</span>
            </div>
            <div className="space-y-4 flex-1">
              {dashboardState.next_best_actions.map((action: any, i: number) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#262626] hover:bg-[#2c2c2c] transition-colors cursor-pointer group border border-white/0 hover:border-red-600/20">
                  <div className="mt-1 w-8 h-8 rounded-xl bg-red-600/10 flex items-center justify-center border border-red-600/20 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                    <span className="material-symbols-outlined text-red-500 text-sm group-hover:text-white transition-colors">arrow_forward</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                       <p className="text-sm font-semibold text-white">{action.title}</p>
                       <span className="text-[8px] bg-white/10 text-zinc-400 px-1.5 py-0.5 rounded-sm font-bold">+{action.impact_score}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-12">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
               <span className="material-symbols-outlined text-red-500">star</span>
               AI Optimized Recommendations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardState.recommendations.map((rec: any, i: number) => (
                <div key={i} draggable 
                  onClick={() => trackAction(rec.product_id, 'click')}
                  className="bg-[#131313] rounded-xl p-6 flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300 border border-white/5 group h-full cursor-pointer hover:border-red-600/30">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-red-500">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {rec.type === 'content' ? 'newsmode' : (rec.type === 'learning' ? 'school' : 'insights')}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-red-500 bg-red-600/10 px-2 py-1 rounded-sm uppercase tracking-tighter">
                        {Math.round(rec.match_score * 100)}% Match
                      </span>
                    </div>
                    <h4 className="text-white font-bold mb-2 group-hover:text-red-500 transition-colors uppercase text-sm tracking-tight">{rec.name}</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed mb-6 line-clamp-3">{rec.reason}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] border-t border-white/5 pt-3">
                       <span className="text-zinc-500 uppercase font-bold">{rec.fee || 'Access Now'}</span>
                       <span className="text-white font-bold">{rec.rewards || 'Ecosystem Edge'}</span>
                    </div>
                    <button className="w-full py-2 bg-red-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/5 group-hover:shadow-red-600/20 active:scale-95">
                      Explore
                    </button>
                  </div>
                </div>
              ))}
              {/* Fallback card if fewer than 4 recs */}
              {dashboardState.recommendations.length < 4 && (
                 <div className="bg-gradient-to-br from-red-600/10 to-transparent rounded-xl p-6 border border-red-600/20 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer h-full">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform">
                       <span className="material-symbols-outlined">add</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Discover More</h4>
                      <p className="text-zinc-500 text-[10px] mt-1">Chat to expand your ET profile</p>
                    </div>
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
