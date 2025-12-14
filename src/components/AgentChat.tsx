import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Trash2, Save, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgentChat } from "@/hooks/useAgentChat";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AgentChatProps {
  agentName: string;
  agentImage: string;
  onClose: () => void;
}

export const AgentChat = ({ agentName, agentImage, onClose }: AgentChatProps) => {
  const [input, setInput] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { messages, sendMessage, isLoading, clearMessages } = useAgentChat(agentName);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const lastMessageCountRef = useRef(0);

  // Speech Recognition Hook
  const {
    isListening,
    transcript,
    isSupported: isRecognitionSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  // Speech Synthesis Hook
  const {
    isSpeaking,
    isVoiceModeEnabled,
    isSupported: isSynthesisSupported,
    speak,
    stop: stopSpeaking,
    toggleVoiceMode,
  } = useSpeechSynthesis();

  // Update input field with transcript
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-speak new assistant messages when voice mode is enabled
  useEffect(() => {
    if (isVoiceModeEnabled && messages.length > lastMessageCountRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        speak(lastMessage.content);
      }
    }
    lastMessageCountRef.current = messages.length;
  }, [messages, isVoiceModeEnabled, speak]);

  // Stop speaking when user starts listening
  useEffect(() => {
    if (isListening && isSpeaking) {
      stopSpeaking();
    }
  }, [isListening, isSpeaking, stopSpeaking]);

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDeleteConversation = () => {
    clearMessages();
    setShowDeleteDialog(false);
    toast({
      title: "Conversa excluída",
      description: "O histórico da conversa foi removido.",
    });
  };

  const handleSaveConversation = async () => {
    if (messages.length === 0) {
      toast({
        title: "Nenhuma mensagem",
        description: "Não há mensagens para salvar.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para salvar conversas.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      // Generate a title from the first user message
      const firstUserMessage = messages.find(m => m.role === "user");
      const title = firstUserMessage 
        ? firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? "..." : "")
        : `Conversa com ${agentName}`;

      const { error } = await supabase
        .from("agent_conversations")
        .insert([{
          user_id: user.id,
          agent_name: agentName,
          agent_image: agentImage,
          title,
          messages: JSON.parse(JSON.stringify(messages))
        }]);

      if (error) throw error;

      toast({
        title: "Conversa salva",
        description: "A conversa foi salva no histórico.",
      });
    } catch (error) {
      console.error("Error saving conversation:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a conversa. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-3xl h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-4 p-6 border-b border-border">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img src={agentImage} alt={agentName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">{agentName}</h2>
              <p className="text-sm text-muted-foreground">Chat em tempo real</p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Voice Mode Toggle */}
              {isSynthesisSupported && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleVoiceMode}
                      className={`p-2.5 rounded-lg transition-colors ${
                        isVoiceModeEnabled
                          ? "bg-[hsl(207,35%,55%)] text-white"
                          : "bg-[hsl(207,35%,75%)] text-[hsl(207,35%,25%)] hover:bg-[hsl(207,35%,65%)]"
                      } ${isSpeaking ? "animate-pulse" : ""}`}
                    >
                      {isVoiceModeEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isVoiceModeEnabled ? "Desativar modo voz" : "Ativar modo voz"}</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleSaveConversation}
                    disabled={isSaving || messages.length === 0}
                    className="p-2.5 rounded-lg bg-[hsl(160,35%,75%)] text-[hsl(160,35%,25%)] hover:bg-[hsl(160,35%,65%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Salvar no histórico</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={messages.length === 0}
                    className="p-2.5 rounded-lg bg-[hsl(340,35%,75%)] text-[hsl(340,35%,25%)] hover:bg-[hsl(340,35%,65%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={18} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Excluir conversa</p>
                </TooltipContent>
              </Tooltip>

              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p>Inicie uma conversa com {agentName}</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img src={agentImage} alt={agentName} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img src={agentImage} alt={agentName} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-sm text-muted-foreground">Pensando...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-6 border-t border-border">
            <div className="flex gap-3">
              {/* Microphone Button */}
              {isRecognitionSupported && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleMicClick}
                      className={`flex-shrink-0 transition-all ${
                        isListening
                          ? "bg-[hsl(340,35%,55%)] text-white border-[hsl(340,35%,55%)] animate-pulse"
                          : "hover:bg-[hsl(207,35%,85%)]"
                      }`}
                    >
                      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isListening ? "Parar de ouvir" : "Falar"}</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? "Ouvindo..." : "Digite sua mensagem..."}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              </Button>
            </div>
            
            {/* Voice Status Indicator */}
            {(isListening || isSpeaking) && (
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                {isListening && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[hsl(340,35%,55%)] animate-pulse" />
                    Ouvindo...
                  </span>
                )}
                {isSpeaking && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[hsl(207,35%,55%)] animate-pulse" />
                    Falando...
                    <button
                      onClick={stopSpeaking}
                      className="ml-1 underline hover:text-foreground"
                    >
                      Parar
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conversa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta conversa? Esta ação não pode ser desfeita e todo o histórico será perdido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConversation}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
