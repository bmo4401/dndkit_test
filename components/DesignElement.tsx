"use client";

import { FormElements } from "@/components/DndElements";
import useDesign from "@/hooks/useDesign";
import useSelect from "@/hooks/useSelect";
import { cn, generateId } from "@/libs/utils";
import { DndElementType, ElementType } from "@/types/element";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { Menu } from "lucide-react";

interface DesignElementProps {
  element: DndElementType;
  id: string;
}
type HandlerType = {
  isHandler: boolean;
  type: ElementType;
  id: string;
};
const DesignElement: React.FC<DesignElementProps> = ({ element, id }) => {
  const { type, designComponent: DesignComponent } = element;
  const { removeElement, addElement, updateElement, elements } = useDesign();

  const { setSelectedElement } = useSelect();

  const handlerDrag = useDraggable({
    id: id + "-handler",
    data: {
      isHandler: true,
      type,
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
      const type = active.data.current?.type;
      const isTopHalf = over?.data.current?.isTopHalf;
      const isBottomHalf = over?.data.current?.isBottomHalf;
      let index = elements.findIndex((element) => element.id === id);
      const activeId = over?.data.current?.id;

      isTopHalf && index;
      isBottomHalf && index++;
      /* Case 1: insert to top or bottom of existing element */
      if ((isTopHalf || isBottomHalf) && id === activeId) {
        addElement({
          index,
          element: { ...FormElements[type], id: generateId() },
        });
        return;
      }
    },
  });

  return (
    <div className="flex justify-between gap-3">
      <div
        ref={handlerDrag.setNodeRef}
        {...handlerDrag.attributes}
        {...handlerDrag.listeners}
        className="flex aspect-square h-24 items-center justify-center rounded-md border border-slate-500"
      >
        {" "}
        <Menu />
      </div>
      <div
        className={cn(
          "relative w-full border",
          (topHalf.isOver || bottomHalf.isOver) && "opacity-80",
        )}
      >
        {" "}
        {/* top half */}
        <div
          ref={topHalf.setNodeRef}
          className={cn(
            " absolute  left-0 top-0   h-12 w-full rounded-md",
            topHalf.isOver && "z-10   bg-rose-500",
            topHalf.isOver ? "z-10" : "z-[-10]",
          )}
        >
          {topHalf.isOver && (
            <h2 className="flex h-full items-center justify-center font-bold opacity-100">
              Drop here
            </h2>
          )}
        </div>
        <DesignComponent />
        <div
          ref={bottomHalf.setNodeRef}
          className={cn(
            " absolute bottom-0 left-0    h-12 w-full rounded-md",
            bottomHalf.isOver && " bg-emerald-500 ",
            bottomHalf.isOver ? "z-10" : "z-[-10]",
          )}
        >
          {bottomHalf.isOver && (
            <h2
              className="
          flex h-full items-center justify-center font-bold opacity-100
          "
            >
              Drop here
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignElement;
