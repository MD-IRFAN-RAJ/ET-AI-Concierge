"use client";
import Link from "next/link";
import { useDashboard } from "@/context/DashboardContext";

export default function MarketplacePage() {
  const { state: dashboardState, loading, trackAction } = useDashboard();

  if (loading || !dashboardState) return <div className="pt-24 md:pt-32 px-4 md:px-8 md:ml-20 text-zinc-500">Scanning Marketplace...</div>;

  const recommendations = dashboardState.recommendations || [];
  const hero = recommendations[0];
  const secondary = recommendations.slice(1, 3);

  return (
    <main className="md:pl-20 pt-20 sm:pt-24 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <section className="mb-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4 text-white">ET Ecosystem Marketplace</h1>
          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
            The intelligent layer for the Economic Times. Discovery premium services across Markets, Prime, and Wealth.
          </p>
        </section>

        {/* Filters & Category Tabs */}
        <section className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-2 bg-[#131313] p-1.5 rounded-full border border-white/5 overflow-x-auto max-w-full no-scrollbar">
            {[
              { name: "All", href: "/marketplace" },
              { name: "Markets", href: "/dashboard" },
              { name: "Property", href: "/marketplace/mortgage" },
              { name: "Wellness", href: "/marketplace/health" }
            ].map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                  tab.name === "All" ? "bg-red-600 text-white shadow-xl" : "text-zinc-500 hover:text-white"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-sm text-zinc-500 font-medium">Sort by:</span>
            <select className="bg-[#262626] text-white text-sm font-semibold rounded-full border-none focus:ring-red-600 py-2 pl-4 pr-8 sm:pr-10 appearance-none outline outline-1 outline-white/10 max-w-[220px] w-full sm:w-auto">
              <option>Recommended</option>
              <option>Ecosystem Rank</option>
              <option>Engagement Potential</option>
            </select>
          </div>
        </section>

        {/* Bento Grid Marketplace */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          {/* Main Recommendation */}
          <div className="md:col-span-8 bg-[#131313] rounded-xl overflow-hidden relative group border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
            <img 
              alt="ET Prime Featured" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhLsxM_TgHt37hmIQLmHQSE37n1GahKh1_o-g3Xf7OqZ077Ya3wBbaC3XfYKAjHvB0e7HOsaT2k3TaESlsw6bt4F8gm6est5u33UHRPUKmPW4gqpJ7kzJAnUsgLImUzrD8hmJdjK4yWPMuN7us_406X036j5HLQ3Fka0PamrhOAGHXrN6YpeE_C_GSTU1TbYzqC8NsHym8MxEa4QMN6eOkzY4lj3Z6xkueU10lSlBn_aZpAFmmFH8aWf1CjoGG7_64kwGiThHyIVAX"
            />
            <div className="relative z-20 p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-end text-left">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-600/20 text-red-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-4 self-start border border-red-500/20">
                <span className="material-symbols-outlined text-sm mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                Top Ecosystem Choice
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tighter text-white mb-2">{hero?.name || "ET Prime Membership"}</h2>
              <p className="text-sm sm:text-lg text-zinc-400 mb-6 max-w-md">{hero?.reason || "Unlock institutional-grade research, ad-free experience, and exclusive Masterclasses."}</p>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                <button
                  onClick={() => hero && trackAction(hero.product_id, "convert")}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-600/20"
                >
                  Subscribe Now
                </button>
                <button
                  onClick={() => hero && trackAction(hero.product_id, "read", 90000)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white/5 text-white rounded-xl font-bold backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Small Cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Insurance Card */}
            <div
              onClick={() => secondary[0] && trackAction(secondary[0].product_id, "click")}
              className="bg-[#1a1919] p-6 sm:p-8 rounded-xl min-h-[260px] md:h-1/2 flex flex-col justify-between border border-white/5 hover:bg-[#201f1f] transition-colors relative overflow-hidden group cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">fact_check</span>
                  </div>
                  <span className="px-3 py-1 bg-black text-zinc-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/5">{secondary[0]?.name || "ET Insurance"}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{secondary[0]?.type === "service" ? "Smart Protection" : "Personalized Opportunity"}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{secondary[0]?.reason || "AI-matched insurance plans from top providers in India."}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-2xl font-black text-white">{secondary[0]?.fee || "Access"}<span className="text-sm font-medium text-zinc-500"> {secondary[0]?.rewards || "now"}</span></span>
                <button className="material-symbols-outlined text-red-500 hover:translate-x-1 transition-transform">arrow_forward</button>
              </div>
            </div>

            {/* Money Card */}
            <div
              onClick={() => secondary[1] && trackAction(secondary[1].product_id, "click")}
              className="bg-[#1a1919] p-6 sm:p-8 rounded-xl min-h-[260px] md:h-1/2 flex flex-col justify-between border border-white/5 hover:bg-[#201f1f] transition-colors relative overflow-hidden group cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-red-600/10 rounded-2xl text-red-500 flex items-center justify-center border border-red-600/20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                  </div>
                  <span className="px-3 py-1 bg-black text-zinc-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/5">{secondary[1]?.name || "ET Money"}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{secondary[1]?.type === "learning" ? "Skill Accelerator" : "Genius Portfolio"}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{secondary[1]?.reason || "Hyper-personalized portfolios managed by AI."}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-2xl font-black text-white">{Math.round((secondary[1]?.match_score || 0.6) * 100)}%<span className="text-sm font-medium text-zinc-500"> confidence</span></span>
                <button className="material-symbols-outlined text-red-500 hover:translate-x-1 transition-transform">arrow_forward</button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison UI */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-black tracking-tighter">Compare Solutions</h2>
            <button className="hidden sm:flex text-[#97a9ff] font-bold text-sm uppercase tracking-widest items-center gap-2 hover:opacity-80 transition-opacity">
              View Full Grid <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
          <div className="bg-[#131313] rounded-xl p-1 border border-white/10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {[
                { name: "ET Basic", icon: "person", fee: "Free", rewards: "Standard News", color: "text-zinc-400" },
                { name: "ET Prime Gold", icon: "workspace_premium", fee: "₹2,499/yr", rewards: "Institutional Access", color: "text-red-500", top: true },
                { name: "ET Masterclass Plus", icon: "school", fee: "₹4,999/yr", rewards: "Certifications Included", color: "text-zinc-100" }
              ].map((rec, i) => (
                <div key={i} className={`p-8 flex flex-col items-center text-center relative ${rec.top ? "bg-[#1a1919]" : "bg-[#131313]"}`}>
                  {rec.top && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter z-20 shadow-xl text-white">
                      Ecosystem Best
                    </div>
                  )}
                  <div className="mb-6 h-40 flex items-center justify-center w-full bg-black/40 rounded-lg border border-white/5">
                    <span className={`material-symbols-outlined text-6xl ${rec.color}`}>
                      {rec.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{rec.name}</h3>
                  <p className={`text-xs uppercase tracking-widest mb-6 font-bold ${rec.top ? "text-red-500" : "text-zinc-500"}`}>
                    {rec.top ? "Recommended" : "Ecosystem Tier"}
                  </p>
                  <div className="space-y-4 w-full border-t border-white/10 pt-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-zinc-500 uppercase font-bold">Subscription Fee</span>
                      <span className="text-lg font-bold text-white">{rec.fee}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-zinc-500 uppercase font-bold">Primary Benefit</span>
                      <span className="text-lg font-bold text-white">{rec.rewards}</span>
                    </div>
                  </div>
                  <button className={`mt-8 w-full py-4 rounded-xl font-bold transition-all ${
                    rec.top ? "bg-red-600 text-white shadow-lg shadow-red-600/20 hover:scale-[1.02]" : "border border-zinc-800 text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}>
                    {rec.top ? "Upgrade Now" : "Select Plan"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="bg-gradient-to-br from-[#1a1919] to-black p-6 sm:p-10 lg:p-12 rounded-xl text-center border border-white/10">
          <h3 className="text-3xl font-black tracking-tighter mb-4">Can&apos;t find what you&apos;re looking for?</h3>
          <p className="text-zinc-500 max-w-xl mx-auto mb-8">Talk to our AI Concierge. It will analyze your spending patterns and risk profile to suggest the perfect financial instrument.</p>
          <button className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-zinc-300 transition-all active:scale-95 flex items-center gap-3 mx-auto">
            <span className="material-symbols-outlined">auto_awesome</span>
            Initialize Concierge
          </button>
        </section>
      </div>
    </main>
  );
}
