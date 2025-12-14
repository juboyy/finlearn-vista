import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  isProcessing: boolean;
  hasFinishedRecording: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  resetFinished: () => void;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [hasFinishedRecording, setHasFinishedRecording] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSoundTimeRef = useRef<number>(Date.now());

  // Voice Activity Detection constants
  const SILENCE_THRESHOLD = 0.01; // Lower threshold for better sensitivity
  const SILENCE_DURATION = 1500; // 1.5 seconds of silence to stop
  const GRACE_PERIOD = 2000; // 2 seconds grace period before VAD starts checking
  const isListeningRef = useRef(false);
  const startTimeRef = useRef<number>(0);

  const stopMediaRecorder = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
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
        setHasFinishedRecording(true);
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const checkAudioLevel = useCallback(() => {
    if (!analyserRef.current || !isListeningRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average volume level
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    const normalizedLevel = average / 255;

    // Check if we're still in grace period
    const timeSinceStart = Date.now() - startTimeRef.current;
    const inGracePeriod = timeSinceStart < GRACE_PERIOD;

    if (normalizedLevel > SILENCE_THRESHOLD) {
      // Sound detected - reset silence timer
      lastSoundTimeRef.current = Date.now();
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
    } else if (!inGracePeriod) {
      // Silence detected (and grace period passed) - check if we should stop
      const silenceDuration = Date.now() - lastSoundTimeRef.current;
      if (silenceDuration > SILENCE_DURATION && !silenceTimeoutRef.current) {
        silenceTimeoutRef.current = setTimeout(() => {
          console.log("VAD: Silence detected, stopping recording");
          stopMediaRecorder();
          setIsListening(false);
          isListeningRef.current = false;
        }, 100);
      }
    }

    // Continue monitoring if still listening
    if (isListeningRef.current) {
      requestAnimationFrame(checkAudioLevel);
    }
  }, [stopMediaRecorder]);

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
      startTimeRef.current = Date.now(); // Record start time for grace period
      lastSoundTimeRef.current = Date.now();

      // Setup audio analysis for VAD
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

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
      isListeningRef.current = true;
      setTranscript("");
      setHasFinishedRecording(false);

      console.log("Started listening with VAD enabled");
      // Start voice activity detection
      requestAnimationFrame(checkAudioLevel);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsSupported(false);
    }
  }, [isListening, transcribeAudio, checkAudioLevel]);

  const stopListening = useCallback(() => {
    if (!isListeningRef.current) return;
    
    stopMediaRecorder();
    setIsListening(false);
    isListeningRef.current = false;
  }, [stopMediaRecorder]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  const resetFinished = useCallback(() => {
    setHasFinishedRecording(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMediaRecorder();
    };
  }, [stopMediaRecorder]);

  return {
    isListening,
    transcript,
    isSupported,
    isProcessing,
    hasFinishedRecording,
    startListening,
    stopListening,
    resetTranscript,
    resetFinished,
  };
};
