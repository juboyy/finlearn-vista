import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

interface DroppableContentAreaProps {
  id: string;
  children: ReactNode;
  isOver?: boolean;
}

export function DroppableContentArea({
  id,
  children,
}: DroppableContentAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative transition-all ${
        isOver
          ? "ring-2 ring-[#7FA8C9] ring-offset-2 bg-blue-50/30"
          : ""
      }`}
    >
      {children}
      {isOver && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-blue-50/10 border-2 border-dashed border-[#7FA8C9] rounded-lg">
          <p className="text-sm font-medium text-[#7FA8C9]">
            Solte aqui para posicionar
          </p>
        </div>
      )}
    </div>
  );
}
