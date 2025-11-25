import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";

interface SortableSlideItemProps {
  slide: {
    id: string;
    title: string;
  };
  index: number;
  isActive: boolean;
  onSelect: () => void;
  onDelete: (id: string) => void;
}

export function SortableSlideItem({
  slide,
  index,
  isActive,
  onSelect,
  onDelete,
}: SortableSlideItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slide.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`p-3 cursor-pointer transition-all ${
        isActive
          ? "bg-[#E8D4C5] border-[#C9B88C]"
          : "bg-white hover:bg-slate-50"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 transition-colors"
        >
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">
            {slide.title}
          </p>
          <p className="text-xs text-slate-500">Slide {index + 1}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(slide.id);
          }}
          className="text-slate-400 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
