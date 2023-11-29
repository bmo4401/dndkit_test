"use client";
import useDesign from "@/hooks/useDesign";
import useSelect from "@/hooks/useSelect";
import { cn } from "@/libs/utils";
import { DndElementType, ElementType } from "@/types/element";
import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import { LucideIcon } from "lucide-react";

interface DndElementProps {
  id: string;
  property: React.FC;
}

const DndElement: React.FC<DndElementProps> = ({ id, property: Property }) => {
  const draggable = useDraggable({
    id: id + "-dnd-element",
    data: {
      isDndElement: true,
      type: id,
    },
  });
  const { selectedElement, setSelectedElement } = useSelect();

  useDndMonitor({
    onDragStart: ({ active }) => {
      const isDndElement = active.data.current?.isDndElement as boolean;
      const type = active.data.current?.type as ElementType;
      isDndElement && setSelectedElement({ type, isDndElement });
    },
    onDragEnd: ({ active, over }) => {
      setSelectedElement(null);
    },
  });
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(
        selectedElement?.isDndElement && selectedElement.type
          ? "opacity-60"
          : "opacity-100",
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Property />
    </div>
  );
};
export default DndElement;
