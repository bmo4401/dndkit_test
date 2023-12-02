"use client";
import { FormElements } from "@/components/data";
import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

const DndElementOverlay = () => {
  const [node, setNode] = useState<any | null>(null);
  useDndMonitor({
    onDragStart: ({ active }) => {
      const isHandler = active.data.current?.isHandler;
      const isDndElement = active.data.current?.isDndElement;
      const type = active.data.current?.type;
      if (!isHandler && !isDndElement && !type) return;
      let Node = null;
      if (isHandler) {
        Node =
          FormElements[type].designOverlay ??
          FormElements[type].designComponent;
      }
      if (isDndElement) {
        Node = FormElements[type].propertyComponent;
      }
      setNode(Node);
    },
    onDragCancel: () => {
      setNode(null);
    },
    onDragEnd: () => {
      setNode(null);
    },
  });
  if (!node) return null;

  return (
    <DragOverlay>
      <div className="w-96">{node}</div>
    </DragOverlay>
  );
};
export default DndElementOverlay;
