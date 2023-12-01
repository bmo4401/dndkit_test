"use client";
import { FormElements } from "@/components/data";
console.log("❄️ ~ file: Frame.tsx:3 ~ FormElements:", FormElements);
import FrameElement from "@/components/frame/right/FrameElement";
import useForms from "@/hooks/useForms";
import { generateId } from "@/libs/utils";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { Form } from "@prisma/client";
import { useEffect } from "react";

const Frame = ({ form }: { form: Form }) => {
  const { elements, addElement, setElements } = useForms();
  console.log("❄️ ~ file: Frame.tsx:12 ~ elements:", elements);
  const droppable = useDroppable({
    id: "-drop-area",
    data: {
      isDropArea: true,
    },
  });
  useEffect(() => {
    if (form.content) {
      setElements(JSON.parse(form.content));
    }
  }, [form.id]);
  useDndMonitor({
    onDragEnd: ({ active, over }) => {
      const isDropArea = over?.id === "-drop-area";
      const isDndElement = active.data.current?.isDndElement;
      if (!isDndElement) return;
      const type = active.data.current?.type as string;
      const DndElement = FormElements[type];
      console.log("❄️ ~ file: Frame.tsx:31 ~ DndElement:", DndElement);

      /* Insert element */
      if (isDropArea && isDndElement && elements.length === 0) {
        let elementData = DndElement;
        elementData.id = generateId();
        addElement({ element: elementData });
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
