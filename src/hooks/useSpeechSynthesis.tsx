import { useState, useEffect, useCallback, useRef } from "react";

interface UseSpeechSynthesisReturn {
  isSpeaking: boolean;
  isVoiceModeEnabled: boolean;
  isSupported: boolean;
  speak: (text: string) => void;
  stop: () => void;
  toggleVoiceMode: () => void;
  setVoiceModeEnabled: (enabled: boolean) => void;
}

export const useSpeechSynthesis = (): UseSpeechSynthesisReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceModeEnabled, setIsVoiceModeEnabled] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const getPortugueseVoice = useCallback((): SpeechSynthesisVoice | null => {
    // Try to find a Brazilian Portuguese voice first
    let voice = voices.find(v => v.lang === "pt-BR");
    
    // Fallback to any Portuguese voice
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith("pt"));
    }
    
    // Fallback to default voice
    return voice || null;
  }, [voices]);

  const speak = useCallback((text: string) => {
    if (!isSupported || !text.trim()) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const portugueseVoice = getPortugueseVoice();
    if (portugueseVoice) {
      utterance.voice = portugueseVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, getPortugueseVoice]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  const toggleVoiceMode = useCallback(() => {
    setIsVoiceModeEnabled(prev => !prev);
    if (isSpeaking) {
      stop();
    }
  }, [isSpeaking, stop]);

  const setVoiceModeEnabled = useCallback((enabled: boolean) => {
    setIsVoiceModeEnabled(enabled);
    if (!enabled && isSpeaking) {
      stop();
    }
  }, [isSpeaking, stop]);

  return {
    isSpeaking,
    isVoiceModeEnabled,
    isSupported,
    speak,
    stop,
    toggleVoiceMode,
    setVoiceModeEnabled,
  };
};
