"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useDashboard } from "@/context/DashboardContext";
import WelcomeConcierge, { ConciergeSelection } from "@/components/WelcomeConcierge";
import VoiceButton from "@/components/VoiceButton";
import VoiceInsightsPanel from "@/components/VoiceInsightsPanel";

type UiMessage = {
  role: "assistant" | "user";
  content: string;
};

type VoiceInsights = {
  persona: string;
  recommendations: Record<string, number>;
  confidence: {
    persona: number;
    hf_weight: number;
    rl_weight: number;
  };
};

export default function Home() {
  const { state: dashboardState, initializeProfile } = useDashboard();
  const [showProfiling, setShowProfiling] = useState(true);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceInsights, setVoiceInsights] = useState<VoiceInsights | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([
    {
      role: "assistant",
      content:
        "I've analyzed your current SIP allocations. Based on the recent volatility in emerging markets, rebalancing 5% toward your Sovereign Gold bonds could optimize your risk-adjusted returns for Q3.",
    },
    {
      role: "user",
      content:
        "That sounds prudent. Can you show me the projected growth for the gold bond allocation over the next 12 months?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, dashboardState]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isTyping) return;

    const userMessage: UiMessage = { role: "user", content: trimmedInput };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/v1/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "true",
        },
        body: JSON.stringify({
          user_id: "demo-user",
          messages: nextMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat API failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantReply = data?.reply || "I have updated your profile intelligence in real-time.";
      setMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);
    } catch (error) {
      console.error("Chat send error", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I could not connect to the backend intelligence service right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChipClick = (chip: string) => {
    const promptMap: Record<string, string> = {
      "Analyze my SIP": "Analyze my SIP allocation and suggest any tactical rebalance.",
      "Market outlook?": "What is the current market outlook and where should I allocate next?",
      "What is ET Prime?": "What is ET Prime and why should I subscribe?",
    };
    setInput(promptMap[chip] || chip);
  };

  const handleConciergeComplete = async (selection: ConciergeSelection) => {
    await initializeProfile(selection);
    setShowProfiling(false);
  };

  const handleVoiceTranscript = async (spokenText: string): Promise<string> => {
    const transcript = spokenText.trim();
    if (!transcript || isTyping) return "";

    const userMessage: UiMessage = { role: "user", content: transcript };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/v1/ai/voice-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "true",
        },
        body: JSON.stringify({
          text: transcript,
          user_id: "demo-user",
        }),
      });

      if (!response.ok) {
        throw new Error(`Voice Chat API failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantReply = data?.response || "I processed your voice request and updated your strategy.";
      setVoiceInsights({
        persona: data?.persona || "Beginner Investor",
        recommendations: data?.recommendations || {},
        confidence: {
          persona: data?.confidence?.persona || 0,
          hf_weight: data?.confidence?.hf_weight || 70,
          rl_weight: data?.confidence?.rl_weight || 30,
        },
      });
      setMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);
      return assistantReply;
    } catch (error) {
      console.error("Voice send error", error);
      const fallback = "I could not process voice input right now. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
      return fallback;
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="pt-16 sm:pt-20 md:pl-20 min-h-screen flex overflow-hidden relative">
      <AnimatePresence>
        {showProfiling && (
          <WelcomeConcierge onComplete={handleConciergeComplete} />
        )}
      </AnimatePresence>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[600px] lg:h-[600px] bg-[#97a9ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <section className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        <div ref={scrollRef} className="flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-y-auto pb-8 sm:pb-12 space-y-6 sm:space-y-8 no-scrollbar">
          {/* Initial Welcome / Orb */}
          <div className="flex flex-col items-center justify-center pt-6 sm:pt-12 text-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-[#97a9ff] via-[#bf81ff] to-[#3e65ff] mb-6 sm:mb-8 flex items-center justify-center orb-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-50 animate-pulse"></div>
              <span className="material-symbols-outlined text-white text-4xl sm:text-5xl relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">Welcome to ET AI Concierge OS.</h1>
            <p className="text-sm sm:text-base text-zinc-500 max-w-md">Your financial navigator for the Economic Times ecosystem. How can I help you today?</p>
          </div>

          {/* Chat Bubbles */}
          <div className="space-y-6 px-1 sm:px-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex gap-4 max-w-[85%] ${
                  message.role === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    message.role === "user"
                      ? "bg-[#97a9ff]"
                      : "bg-[#262626] border border-[#97a9ff]/20"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-sm ${
                      message.role === "user" ? "text-[#002283]" : "text-[#97a9ff]"
                    }`}
                  >
                    {message.role === "user" ? "person" : "smart_toy"}
                  </span>
                </div>
                <div
                  className={`p-6 rounded-lg border ${
                    message.role === "user"
                      ? "bg-[#201f1f] rounded-tr-none border-[#97a9ff]/10"
                      : "glass-card rounded-tl-none border-white/5"
                  }`}
                >
                  <p className="text-sm sm:text-base text-white leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-[#262626] flex items-center justify-center flex-shrink-0 border border-[#97a9ff]/20">
                  <span className="material-symbols-outlined text-[#97a9ff] text-sm">smart_toy</span>
                </div>
                <div className="glass-card px-6 py-4 rounded-lg rounded-tl-none border border-white/5 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Interaction Overlay */}
        <div className="max-w-4xl mx-auto w-full pb-4 sm:pb-8">
          <VoiceInsightsPanel insights={voiceInsights} />
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {["Analyze my SIP", "Market outlook?", "What is ET Prime?"].map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="bg-[#262626]/60 hover:bg-[#262626] text-zinc-400 hover:text-[#97a9ff] transition-all px-5 py-2 rounded-full border border-white/5 text-xs font-medium uppercase tracking-widest"
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#97a9ff]/20 via-[#bf81ff]/20 to-[#97a9ff]/20 rounded-xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
            <div className="relative bg-black border border-zinc-800 rounded-xl flex items-center p-1.5 sm:p-2 shadow-2xl">
              <button className="p-2 sm:p-3 text-zinc-500 hover:text-[#97a9ff] transition-colors">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 min-w-0 bg-transparent border-none text-sm sm:text-base text-white placeholder-zinc-600 focus:ring-0 px-2 sm:px-4 py-2 sm:py-3"
                placeholder="Ask ET AI Concierge anything..."
              />
              <div className="flex items-center gap-1 pr-1 sm:pr-2">
                <VoiceButton onTranscript={handleVoiceTranscript} />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-[#97a9ff] text-[#002283] p-2 sm:p-3 rounded-lg hover:bg-[#3e65ff] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Panel: Real-time Intelligence */}
      <section className="w-[400px] border-l border-zinc-800/50 bg-[#131313] p-8 hidden xl:flex flex-col gap-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold tracking-tight text-white">Real-time Intelligence</h2>
          <span className="bg-[#f9362c]/20 text-[#ff6e84] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#ff6e84] rounded-full animate-pulse"></span> Live
          </span>
        </div>

        <div className="space-y-6">
          <div className="bg-[#262626] p-6 rounded-xl border-l-4 border-[#97a9ff]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Global Markets</p>
                <h3 className="text-white font-semibold">Equity Momentum</h3>
              </div>
              <span className="material-symbols-outlined text-[#97a9ff]">trending_up</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold tracking-tighter">18,442.10</span>
              <span className="text-[#97a9ff] text-xs font-medium mb-1">+1.45%</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#bf81ff]/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#bf81ff] text-xl">tips_and_updates</span>
              </div>
              <h3 className="text-white font-semibold text-sm">Strategic Pivot</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">Institutional flow has increased in ESG bonds. Recommend allocating 10% of idle capital to the &apos;Sovereign Green&apos; fund.</p>
            <button className="w-full py-2.5 rounded-lg border border-[#bf81ff]/20 text-[#bf81ff] text-[10px] font-bold uppercase tracking-widest hover:bg-[#bf81ff]/10 transition-colors">Apply Strategy</button>
          </div>

          <div className="bg-[#262626] p-6 rounded-xl">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-6">Asset Distribution</p>
            <div className="flex items-end gap-2 h-24 mb-6">
              {[40, 70, 90, 55, 30].map((h, i) => (
                <div key={i} className={`flex-1 rounded-t-md relative group transition-all cursor-pointer ${i === 2 ? "bg-[#bf81ff]" : "bg-[#97a9ff]/20 hover:bg-[#97a9ff]/40"}`} style={{ height: `${h}%` }}>
                  {i !== 2 && <div className="absolute inset-0 bg-[#97a9ff] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-md"></div>}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-medium tracking-widest">
              <span>EQUITY</span>
              <span>GOLD</span>
              <span>CRYPTO</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-zinc-800/50">
          <div className="flex items-center justify-between text-xs mb-4">
            <span className="text-zinc-500">Security Status</span>
            <span className="text-[#97a9ff] font-bold">Encrypted</span>
          </div>
          <div className="w-full h-1 bg-[#1a1919] rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-[#97a9ff]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
