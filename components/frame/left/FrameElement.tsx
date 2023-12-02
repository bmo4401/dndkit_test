"use client";

import { FormElements } from "@/components/data";
import useForms from "@/hooks/useForms";
import { cn, generateId } from "@/libs/utils";
import { AttributeType, DndElementType } from "@/types/element";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { Menu } from "lucide-react";

interface FrameElementProps {
  element: AttributeType;
  id: string;
}

const FrameElement: React.FC<FrameElementProps> = ({ element, id }) => {
  const { type, designComponent: DesignComponent } = FormElements[element.type];
  const { addElement, removeElement, elements } = useForms();

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
      const isHandler = active.data.current?.isHandler;

      const isTopHalf = over?.data.current?.isTopHalf;
      const isBottomHalf = over?.data.current?.isBottomHalf;
      let index = elements.findIndex((element) => element.id === id);
      const activeId = over?.data.current?.id;
      const removeId = active.data.current?.id;

      isTopHalf && index;
      isBottomHalf && index++;
      /* Case 1: insert to top or bottom of existing element */
      if ((isTopHalf || isBottomHalf) && id === activeId) {
        if (isHandler) {
          removeElement(removeId);
          addElement({
            index,
            element: { ...FormElements[type], id: removeId },
          });
        } else {
          addElement({
            index,
            element: { ...FormElements[type], id: generateId() },
          });
        }
        return;
      }
    },
  });
  if (handlerDrag.isDragging) return null;
  return (
    <div className="flex w-full justify-between  gap-3 rounded-md  pb-2">
      <div
        ref={handlerDrag.setNodeRef}
        {...handlerDrag.attributes}
        {...handlerDrag.listeners}
        className=" flex aspect-square h-24 items-center justify-center rounded-md border border-slate-500"
      >
        {" "}
        <Menu />
      </div>
      <div
        className={cn(
          "relative w-full ",
          (topHalf.isOver || bottomHalf.isOver) && "opacity-80",
        )}
      >
        {" "}
        <DesignComponent element={{ ...element, id }} />
        {/* top half */}
        <div
          ref={topHalf.setNodeRef}
          className={cn(
            " absolute  left-0 top-0   h-12 w-full rounded-md",
            topHalf.isOver && "z-10 bg-emerald-500  ",
            topHalf.isOver ? "z-10" : "z-[-10]",
          )}
        >
          {topHalf.isOver && (
            <h2 className="flex h-full items-center justify-center font-bold opacity-100">
              Drop here
            </h2>
          )}
        </div>
        {/* top half */}
        <div
          ref={bottomHalf.setNodeRef}
          className={cn(
            " absolute bottom-0 left-0    h-12 w-full rounded-md",
            bottomHalf.isOver && " bg-rose-500 ",
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

export default FrameElement;
