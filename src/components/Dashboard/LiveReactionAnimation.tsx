import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Heart, ThumbsUp, Flame, Rocket, Star, Sparkles } from "lucide-react";

interface Reaction {
  id: string;
  reaction_type: string;
  user_name: string;
  created_at: string;
  x: number;
  y: number;
}

interface LiveReactionAnimationProps {
  liveId: string;
}

const reactionIcons = {
  like: ThumbsUp,
  love: Heart,
  fire: Flame,
  rocket: Rocket,
  star: Star,
  clap: Sparkles,
};

const reactionColors = {
  like: "hsl(207, 35%, 55%)", // pastel blue
  love: "hsl(350, 40%, 60%)", // pastel pink
  fire: "hsl(25, 45%, 60%)", // pastel orange
  rocket: "hsl(270, 35%, 60%)", // pastel purple
  star: "hsl(44, 40%, 65%)", // pastel yellow
  clap: "hsl(142, 35%, 60%)", // pastel green
};

export const LiveReactionAnimation = ({ liveId }: LiveReactionAnimationProps) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    // Subscribe to real-time reactions
    const channel = supabase
      .channel(`live-reactions-${liveId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "live_chat_reactions",
          filter: `live_id=eq.${liveId}`,
        },
        (payload) => {
          const newReaction = payload.new as any;
          const reaction: Reaction = {
            id: newReaction.id,
            reaction_type: newReaction.reaction_type,
            user_name: newReaction.user_name,
            created_at: newReaction.created_at,
            x: Math.random() * 80 + 10, // Random position 10% to 90%
            y: 100, // Start from bottom
          };
          
          setReactions((prev) => [...prev, reaction]);

          // Remove reaction after animation completes
          setTimeout(() => {
            setReactions((prev) => prev.filter((r) => r.id !== reaction.id));
          }, 3000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [liveId]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {reactions.map((reaction) => {
        const Icon = reactionIcons[reaction.reaction_type as keyof typeof reactionIcons];
        const color = reactionColors[reaction.reaction_type as keyof typeof reactionColors];
        
        return (
          <div
            key={reaction.id}
            className="absolute animate-float-up"
            style={{
              left: `${reaction.x}%`,
              bottom: "0",
              animation: "float-up 3s ease-out forwards",
            }}
          >
            <div 
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border"
              style={{ borderColor: color }}
            >
              <Icon 
                className="w-6 h-6" 
                style={{ color }} 
                fill={color}
              />
              <span className="text-sm font-medium text-slate-700">
                {reaction.user_name}
              </span>
            </div>
          </div>
        );
      })}
      
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-50vh) scale(1.2) rotate(10deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0.8) rotate(-10deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};