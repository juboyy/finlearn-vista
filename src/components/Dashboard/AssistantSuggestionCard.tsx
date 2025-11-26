import { Clock, Newspaper, Lightbulb, BookOpen, MoreVertical, Brain, User } from "lucide-react";
import { AssistantSuggestion } from "@/hooks/useAssistantSuggestions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import auxiliarAvatar from "@/assets/auxiliar-do-dia-avatar.png";

interface AssistantSuggestionCardProps {
  suggestion: AssistantSuggestion;
  onMarkAsRead: (id: string) => void;
}

const suggestionTypeConfig = {
  news: {
    icon: Newspaper,
    label: "Notícia do Mercado",
    bgColor: "bg-pastel-blue",
    borderColor: "border-pastel-blue",
  },
  learning: {
    icon: BookOpen,
    label: "Oportunidade de Aprendizado",
    bgColor: "bg-pastel-green",
    borderColor: "border-pastel-green",
  },
  insights: {
    icon: Lightbulb,
    label: "Insight",
    bgColor: "bg-pastel-pink",
    borderColor: "border-pastel-pink",
  },
  reminders: {
    icon: Clock,
    label: "Lembrete",
    bgColor: "bg-pastel-peach",
    borderColor: "border-pastel-peach",
  },
};

export const AssistantSuggestionCard = ({ suggestion, onMarkAsRead }: AssistantSuggestionCardProps) => {
  const navigate = useNavigate();
  const config = suggestionTypeConfig[suggestion.suggestion_type];
  const Icon = config.icon;
  const timeAgo = formatDistanceToNow(new Date(suggestion.created_at), {
    addSuffix: true,
    locale: ptBR,
  });

  const handleClick = () => {
    if (!suggestion.is_read) {
      onMarkAsRead(suggestion.id);
    }
    
    // Navigate to related content if link is provided
    if (suggestion.metadata?.link) {
      navigate(suggestion.metadata.link);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-xl border-2 ${
        suggestion.is_read ? "border-slate-200" : config.borderColor
      } hover:shadow-md transition cursor-pointer`}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage 
              src={auxiliarAvatar} 
              alt="Auxiliar do dia"
              className="object-cover"
            />
            <AvatarFallback className="bg-pastel-purple text-foreground">AD</AvatarFallback>
          </Avatar>
          <div className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon className="text-slate-700" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-slate-500">{timeAgo}</span>
              {!suggestion.is_read && (
                <span className="w-2 h-2 bg-pastel-blue rounded-full"></span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">{suggestion.title}</h3>
            <p className="text-sm text-slate-600 mb-2">{suggestion.content}</p>
            
            {/* Show author info if metadata has it */}
            {suggestion.metadata?.showAuthor && suggestion.metadata?.authorName && (
              <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-pastel-blue/20 rounded-lg">
                <User size={14} className="text-slate-600" />
                <span className="text-xs text-slate-700 font-medium">{suggestion.metadata.authorName}</span>
              </div>
            )}
            
            {/* Show progress bar if metadata has it */}
            {suggestion.metadata?.showProgress && suggestion.metadata?.progressValue && (
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">
                    {suggestion.metadata.progressLabel || "Progresso"}
                  </span>
                  <span className="text-slate-700 font-semibold">
                    {suggestion.metadata.progressValue}%
                  </span>
                </div>
                <Progress value={suggestion.metadata.progressValue} className="h-2" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
