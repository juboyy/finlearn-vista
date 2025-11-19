import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  type: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  tags: string[];
  duration: string;
  durationIcon: React.ReactNode;
  image: string;
  badgeColor: string;
}

export const ContentCard = ({ 
  type, 
  title, 
  description, 
  author, 
  authorImage, 
  tags, 
  duration, 
  durationIcon,
  image,
  badgeColor 
}: ContentCardProps) => {
  return (
    <div className="rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="h-40 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <Badge className={cn("mb-2 self-start", badgeColor)}>
          {type}
        </Badge>
        <h3 className="font-medium text-foreground mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">{description}</p>
        <div className="flex items-center gap-2 mb-3">
          <img src={authorImage} alt={author} className="w-6 h-6 rounded-full object-cover" />
          <span className="text-xs text-muted-foreground">Por {author}</span>
        </div>
        <div className="flex gap-2 mb-4 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2 border-t border-border">
          <span className="flex items-center gap-1">
            {durationIcon}
            {duration}
          </span>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Bookmark size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
