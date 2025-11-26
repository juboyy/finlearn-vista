import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomChart {
  id: string;
  title: string;
  columns: string[];
  type: "bar" | "line" | "pie";
}

interface SortableChartItemProps {
  chart: CustomChart;
  onEdit: (chart: CustomChart) => void;
  onDelete: (chartId: string) => void;
}

export function SortableChartItem({ chart, onEdit, onDelete }: SortableChartItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chart.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 border-2 rounded-lg hover:border-[hsl(142,35%,75%)] transition-all ${
        isDragging ? "border-[hsl(142,35%,75%)] shadow-lg z-10" : "border-slate-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-slate-100 rounded transition-colors"
        >
          <GripVertical className="h-5 w-5 text-slate-400" />
        </button>
        
        <div className="flex-1">
          <p className="font-semibold text-sm text-slate-800">{chart.title}</p>
          <p className="text-xs text-slate-500 mt-1">
            {chart.columns.length} coluna(s) • {chart.type === "bar" ? "Barras" : chart.type === "line" ? "Linha" : "Pizza"}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(chart)}
            className="h-8 px-2"
          >
            <i className="fas fa-edit text-slate-600"></i>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(chart.id)}
            className="h-8 px-2 hover:text-red-600"
          >
            <i className="fas fa-trash text-slate-600"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}
