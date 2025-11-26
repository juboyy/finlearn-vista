import { Clock, Newspaper, Lightbulb, BookOpen, MoreVertical, Brain } from "lucide-react";
import { AssistantSuggestion } from "@/hooks/useAssistantSuggestions";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

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
          <div className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon className="text-slate-700" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2 py-0.5 ${config.bgColor} bg-opacity-30 rounded text-xs font-medium text-slate-700`}
              >
                {config.label}
              </span>
              <span className="px-2 py-0.5 bg-slate-800 text-white rounded text-xs font-medium flex items-center gap-1">
                <Brain size={12} />
                Auxiliar do dia
              </span>
              <span className="text-xs text-slate-500">{timeAgo}</span>
              {!suggestion.is_read && (
                <span className="w-2 h-2 bg-pastel-blue rounded-full"></span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">{suggestion.title}</h3>
            <p className="text-sm text-slate-600">{suggestion.content}</p>
            {suggestion.priority === "high" && (
              <span className="inline-block mt-2 px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
                Alta prioridade
              </span>
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
