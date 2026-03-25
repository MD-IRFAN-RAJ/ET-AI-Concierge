"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export type ConciergeSelection = {
  persona: string;
  primary_goal: string;
  experience_level: string;
  known_products: string[];
};

export default function WelcomeConcierge({ onComplete }: { onComplete: (selection: ConciergeSelection) => void }) {
  const [step, setStep] = useState(0);
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [knownProducts, setKnownProducts] = useState<string[]>([]);

  const steps = [
    {
      question: "What's your primary financial goal?",
      options: ["Wealth Creation", "Tax Saving", "Daily Markets Tracking", "Skill Development"],
      multi: false
    },
    {
      question: "How would you describe your experience level?",
      options: ["Absolute Beginner", "Regular Investor", "Professional Trader", "Corporate Executive"],
      multi: false
    },
    {
      question: "Which ET products are you currently aware of?",
      options: ["ET Prime", "ET Markets", "ET Wealth", "ET Money", "None of these"],
      multi: true
    }
  ];

  const derivePersona = (goal: string, experience: string, known: string[]) => {
    const exp = experience.toLowerCase();
    const gl = goal.toLowerCase();
    const knownSet = new Set(known.map((k) => k.toLowerCase()).filter((k) => k !== "none of these"));

    if (exp.includes("trader")) return "market_navigator";

    if (exp.includes("executive")) {
      if (knownSet.size >= 2) return "executive_strategist";
      return "strategic_planner";
    }

    if (exp.includes("regular investor")) {
      if (knownSet.has("et money") || knownSet.has("et wealth")) return "wealth_builder";
      if (gl.includes("market")) return "market_navigator";
      return "strategic_planner";
    }

    if (gl.includes("wealth") || gl.includes("tax") || gl.includes("sip")) return "wealth_builder";
    if (gl.includes("market")) return "market_navigator";
    return "newcomer_explorer";
  };

  const personaNames: Record<string, string> = {
    newcomer_explorer: "Newcomer Explorer",
    wealth_builder: "Wealth Builder",
    market_navigator: "Market Navigator",
    strategic_planner: "Strategic Planner",
    executive_strategist: "Executive Strategist",
  };

  const resolvedPersona = derivePersona(primaryGoal, experienceLevel, knownProducts);

  const handleSelect = (option: string) => {
    if (steps[step].multi) {
      setKnownProducts((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]));
    } else {
      if (step === 0) setPrimaryGoal(option);
      if (step === 1) setExperienceLevel(option);
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        onComplete({
          persona: resolvedPersona,
          primary_goal: primaryGoal,
          experience_level: option,
          known_products: knownProducts,
        });
      }
    }
  };

  const handleFinalContinue = () => {
    onComplete({
      persona: resolvedPersona,
      primary_goal: primaryGoal,
      experience_level: experienceLevel,
      known_products: knownProducts,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-[#131313] border border-white/5 p-5 sm:p-8 lg:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
           <motion.div 
             className="h-full bg-[#97a9ff]" 
             animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
           />
        </div>

        <div className="mb-8 sm:mb-12">
          <span className="text-[#97a9ff] text-xs font-bold uppercase tracking-[0.2em]">ET AI Concierge OS</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter mt-2">{steps[step].question}</h2>
          {(primaryGoal || experienceLevel || knownProducts.length > 0) && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#97a9ff]/25 bg-[#97a9ff]/10">
              <span className="material-symbols-outlined text-[#97a9ff] text-sm">psychology</span>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-zinc-300">
                Detected Persona: <span className="text-[#97a9ff] font-bold">{personaNames[resolvedPersona] || "Adaptive Explorer"}</span>
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps[step].options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`p-4 sm:p-6 rounded-2xl border text-left transition-all ${
                knownProducts.includes(option)
                  ? "bg-[#97a9ff] border-[#97a9ff] text-[#002283] font-bold"
                  : "bg-black border-zinc-800 text-zinc-400 hover:border-[#97a9ff]/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {steps[step].multi && (
          <button
            onClick={() => step < steps.length - 1 ? setStep(step + 1) : handleFinalContinue()}
            className="mt-8 w-full py-4 bg-[#262626] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#333]"
          >
            Continue
          </button>
        )}
      </motion.div>
    </div>
  );
}
