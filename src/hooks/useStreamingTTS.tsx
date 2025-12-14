import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseStreamingTTSReturn {
  isGenerating: boolean;
  isPlaying: boolean;
  speak: (text: string) => Promise<void>;
  stop: () => void;
}

export const useStreamingTTS = (): UseStreamingTTSReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const isStoppedRef = useRef(false);

  const stop = useCallback(() => {
    isStoppedRef.current = true;
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // Already stopped
      }
      sourceNodeRef.current = null;
    }
    setIsGenerating(false);
    setIsPlaying(false);
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return;

    isStoppedRef.current = false;
    setIsGenerating(true);

    try {
      // Get the function URL
      const { data: { session } } = await supabase.auth.getSession();
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/text-to-speech-elevenlabs-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || supabaseKey}`,
          'apikey': supabaseKey,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`TTS error: ${response.status}`);
      }

      if (isStoppedRef.current) return;

      // Collect all chunks into a single buffer for MP3 playback
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const chunks: Uint8Array[] = [];
      let totalLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (isStoppedRef.current) {
          reader.cancel();
          return;
        }
        chunks.push(value);
        totalLength += value.length;
      }

      if (isStoppedRef.current) return;

      // Combine all chunks
      const audioData = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        audioData.set(chunk, offset);
        offset += chunk.length;
      }

      setIsGenerating(false);
      setIsPlaying(true);

      // Create audio context and play
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const audioBuffer = await audioContextRef.current.decodeAudioData(audioData.buffer);
      
      if (isStoppedRef.current) return;

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      sourceNodeRef.current = source;

      source.onended = () => {
        setIsPlaying(false);
        sourceNodeRef.current = null;
      };

      source.start(0);
    } catch (error) {
      console.error('Streaming TTS error:', error);
      setIsGenerating(false);
      setIsPlaying(false);
    }
  }, []);

  return {
    isGenerating,
    isPlaying,
    speak,
    stop,
  };
};
