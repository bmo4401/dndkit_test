"use client";
import { FormElements, FormElementsList } from "@/components/DndElements";
import FrameElement from "@/components/DesignElement";
import useDesign from "@/hooks/useDesign";
import { generateId } from "@/libs/utils";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { Menu } from "lucide-react";
import { useState } from "react";
import useSelect from "@/hooks/useSelect";

const Frame = () => {
  const { elements, addElement } = useDesign();
  const { selectedElement } = useSelect();
  const droppable = useDroppable({
    id: "-drop-area",
    data: {
      isDropArea: true,
    },
  });
  useDndMonitor({
    onDragEnd: ({ active, over }) => {
      const isDropArea = over?.id === "-drop-area";
      const isDndElement = active.data.current?.isDndElement;
      if (!isDndElement) return;
      const type = active.data.current?.type;
      const DndElement = FormElements[type];
      /* Insert element */
      if (isDropArea && isDndElement && elements.length === 0) {
        addElement({ element: { ...DndElement, id: generateId() } });
        return;
      }
      if (isDropArea && isDndElement) {
        addElement({
          index: elements.length,
          element: { ...DndElement, id: generateId() },
        });
        return;
      }
    },
  });
  return (
    <div className="flex h-full w-full justify-between gap-5  rounded-md">
      <div className="h-screen w-[40%] overflow-hidden overflow-y-auto">
        {/* Form Preview */}
        {elements?.length &&
          elements.map(({ formComponent: FormComponent }) => (
            <div className="flex justify-between gap-3">
              <FormComponent />
            </div>
          ))}
      </div>
      <div
        ref={droppable.setNodeRef}
        className="h-screen w-[60%] overflow-hidden overflow-y-auto border border-rose-500"
      >
        {/* Form Builder */}
        {elements?.length &&
          elements.map((element, index) => {
            return (
              <FrameElement
                id={element.id}
                key={element.id}
                element={element}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Frame;
