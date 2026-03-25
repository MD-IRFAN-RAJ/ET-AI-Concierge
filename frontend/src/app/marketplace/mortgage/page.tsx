"use client";
import { useDashboard } from "@/context/DashboardContext";
import Link from "next/link";

export default function MortgagePage() {
  useDashboard();

  return (
    <main className="md:pl-20 pt-20 sm:pt-24 pb-24 sm:pb-32 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs (Simulated TopNav for Sectors) */}
        <nav className="flex items-center gap-4 sm:gap-8 mb-8 sm:mb-12 border-b border-white/5 pb-4 overflow-x-auto no-scrollbar">
          <Link href="/dashboard" className="whitespace-nowrap text-zinc-500 hover:text-white transition-colors font-semibold tracking-tight">Personal</Link>
          <Link href="/marketplace/mortgage" className="whitespace-nowrap text-[#97a9ff] border-b-2 border-[#97a9ff] pb-4 -mb-4 font-semibold tracking-tight">Home</Link>
          <Link href="/marketplace/health" className="whitespace-nowrap text-zinc-500 hover:text-white transition-colors font-semibold tracking-tight">Health</Link>
        </nav>

        {/* Hero Section */}
        <section className="mb-12 relative min-h-[360px] sm:h-[450px] rounded-3xl overflow-hidden flex items-end border border-white/5 shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqWrRBP7FsXpfyroA-9u478OFV7FFE6Kb6rEvLkbYcZDw_lQX0NPXlwdXrYkJXbp-6hRmQaDvNDSVfNJBHqL9nFqjy7dk4SWMPlNxXij5lPi35aJYcm27xT-FuDoLB_x0JxggMzGoDpYOBpRPjo1Ab4o2j5zLqZJB-4JHJ63kmOt1Py2ddiVYX5vx5ptbdgVcWRWRlZxX5tdAFdSpfZ5Sf_c4GO1TQ8S1lkFOpEDmd_rAaAfemJbPvuaT86oqBdML_1I9hR83mR9oC')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl">
            <div className="inline-block px-4 py-1 bg-[#f9362c]/20 text-[#ff7162] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 border border-[#f9362c]/30 backdrop-blur-md">
              Exclusive Portfolio
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-4 leading-tight text-white">
              Master Your <span className="text-[#97a9ff]">Property</span> Equity.
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Intelligent mortgage solutions and asset protection designed for the modern sovereign investor.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#859aff] text-[#002283] rounded-full font-bold shadow-[0_0_30px_rgba(151,169,255,0.3)] hover:scale-105 transition-all active:scale-95">Explore Rates</button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-xl">Risk Assessment</button>
            </div>
          </div>
        </section>

        {/* Bento Grid - Mortgage & Insurance */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {/* Continuity Life Guard Section */}
          <div className="md:col-span-8 bg-[#131313] rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#bf81ff]/10 rounded-full blur-[120px] -mr-36 sm:-mr-48 -mt-36 sm:-mt-48 transition-all group-hover:bg-[#bf81ff]/20"></div>
            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#bf81ff]/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#bf81ff] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
                  </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white">Continuity Life Guard</h2>
                </div>
                  <p className="text-zinc-400 mb-8 leading-relaxed text-base sm:text-lg">
                  The ultimate protection for homeowners. Our AI-driven continuity insurance covers mortgage payments during unforeseen life events.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3 sm:gap-4 text-zinc-300">
                    <span className="material-symbols-outlined text-[#859aff] text-xl flex-shrink-0">check_circle</span>
                    <span className="font-medium">24-month mortgage payment bridge</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4 text-zinc-300">
                    <span className="material-symbols-outlined text-[#859aff] text-xl flex-shrink-0">check_circle</span>
                    <span className="font-medium">Instant equity protection layer</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4 text-zinc-300">
                    <span className="material-symbols-outlined text-[#859aff] text-xl flex-shrink-0">check_circle</span>
                    <span className="font-medium">AI-optimized premium adjustments</span>
                  </li>
                </ul>
                <button className="text-[#bf81ff] font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform uppercase tracking-widest text-xs">
                  <span>Learn about Guard+</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              <div className="w-full md:w-72 min-h-56 h-64 sm:h-72 rounded-3xl bg-[#1a1919] flex items-center justify-center p-6 sm:p-10 text-center border border-white/10 shadow-inner">
                <div>
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter">$0</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em] mb-6">Initial Deductible</div>
                  <div className="h-1.5 w-full bg-black rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-gradient-to-r from-[#bf81ff] to-[#dab4ff] w-3/4"></div>
                  </div>
                  <p className="text-[11px] text-[#97a9ff] font-bold italic tracking-wide">Top 1% rated protection</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Picks Card */}
          <div className="md:col-span-4 bg-[#1a1919] rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col border border-white/5 relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ff7162]/10 rounded-full blur-3xl"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#ff7162]/10 flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-[#ff7162] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome_motion</span>
            </div>
            <h3 className="text-2xl font-black tracking-tighter text-white mb-3">AI-Optimized Picks</h3>
            <p className="text-zinc-500 text-sm mb-8 leading-relaxed">Based on your portfolio, these property assets match your risk-return profile.</p>
            <div className="space-y-4 mb-8">
              <div className="p-5 bg-black/40 rounded-2xl flex items-center justify-between border border-white/5 group-hover:border-[#ff7162]/30 transition-colors">
                <span className="text-sm font-bold text-white">Urban Loft XL</span>
                <span className="text-[#859aff] text-sm font-black tracking-tighter">4.2% Yield</span>
              </div>
              <div className="p-5 bg-black/40 rounded-2xl flex items-center justify-between border border-white/5 group-hover:border-[#ff7162]/30 transition-colors">
                <span className="text-sm font-bold text-white">Coastal Retreat</span>
                <span className="text-[#859aff] text-sm font-black tracking-tighter">3.8% Yield</span>
              </div>
            </div>
            <button className="mt-auto w-full py-4 bg-[#262626] text-white rounded-2xl text-sm font-black tracking-widest uppercase border border-white/10 hover:bg-[#2c2c2c] transition-all active:scale-95">View All Picks</button>
          </div>
        </div>

        {/* Live Interest Rate Comparison */}
        <section className="bg-[#131313] rounded-3xl overflow-hidden mb-12 border border-white/5 shadow-xl">
          <div className="p-6 sm:p-8 lg:p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white mb-2">Live Interest Rates</h2>
              <p className="text-zinc-500 font-medium">Real-time mortgage comparison across top-tier lenders.</p>
            </div>
            <div className="flex bg-black p-1.5 rounded-full border border-white/5">
              <button className="px-6 py-2 text-xs font-black uppercase tracking-tighter bg-[#859aff] text-[#002283] rounded-full shadow-lg">Fixed</button>
              <button className="px-6 py-2 text-xs font-black uppercase tracking-tighter text-zinc-500 hover:text-white transition-colors">Variable</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-black/20 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-4 sm:px-8 lg:px-10 py-4 sm:py-6">Lender</th>
                  <th className="px-4 sm:px-8 lg:px-10 py-4 sm:py-6">Product</th>
                  <th className="px-4 sm:px-8 lg:px-10 py-4 sm:py-6">Rate (APR)</th>
                  <th className="px-4 sm:px-8 lg:px-10 py-4 sm:py-6">Monthly Est.</th>
                  <th className="px-4 sm:px-8 lg:px-10 py-4 sm:py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { lender: "Vanguard Elite", initial: "V", product: "30-Year Fixed Premier", rate: "5.82%", change: "↓ 0.05", est: "$2,410" },
                  { lender: "Apex Mortgages", initial: "A", product: "15-Year Fixed Wealth", rate: "5.15%", change: "--", est: "$3,105" },
                  { lender: "Sovereign Direct", initial: "S", product: "Jumbo Flexi-Rate", rate: "6.10%", change: "↓ 0.12", est: "$4,280" }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-black text-sm text-white group-hover:bg-[#859aff] group-hover:text-[#002283] transition-colors">
                          {item.initial}
                        </div>
                        <span className="font-bold text-white text-lg">{item.lender}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8 text-zinc-400 font-medium whitespace-nowrap">{item.product}</td>
                    <td className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-[#859aff] tracking-tighter">{item.rate}</span>
                        <span className="text-[10px] font-black text-[#ff7162] uppercase">{item.change}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8 font-bold text-white text-lg whitespace-nowrap">{item.est}</td>
                    <td className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8 text-right">
                      <button className="px-6 py-2.5 bg-[#262626] rounded-full text-xs font-black uppercase tracking-widest text-[#97a9ff] border border-white/5 hover:bg-[#859aff] hover:text-[#002283] transition-all">Select</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Specialized Property Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "home_iot_device", title: "Equity Release", desc: "Unlock the value in your home without moving. Tailored for long-term strategic liquidity." },
            { icon: "real_estate_agent", title: "Refinancing AI", desc: "Automated market scanning to switch your mortgage the second rates drop in your favor." },
            { icon: "family_restroom", title: "Multi-Gen Mortgages", desc: "Unique lending structures designed for families purchasing property together." }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#131313] p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/5 hover:border-[#859aff]/30 transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-[#859aff]/10 flex items-center justify-center mb-8 group-hover:bg-[#859aff]/20 transition-colors">
                <span className="material-symbols-outlined text-[#859aff] text-3xl">{item.icon}</span>
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">{item.title}</h4>
              <p className="text-zinc-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
