import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Headphones, Play, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ArticleProgress {
  id: string;
  article_id: string;
  article_title: string;
  progress_percentage: number;
  current_time_seconds: number;
  total_duration_seconds: number;
  last_played_at: string;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const ArticlesInProgress = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<ArticleProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticlesInProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('article_audio_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('completed', false)
          .order('last_played_at', { ascending: false })
          .limit(4);

        if (error) throw error;
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles in progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesInProgress();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Headphones size={20} className="text-pastel-purple" />
          <h2 className="text-lg font-semibold text-foreground">Artigos em Andamento</h2>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-muted rounded-lg h-20" />
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Headphones size={20} style={{ color: 'hsl(271, 35%, 65%)' }} />
          <h2 className="text-lg font-semibold text-foreground">Artigos em Andamento</h2>
        </div>
        <Link to="/aprendizado" className="text-sm text-muted-foreground hover:text-foreground font-medium">
          Ver todos
        </Link>
      </div>
      
      <div className="space-y-3">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            to={`/artigo/${article.article_id}`}
            className="block"
          >
            <div className="p-4 rounded-lg border border-border hover:border-pastel-purple/50 hover:bg-muted/50 transition-all cursor-pointer group">
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: 'hsl(271, 35%, 65%, 0.2)' }}
                >
                  <Play size={18} style={{ color: 'hsl(271, 35%, 65%)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm truncate">
                    {article.article_title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {formatTime(article.current_time_seconds)} / {formatTime(article.total_duration_seconds)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={article.progress_percentage} 
                      className="h-1.5"
                    />
                  </div>
                </div>
                <span 
                  className="text-xs font-medium px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: 'hsl(271, 35%, 65%, 0.2)',
                    color: 'hsl(271, 35%, 45%)'
                  }}
                >
                  {Math.round(article.progress_percentage)}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
