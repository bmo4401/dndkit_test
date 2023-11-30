"use client";
import { FormElements } from "@/components/frame/left/Sidebar";
import FrameElement from "@/components/frame/right/FrameElement";
import useDesign from "@/hooks/useDesign";
import { generateId } from "@/libs/utils";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";

const Frame = () => {
  const { elements, addElement } = useDesign();
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
    <div className="flex h-full w-full justify-between rounded-md">
      <div className="h-screen w-[40%] overflow-hidden overflow-y-auto">
        {elements?.length &&
          elements.map((element) => (
            <div className="flex justify-between gap-2">
              <element.formComponent element={element} />
            </div>
          ))}
      </div>
      <div
        ref={droppable.setNodeRef}
        className="h-screen w-[60%]  overflow-hidden overflow-y-auto border "
      >
        {/* Form Builder */}
        {elements?.length ? (
          elements.map((element, index) => {
            return (
              <FrameElement
                id={element.id}
                key={element.id}
                element={element}
              />
            );
          })
        ) : (
          <h2>Not thing here</h2>
        )}
      </div>
    </div>
  );
};

export default Frame;
