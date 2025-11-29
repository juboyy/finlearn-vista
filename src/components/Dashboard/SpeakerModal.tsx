import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Video, Users, Award, TrendingUp, Calendar, Linkedin, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SpeakerData {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  specialties: string[];
  stats: {
    totalWebinars: number;
    totalParticipants: string;
    averageRating: number;
    totalReviews: number;
  };
  webinarHistory: {
    title: string;
    date: string;
    participants: string;
    rating: number;
    category: string;
  }[];
  reviews: {
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  achievements: {
    title: string;
    description: string;
    icon: string;
  }[];
  socialLinks: {
    linkedin?: string;
    email?: string;
  };
}

interface SpeakerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  speaker: SpeakerData | null;
}

export function SpeakerModal({ open, onOpenChange, speaker }: SpeakerModalProps) {
  if (!speaker) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Detalhes do Palestrante</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            <img 
              src={speaker.avatar} 
              alt={speaker.name}
              className="w-32 h-32 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{speaker.name}</h2>
                  <p className="text-muted-foreground">{speaker.role}</p>
                </div>
                <div className="flex gap-2">
                  {speaker.socialLinks.linkedin && (
                    <a 
                      href={speaker.socialLinks.linkedin}
                      className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center text-pastel-gray-dark hover:bg-opacity-80 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {speaker.socialLinks.email && (
                    <a 
                      href={`mailto:${speaker.socialLinks.email}`}
                      className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center text-pastel-gray-dark hover:bg-opacity-80 transition"
                    >
                      <Mail size={18} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {speaker.specialties.map((specialty, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="bg-pastel-purple/[0.3] border-pastel-purple text-pastel-gray-dark"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Video size={16} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Webinars</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{speaker.stats.totalWebinars}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={16} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Participantes</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{speaker.stats.totalParticipants}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Star size={16} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Avaliação</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{speaker.stats.averageRating}/5.0</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp size={16} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Reviews</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{speaker.stats.totalReviews}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Biography Section */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Biografia</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {speaker.bio}
            </p>
          </div>

          {/* Achievements Section */}
          {speaker.achievements.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Conquistas e Certificações</h3>
              <div className="grid grid-cols-2 gap-4">
                {speaker.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="text-pastel-gray-dark" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Webinar History Section */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Histórico de Webinars</h3>
            <div className="space-y-4">
              {speaker.webinarHistory.map((webinar, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-12 h-12 bg-pastel-blue/[0.3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="text-pastel-gray-dark" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{webinar.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {webinar.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {webinar.participants} participantes
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-pastel-yellow/[0.3] px-2 py-1 rounded-md">
                        <Star size={14} fill="currentColor" className="text-pastel-gray-dark" />
                        <span className="text-sm font-semibold text-foreground">{webinar.rating}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-pastel-green/[0.3] border-pastel-green text-pastel-gray-dark">
                      {webinar.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Avaliações Recentes</h3>
              <div className="flex items-center gap-2">
                <Star size={20} fill="currentColor" className="text-pastel-yellow" />
                <span className="text-2xl font-bold text-foreground">{speaker.stats.averageRating}</span>
                <span className="text-sm text-muted-foreground">de 5.0</span>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              {[5, 4, 3, 2, 1].map((rating) => {
                const percentage = rating === 5 ? 75 : rating === 4 ? 20 : 5;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-12">{rating} estrelas</span>
                    <Progress value={percentage} className="flex-1" />
                    <span className="text-sm text-muted-foreground w-12 text-right">{percentage}%</span>
                  </div>
                );
              })}
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {speaker.reviews.map((review, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < review.rating ? "currentColor" : "none"}
                          className={i < review.rating ? "text-pastel-yellow" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
