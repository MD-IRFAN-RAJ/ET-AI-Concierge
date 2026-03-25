"use client";

import { useVoice } from "@/hooks/useVoice";

type VoiceButtonProps = {
  onTranscript: (text: string) => Promise<string | void>;
};

export default function VoiceButton({ onTranscript }: VoiceButtonProps) {
  const { supported, status, error, startListening, stopListening, cancelSpeech } = useVoice();

  const handleClick = async () => {
    if (!supported) return;
    if (status === "listening") {
      stopListening();
      return;
    }
    if (status === "speaking") {
      cancelSpeech();
      return;
    }
    await startListening(onTranscript);
  };

  const isListening = status === "listening";
  const isBusy = status === "processing" || status === "speaking";

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={!supported || status === "processing"}
        className={`p-2 sm:p-3 rounded-lg transition-all border ${
          isListening
            ? "bg-[#ff7162]/20 text-[#ff7162] border-[#ff7162]/50 animate-pulse"
            : isBusy
            ? "bg-[#bf81ff]/20 text-[#bf81ff] border-[#bf81ff]/40"
            : "text-zinc-500 hover:text-[#bf81ff] border-transparent"
        } disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Voice input"
        title={
          !supported
            ? "Speech recognition unavailable"
            : isListening
            ? "Stop listening"
            : "Start voice input"
        }
      >
        <span className="material-symbols-outlined">mic</span>
      </button>

      <span className="text-[10px] uppercase tracking-widest text-zinc-500 min-h-3">
        {!supported
          ? "Voice unsupported"
          : status === "listening"
          ? "Listening"
          : status === "processing"
          ? "Processing"
          : status === "speaking"
          ? "AI Speaking"
          : error
          ? "Voice Error"
          : "Voice Ready"}
      </span>
    </div>
  );
}
