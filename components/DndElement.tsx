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
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(draggable.isDragging && "opacity-60")}
    >
      <Property />
    </div>
  );
};
export default DndElement;
