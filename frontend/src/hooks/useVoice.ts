"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  canUseSpeechRecognition,
  getSpeechRecognitionCtor,
  SpeechStatus,
  speakResponse,
  stopSpeaking,
} from "@/utils/speech";

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
};

export function useVoice() {
  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const supported = useMemo(() => canUseSpeechRecognition(), []);

  const startListening = useCallback(
    async (onTranscript: (text: string) => Promise<string | void>) => {
      if (!supported || status === "listening" || status === "processing") return;

      const Ctor = getSpeechRecognitionCtor();
      if (!Ctor) {
        setError("Speech recognition is not supported in this browser.");
        return;
      }

      setError(null);
      const recognition = new Ctor();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setStatus("listening");
      };

      recognition.onerror = (event) => {
        setError(event.error || "Voice recognition failed.");
        setStatus("idle");
      };

      recognition.onend = () => {
        if (status === "listening") {
          setStatus("idle");
        }
      };

      recognition.onresult = async (event) => {
        const transcript = event.results[0]?.[0]?.transcript?.trim() || "";
        if (!transcript) {
          setStatus("idle");
          return;
        }

        setStatus("processing");
        const reply = await onTranscript(transcript);

        if (reply && reply.trim()) {
          setStatus("speaking");
          await speakResponse(reply);
        }
        setStatus("idle");
      };

      recognition.start();
    },
    [status, supported]
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setStatus("idle");
  }, []);

  const cancelSpeech = useCallback(() => {
    stopSpeaking();
    setStatus("idle");
  }, []);

  return {
    supported,
    status,
    error,
    startListening,
    stopListening,
    cancelSpeech,
  };
}
