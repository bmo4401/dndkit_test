"use client";
import { FormElements } from "@/components/DndElements";
import useSelect from "@/hooks/useSelect";
import { DndElementType } from "@/types/element";
import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

const DndElementOverlay = () => {
  const [activeElement, setActiveElement] = useState<DndElementType | null>(
    null,
  );
  const { selectedElement } = useSelect();
  useDndMonitor({
    onDragStart: (event) => {
      console.log({ event });
    },
    onDragCancel: () => {
      setActiveElement(null);
    },
    onDragEnd: () => {
      setActiveElement(null);
    },
  });
  if (!selectedElement) return;
  const propertyOverlay =
    selectedElement.isDndElement &&
    FormElements[selectedElement.type].propertyComponent;
  const designerOverlay =
    selectedElement.isHandler &&
    FormElements[selectedElement.type].designComponent;
  const Overlay = (designerOverlay ?? propertyOverlay) as React.FC;
  return (
    <DragOverlay>
      <div className=" w-96">
        <Overlay />
      </div>
    </DragOverlay>
  );
};
export default DndElementOverlay;
