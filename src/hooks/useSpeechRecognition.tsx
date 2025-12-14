import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  isProcessing: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const stopMediaRecorder = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const transcribeAudio = useCallback(async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Convert blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = "";
      const chunkSize = 0x8000;
      
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
        binary += String.fromCharCode.apply(null, Array.from(chunk));
      }
      
      const base64Audio = btoa(binary);

      const { data, error } = await supabase.functions.invoke("transcribe-audio-elevenlabs", {
        body: { audio: base64Audio },
      });

      if (error) {
        console.error("Transcription error:", error);
        return;
      }

      if (data?.text) {
        setTranscript(data.text);
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const startListening = useCallback(async () => {
    if (isListening) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { 
          type: mediaRecorder.mimeType 
        });
        
        if (audioBlob.size > 0) {
          await transcribeAudio(audioBlob);
        }
        
        chunksRef.current = [];
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setIsListening(false);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsListening(true);
      setTranscript("");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsSupported(false);
    }
  }, [isListening, transcribeAudio]);

  const stopListening = useCallback(() => {
    if (!isListening) return;
    
    stopMediaRecorder();
    setIsListening(false);
  }, [isListening, stopMediaRecorder]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    isProcessing,
    startListening,
    stopListening,
    resetTranscript,
  };
};
