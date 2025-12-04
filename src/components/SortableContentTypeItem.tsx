import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

interface ContentType {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  frequency: string;
  days: string;
  time: string;
  isActive: boolean;
}

interface SortableContentTypeItemProps {
  item: ContentType;
  frequencyOptions: string[];
  daysOptions: string[];
  getIconComponent: (iconName: string) => React.ComponentType<{ className?: string }>;
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, field: string, value: string | boolean) => void;
}

export function SortableContentTypeItem({
  item,
  frequencyOptions,
  daysOptions,
  getIconComponent,
  onToggleActive,
  onDelete,
  onUpdate,
}: SortableContentTypeItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  const IconComponent = getIconComponent(item.icon);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 transition-colors"
          >
            <GripVertical className="w-5 h-5" />
          </div>
          <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
            <IconComponent className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">{item.name}</h4>
            <p className="text-xs text-slate-500">{item.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleActive(item.id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-200 ${
              item.isActive ? 'bg-green-500' : 'bg-slate-300'
            }`}
            title={item.isActive ? 'Desativar' : 'Ativar'}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                item.isActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-xs font-medium min-w-[45px] ${item.isActive ? 'text-green-700' : 'text-slate-500'}`}>
            {item.isActive ? 'Ativo' : 'Inativo'}
          </span>
          <button 
            onClick={() => onDelete(item.id)}
            className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
            title="Remover"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Frequência</label>
          <select 
            value={item.frequency}
            onChange={(e) => onUpdate(item.id, 'frequency', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-200 outline-none"
          >
            {frequencyOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Dias de Publicação</label>
          <select 
            value={item.days}
            onChange={(e) => onUpdate(item.id, 'days', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-200 outline-none"
          >
            {daysOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Horário de Envio</label>
          <input 
            type="time" 
            value={item.time} 
            onChange={(e) => onUpdate(item.id, 'time', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-200 outline-none" 
          />
        </div>
      </div>
    </div>
  );
}
