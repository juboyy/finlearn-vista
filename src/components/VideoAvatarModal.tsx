import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Volume2, VolumeX, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import aiAvatarImage from "@/assets/ai-avatar-presenter.png";

interface VideoAvatarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleTitle: string;
  articleContent: string;
}

const ELEVENLABS_VOICES = [
  { id: "9BWtsMINqrJLrRacOk9x", name: "Aria", gender: "Feminino" },
  { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", gender: "Masculino" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", gender: "Feminino" },
  { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura", gender: "Feminino" },
  { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie", gender: "Masculino" },
  { id: "JBFqnCBsd6RMkjVDRZzb", name: "George", gender: "Masculino" },
  { id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum", gender: "Masculino" },
  { id: "SAz9YHcvj6GT2YYXdXww", name: "River", gender: "Neutro" },
  { id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam", gender: "Masculino" },
  { id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte", gender: "Feminino" },
  { id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice", gender: "Feminino" },
  { id: "XrExE9yKIg1WjnnlVkGX", name: "Matilda", gender: "Feminino" },
  { id: "bIHbv24MWmeRgasZH58o", name: "Will", gender: "Masculino" },
  { id: "cgSgspJ2msm6clMCkdW9", name: "Jessica", gender: "Feminino" },
  { id: "cjVigY5qzO86Huf0OWal", name: "Eric", gender: "Masculino" },
  { id: "iP95p4xoKVk53GoZ742B", name: "Chris", gender: "Masculino" },
  { id: "nPczCjzI2devNBz1zQrb", name: "Brian", gender: "Masculino" },
  { id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel", gender: "Masculino" },
  { id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily", gender: "Feminino" },
  { id: "pqHfZKP75CvOlQylNhV4", name: "Bill", gender: "Masculino" },
];

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VideoAvatarModal = ({ 
  open, 
  onOpenChange, 
  articleTitle,
  articleContent 
}: VideoAvatarModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioGenerated, setAudioGenerated] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(ELEVENLABS_VOICES[0].id);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const generateAvatarAudio = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech-elevenlabs', {
        body: { text: articleContent, voiceId: selectedVoice }
      });

      if (error) throw error;

      if (data?.audioContent) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        
        audioRef.current.src = audioUrl;
        audioRef.current.playbackRate = 1;
        
        audioRef.current.onloadedmetadata = () => {
          setDuration(audioRef.current?.duration || 0);
        };
        
        audioRef.current.ontimeupdate = () => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
          }
        };
        
        audioRef.current.onplay = () => {
          setIsSpeaking(true);
        };
        
        audioRef.current.onpause = () => {
          setIsSpeaking(false);
        };
        
        audioRef.current.onended = () => {
          setIsPlaying(false);
          setIsSpeaking(false);
          setProgress(100);
        };
        
        setAudioGenerated(true);
        toast({
          title: "Avatar pronto",
          description: "Clique em play para iniciar a narração"
        });
      }
    } catch (error) {
      console.error('Error generating avatar audio:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o áudio do avatar",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVoiceChange = (voiceId: string) => {
    setSelectedVoice(voiceId);
    // Reset audio if already generated
    if (audioGenerated) {
      setAudioGenerated(false);
      setCurrentTime(0);
      setProgress(0);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
  };

  const selectedVoiceData = ELEVENLABS_VOICES.find(v => v.id === selectedVoice);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Avatar IA - Narração do Artigo
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          {/* Avatar Display with Video-like Animation */}
          <div className="relative w-72 h-72 rounded-2xl overflow-hidden border-4 border-pastel-purple/30 shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200">
            {/* Animated Avatar Container */}
            <div 
              className={`w-full h-full relative ${isSpeaking ? 'animate-speaking' : ''}`}
              style={{
                animation: isSpeaking 
                  ? 'breathe 3s ease-in-out infinite, headMove 4s ease-in-out infinite' 
                  : 'breathe 4s ease-in-out infinite'
              }}
            >
              <img 
                src={aiAvatarImage} 
                alt="Avatar IA" 
                className="w-full h-full object-cover"
                style={{
                  transformOrigin: 'center center',
                }}
              />
            </div>
            
            {/* Speaking overlay effects */}
            {isSpeaking && (
              <>
                {/* Animated ring */}
                <div 
                  className="absolute inset-0 rounded-2xl border-2 border-pastel-purple/50"
                  style={{
                    animation: 'pulse-ring 1.5s ease-in-out infinite'
                  }}
                />
                
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle at center, transparent 60%, rgba(160, 120, 200, 0.15) 100%)',
                    animation: 'glow-pulse 2s ease-in-out infinite'
                  }}
                />
              </>
            )}
            
            {/* Speaking indicator bar */}
            {isSpeaking && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-white rounded-full"
                    style={{
                      animation: 'soundWave 0.6s ease-in-out infinite',
                      animationDelay: `${i * 0.08}s`,
                      height: '12px'
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Live indicator */}
            {isSpeaking && (
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                AO VIVO
              </div>
            )}
          </div>
          
          {/* Custom animation styles */}
          <style>{`
            @keyframes breathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.02); }
            }
            @keyframes headMove {
              0%, 100% { transform: translateX(0) rotate(0deg); }
              25% { transform: translateX(2px) rotate(0.5deg); }
              75% { transform: translateX(-2px) rotate(-0.5deg); }
            }
            @keyframes pulse-ring {
              0%, 100% { opacity: 0.5; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.02); }
            }
            @keyframes glow-pulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.6; }
            }
            @keyframes soundWave {
              0%, 100% { height: 4px; opacity: 0.5; }
              50% { height: 16px; opacity: 1; }
            }
          `}</style>

          {/* Voice Selector */}
          <div className="w-full max-w-md space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <User size={16} className="text-pastel-purple" />
              Escolha a voz do avatar
            </label>
            <Select value={selectedVoice} onValueChange={handleVoiceChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma voz" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {ELEVENLABS_VOICES.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    <span className="flex items-center gap-2">
                      {voice.name}
                      <span className="text-xs text-muted-foreground">({voice.gender})</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Article Title */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Narrando:</p>
            <p className="font-medium text-foreground text-sm max-w-md truncate">{articleTitle}</p>
          </div>

          {/* Generate Button */}
          {!audioGenerated && !isLoading && (
            <Button
              onClick={generateAvatarAudio}
              className="px-6"
              style={{ backgroundColor: 'hsl(271, 35%, 65%)' }}
            >
              Gerar Narracao com {selectedVoiceData?.name}
            </Button>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-pastel-purple border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Gerando audio com voz de {selectedVoiceData?.name}...</p>
            </div>
          )}

          {/* Audio Controls */}
          {audioGenerated && !isLoading && (
            <div className="w-full max-w-md space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-pastel-purple"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={restart}
                  className="h-10 w-10 rounded-full"
                >
                  <RotateCcw size={18} />
                </Button>
                
                <Button
                  onClick={togglePlayPause}
                  className="h-14 w-14 rounded-full"
                  style={{ backgroundColor: 'hsl(271, 35%, 65%)' }}
                >
                  {isPlaying ? (
                    <Pause size={24} className="text-white" />
                  ) : (
                    <Play size={24} className="text-white ml-1" />
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleMute}
                  className="h-10 w-10 rounded-full"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
