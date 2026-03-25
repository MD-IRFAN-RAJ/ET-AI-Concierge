"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: "home" },
    { name: "Dashboard", href: "/dashboard", icon: "grid_view" },
    { name: "Marketplace", href: "/marketplace", icon: "storefront" },
    { name: "Intelligence", href: "/intelligence", icon: "psychology" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0e0e0e]/80 backdrop-blur-xl max-w-[1920px] left-0 md:left-20 md:w-[calc(100%-5rem)] shadow-[0px_24px_48px_rgba(0,0,0,0.4)] transition-all">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex p-2 text-[#adaaaa] hover:text-[#97a9ff] transition-colors"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
          </button>

          <span className="text-base sm:text-2xl font-black text-white tracking-tighter truncate">ET AI Concierge</span>
          <span className="hidden sm:block h-4 w-[1px] bg-zinc-800 mx-2"></span>
          <span className="hidden md:block text-zinc-500 text-sm font-medium whitespace-nowrap">Sovereign Intel Active</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden lg:flex items-center bg-black rounded-full px-6 py-2 border border-zinc-800/50">
            <span className="material-symbols-outlined text-zinc-500 text-lg mr-2">search</span>
            <input
              type="text"
              className="bg-transparent border-none text-sm focus:ring-0 text-white w-64"
              placeholder="Global Search..."
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:inline-flex text-[#adaaaa] hover:text-[#97a9ff] transition-all active:scale-95">
              <span className="material-symbols-outlined">dark_mode</span>
            </button>
            <button className="text-[#adaaaa] hover:text-[#97a9ff] transition-all active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="hidden sm:inline-flex text-[#adaaaa] hover:text-[#97a9ff] transition-all active:scale-95">
              <span className="material-symbols-outlined">apps</span>
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#97a9ff]/20 p-0.5 overflow-hidden">
              <img
                alt="User"
                className="w-full h-full rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgJN6ukSRCvwPb73Z0WoymLA-K77q0QBwoabB6YGPB27jX9ivLiS1va4P1m-4KCUYCDHnJp6Qi9nyxBKUqCyXV3XMgBqUMhBwYZJj9MHLxCnq0pL70VAm4WgQHSOL6jbA74YJOgznh4oEa3mSTEemNUCpFRjvkfjaS7DR-wOBEzHQSBzonRec6AWUvRGhfuEjAdoMZRFGeLa2CWixJ6MIqvPcCCdqpl34pli3nf-x5ryPitlvLI3LuqWHHvWqQrDd-I8gnYh2CjneR"
              />
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden px-4 pb-4 border-t border-zinc-800/60 bg-[#0e0e0e]/95">
          <div className="grid grid-cols-2 gap-2 pt-3">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 border transition-colors ${
                    isActive
                      ? "bg-[#97a9ff]/10 text-[#97a9ff] border-[#97a9ff]/30"
                      : "text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{item.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-widest">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
