import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface EbookCardProps {
  title: string;
  author: string;
  authorAvatar: string;
  price: number;
  rating: number;
  sales: number;
  description: string;
  coverImage: string;
}

export const EbookCard = ({
  title,
  author,
  authorAvatar,
  price,
  rating,
  sales,
  description,
  coverImage,
}: EbookCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300 max-w-sm">
      <div className="relative mb-4">
        <Badge className="absolute top-2 left-2 bg-pastel-green text-foreground z-10">
          eBook
        </Badge>
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors z-10"
        >
          <Heart
            size={18}
            className={isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"}
          />
        </button>
        <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <img
            src={authorAvatar}
            alt={author}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">{author}</span>
        </div>

        <h3 className="font-semibold text-foreground line-clamp-2 min-h-[3rem]">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-500 text-yellow-500" />
            <span className="font-medium text-foreground">{rating}</span>
            <span className="text-muted-foreground">({sales})</span>
          </div>
          <span className="text-muted-foreground">· {sales} vendas</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-2xl font-bold text-foreground">
            R$ {price.toFixed(2).replace('.', ',')}
          </div>
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            Ver Detalhes
          </Button>
        </div>
      </div>
    </div>
  );
};
