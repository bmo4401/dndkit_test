"use client";
import { cn } from "@/libs/utils";
import { useDraggable } from "@dnd-kit/core";

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
