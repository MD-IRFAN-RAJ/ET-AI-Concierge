"use client";
import { useDashboard } from "@/context/DashboardContext";
import Link from "next/link";
import { useState } from "react";

export default function HealthPage() {
  useDashboard();
  const [coverage, setCoverage] = useState(2500000);

  return (
    <main className="md:pl-20 pt-20 sm:pt-24 pb-24 sm:pb-32 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-4 sm:gap-8 mb-8 sm:mb-12 border-b border-white/5 pb-4 overflow-x-auto no-scrollbar">
          <Link href="/dashboard" className="whitespace-nowrap text-zinc-500 hover:text-white transition-colors font-semibold tracking-tight">Personal</Link>
          <Link href="/marketplace/mortgage" className="whitespace-nowrap text-zinc-500 hover:text-white transition-colors font-semibold tracking-tight">Home</Link>
          <Link href="/marketplace/health" className="whitespace-nowrap text-[#97a9ff] border-b-2 border-[#97a9ff] pb-4 -mb-4 font-semibold tracking-tight">Health</Link>
        </nav>

        {/* Hero Section */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bf81ff]/10 text-[#bf81ff] text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-[#bf81ff]/20 backdrop-blur-md">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span>Sovereign Intelligence Verified</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
            Health & Wellness <span className="text-[#97a9ff]">Synergy</span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl leading-relaxed font-medium">
            Intelligence-led insurance that adapts to your biology. Secure the Global Health Shield and integrate wellness-linked premiums into your financial ecosystem.
          </p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {/* Main Coverage Selector (Bento Large) */}
          <section className="md:col-span-8 bg-[#131313] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <span className="material-symbols-outlined text-[180px]" style={{ fontVariationSettings: "'wght' 100" }}>security</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black tracking-tighter text-white mb-10">Global Health Shield</h2>
              <div className="space-y-12">
                <div>
                  <div className="flex justify-between items-end mb-6 gap-4 flex-wrap">
                    <label className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">Desired Coverage Amount</label>
                    <div className="text-2xl sm:text-4xl font-black text-[#97a9ff] tracking-tighter">${coverage.toLocaleString()}</div>
                  </div>
                  <input 
                    type="range" 
                    min="500000" 
                    max="10000000" 
                    step="100000"
                    value={coverage}
                    onChange={(e) => setCoverage(parseInt(e.target.value))}
                    className="w-full h-2 bg-black rounded-full appearance-none cursor-pointer accent-[#859aff] outline-none border border-white/10"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 mt-4 font-black uppercase tracking-[0.3em]">
                    <span>$500k</span>
                    <span>$10M+</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-black/40 p-6 rounded-2xl border border-[#859aff]/20 backdrop-blur-md">
                    <div className="text-[#859aff] text-[10px] font-black mb-3 uppercase tracking-widest">Monthly Premium</div>
                    <div className="text-2xl font-black text-white">$142<span className="text-xs font-normal text-zinc-500">/mo</span></div>
                    <div className="text-[10px] text-[#97a9ff] mt-2 font-bold italic">Biometric discount applied</div>
                  </div>
                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                    <div className="text-[#bf81ff] text-[10px] font-black mb-3 uppercase tracking-widest">Wellness Rebate</div>
                    <div className="text-2xl font-black text-white">12.5%</div>
                    <div className="text-[10px] text-zinc-500 mt-2">Annual fitness credit</div>
                  </div>
                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                    <div className="text-[#ff7162] text-[10px] font-black mb-3 uppercase tracking-widest">Deductible</div>
                    <div className="text-2xl font-black text-white">$0</div>
                    <div className="text-[10px] text-zinc-500 mt-2">Elite Tier Benefit</div>
                  </div>
                </div>

                <button className="w-full py-5 bg-[#859aff] text-[#002283] rounded-full font-black text-xl tracking-tighter shadow-[0_0_30px_rgba(151,169,255,0.3)] hover:scale-[1.01] transition-all active:scale-95">
                  Secure Global Shield
                </button>
              </div>
            </div>
          </section>

          {/* Wellness Linked (Bento Side) */}
          <section className="md:col-span-4 bg-[#1a1919] rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-white/5 relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#bf81ff]/5 rounded-full blur-3xl group-hover:bg-[#bf81ff]/10"></div>
            <div>
              <div className="w-16 h-16 bg-[#bf81ff]/10 rounded-2xl flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-[#bf81ff] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitor_heart</span>
              </div>
              <h2 className="text-2xl font-black tracking-tighter text-white mb-4">Wellness Ledger</h2>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Connect your health data to lower your premiums in real-time. Our AI evaluates 42 biomarkers to adjust your risk profile.
              </p>
            </div>
            <div className="mt-12 space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#859aff] text-lg">device_thermostat</span>
                  <span className="text-xs font-bold text-zinc-300">Bio-Sync Active</span>
                </div>
                <span className="text-[10px] font-black text-[#859aff] uppercase tracking-widest">SYNCED</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#bf81ff] text-lg">exercise</span>
                  <span className="text-xs font-bold text-zinc-300">Active Rewards</span>
                </div>
                <span className="text-[10px] font-black text-[#bf81ff] uppercase tracking-widest">+$24.00</span>
              </div>
            </div>
          </section>
        </div>

        {/* Product Cards (Grid) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 pb-12">
          {[
            { 
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1UdEvtZe73AdxgPzBlRrWtgSaMHPwQgbo9jAjV3xb9u5j5vNTnLN0mOp5mI4lje5S_vUzxVRmpOZ_hzbgvvdXftmRsx7uloLU-Lr2aOUqedlX7Ef1vFknDQcEl-hYgk4gfRxhm3AMSDuJ7jES3s5GPptZW5NahSf77_bjw1A0iahKQt3LJ8xSq4q7trMN6Y73MZJ5BUiUQHd_Ob59t9ZlXk-GrBW2Nj7ZmkPntkCmXAkFUhmSxyBlbvMmzCnz3aUPJNWcu9wIyhJ4",
              title: "Longevity Portfolio", 
              desc: "Investment vehicle focused on biotech and age-reversal technology firms with integrated health coverage.",
              metric: "4.8% APY",
              color: "#859aff"
            },
            { 
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi5e6GgFeP-j0EMtsLxUMvJKMnqwGFIB-4SA8Co_NhtQAxw6YDIWNy8oZZ6oLut8N24LdKmVPENgFAiOsM9dr1VnLxVxOQHGsoeulQd7W35GPXzrm7iV8On1oA6UFvUc427AecICsoa0BfllvwDQwaGaxIED9P_gOeSrvaaiS_mOtit-1Jn7m_F1mQyOVv-rGA6vMq0IfLvbnTIUv7AL1r191qArKseu2guSvOtqmyK6qPlwlTkdQhq8_StWLqQqKly5h9ykVqWSzN",
              title: "Bio-Secure Vault", 
              desc: "Encrypted storage for your genomic data, serving as a basis for your health-weighted credit score.",
              metric: "Ultra-Secure",
              color: "#bf81ff"
            },
            { 
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAf2TZJ5ZC6lY_GyZxwxLwlfViZMEuCI-dn3h7HbyKtFwxK68yRmJimeiL9CD5hDg74sZVkuwrPLR7gg7-IuotWijvVkFCRYYlEma9tTEfGxFS2riS87ZxKh-QpVjaWdVNNS9Pjt2AQ-lKHJrbFksXWuWNaHXMZbjGZ2Z4OELe5V5s4AECNQnpkZ2H42sUV3m4ThFNmIkGhQftOn3Z0DCB_sLW4njL2UCXzdmQIZA8zsjEHu1e4jE4iRCwQlGoVbWFRpPFOI785AXN",
              title: "Crisis On-Demand", 
              desc: "Instant liquidity for unforeseen medical procedures with zero-interest repayment windows.",
              metric: "Instant Access",
              color: "#ff7162"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#131313] rounded-3xl overflow-hidden border border-white/5 group hover:border-white/10 transition-all">
              <div className="h-56 overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131313] to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm tracking-tighter" style={{ color: item.color }}>{item.metric}</span>
                  <button className="material-symbols-outlined text-zinc-600 hover:text-white transition-colors">arrow_forward</button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
