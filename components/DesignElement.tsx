"use client";

import { FormElements, FormElementsList } from "@/components/DndElements";
import useDesign from "@/hooks/useDesign";
import useSelect from "@/hooks/useSelect";
import { cn, generateId } from "@/libs/utils";
import { DndElementType } from "@/types/element";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { Menu } from "lucide-react";

interface DesignElementProps {
  element: DndElementType;
  id: string;
}
const DesignElement: React.FC<DesignElementProps> = ({ element, id }) => {
  const { type, designComponent: DesignComponent } = element;
  const { removeElement, addElement, elements } = useDesign();
  const { setSelectedElement } = useSelect();
  const draggable = useDraggable({
    id: id + "-frame-element",
    data: {
      isHandler: true,
      type: type,
      id,
    },
  });
  /* dnd top & bottom */
  const topHalf = useDroppable({
    id: id + "-top-half",
    data: {
      isTopHalf: true,
      id,
    },
  });
  const bottomHalf = useDroppable({
    id: id + "-bottom-half",
    data: {
      isBottomHalf: true,
      id,
    },
  });
  useDndMonitor({
    onDragEnd: ({ active, over }) => {
      const isDropArea = over?.id === "drop-area";
      const isHandler = active.data.current?.isHandler;
      const isDndElement = active.data.current?.isDndElement;
      const type = active.data.current?.type;
      /* Case 1: insert to top or bottom of existing element */
      const isTopHalf = over?.data.current?.isTopHalf;
      const isBottomHalf = over?.data.current?.isBottomHalf;
      const activeId = over?.data.current?.id;
      let index = elements.findIndex((element) => element.id === id);
      /* increase index */
      isTopHalf && index;
      isBottomHalf && index++;
      if ((isTopHalf || isBottomHalf) && id === activeId) {
        addElement({
          index,
          element: { ...FormElements[type], id: generateId() },
        });
        return;
      }
      /* Case 2: insert to empty frame */
    },
  });
  useDndMonitor({
    onDragStart: ({ active }) => {
      const isHandler = active.data.current?.isHandler;
      const id = active.data.current?.id;

      isHandler && removeElement(id);
      setSelectedElement({ type, isHandler });
    },
  });
  return (
    <div className="flex justify-between gap-3">
      <div
        ref={draggable.setNodeRef}
        {...draggable.attributes}
        {...draggable.listeners}
        className="flex aspect-square h-24 items-center justify-center rounded-md border border-slate-500"
      >
        {" "}
        <Menu />
      </div>
      <div className="relative w-full border border-rose-500">
        {" "}
        {/* top half */}
        <div
          ref={topHalf.setNodeRef}
          className={cn(
            " absolute left-0 top-0 h-12 w-full rounded-md",
            topHalf.isOver && " bg-rose-500",
          )}
        />
        <DesignComponent />
        <div
          ref={bottomHalf.setNodeRef}
          className={cn(
            " absolute bottom-0 left-0 h-12 w-full rounded-md ",
            bottomHalf.isOver && "bg-emerald-500",
          )}
        />
      </div>
    </div>
  );
};

export default DesignElement;
