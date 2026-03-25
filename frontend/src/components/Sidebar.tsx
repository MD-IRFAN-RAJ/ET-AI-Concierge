"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: "home", href: "/" },
    { name: "Dashboard", icon: "grid_view", href: "/dashboard" },
    { name: "Marketplace", icon: "storefront", href: "/marketplace" },
    { name: "Intelligence", icon: "psychology", href: "/intelligence" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-20 hover:w-64 transition-all duration-500 z-[60] group border-r border-[#262626]/20 bg-[#131313] md:flex flex-col py-8 items-center group-hover:items-start shadow-[24px_0px_48px_rgba(0,0,0,0.2)] overflow-hidden hidden">
      {/* AI Concierge Orb Header */}
      <div className="px-6 mb-12 flex items-center gap-4 w-full">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#97a9ff] via-[#bf81ff] to-[#ff7162] animate-pulse orb-glow flex-shrink-0"></div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <p className="font-sans text-sm font-medium uppercase tracking-widest text-[#97a9ff]">ET AI Concierge OS</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Sovereign Intel</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-1 w-full flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = item.href === "/" 
            ? pathname === "/" 
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`w-full flex items-center px-6 py-4 gap-4 transition-all relative ${
                isActive
                  ? "bg-gradient-to-r from-[#97a9ff]/10 to-transparent text-[#97a9ff]"
                  : "text-[#adaaaa] opacity-60 hover:opacity-100 hover:bg-[#201f1f]"
              }`}
            >
              {isActive && <div className="absolute right-0 top-0 h-full w-0.5 bg-[#97a9ff]"></div>}
              <span className="material-symbols-outlined min-w-[24px] flex justify-center" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>
                {item.icon}
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm uppercase tracking-widest whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* CTA & Footer */}
      <div className="w-full px-4 mb-6">
        <button className="w-full py-3 px-2 rounded-xl bg-[#859aff] text-[#002283] text-xs font-bold uppercase tracking-widest hidden group-hover:block transition-all hover:bg-[#97a9ff] whitespace-nowrap">
          Upgrade to Pro
        </button>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Link href="/settings" className="w-full flex items-center px-6 py-3 gap-4 text-[#adaaaa] opacity-60 hover:opacity-100 hover:bg-[#201f1f] transition-all">
          <span className="material-symbols-outlined">settings</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm uppercase tracking-widest">Settings</span>
        </Link>
        <Link href="/support" className="w-full flex items-center px-6 py-3 gap-4 text-[#adaaaa] opacity-60 hover:opacity-100 hover:bg-[#201f1f] transition-all">
          <span className="material-symbols-outlined">help_outline</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm uppercase tracking-widest">Support</span>
        </Link>
      </div>
    </aside>
  );
}
