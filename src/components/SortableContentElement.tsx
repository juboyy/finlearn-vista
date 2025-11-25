import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SlideChart } from "@/components/SlideChart";

export interface SlideElement {
  id: string;
  type: "text" | "image" | "chart";
  content?: string;
  imageUrl?: string;
  chartData?: any;
}

interface SortableContentElementProps {
  element: SlideElement;
  onUpdate: (id: string, field: keyof SlideElement, value: any) => void;
  onDelete: (id: string) => void;
}

export function SortableContentElement({
  element,
  onUpdate,
  onDelete,
}: SortableContentElementProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: element.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-lg p-4 hover:border-[#7FA8C9] transition-colors">
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 mt-1 flex-shrink-0"
        >
          <GripVertical className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          {element.type === "text" && (
            <Textarea
              value={element.content || ""}
              onChange={(e) => onUpdate(element.id, "content", e.target.value)}
              className="min-h-[120px] border-slate-300 bg-white resize-none"
              placeholder="Digite o conteúdo do texto..."
            />
          )}

          {element.type === "image" && element.imageUrl && (
            <div className="relative">
              <img
                src={element.imageUrl}
                alt="Slide content"
                className="w-full max-w-md h-auto rounded-lg border border-slate-200 object-cover"
              />
            </div>
          )}

          {element.type === "chart" && element.chartData && (
            <div className="max-w-md">
              <SlideChart
                type={element.chartData.type}
                data={element.chartData.data}
                title={element.chartData.title}
              />
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(element.id)}
          className="text-slate-400 hover:text-red-500 flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
