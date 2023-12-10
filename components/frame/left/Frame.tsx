"use client";
import FrameElement from "@/components/frame/left/FrameElement";
import { FormElements } from "@/components/frame/right/Sidebar";
import useForms from "@/hooks/useForms";
import { cn, generateId } from "@/libs/utils";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { Form } from "@prisma/client";

const Frame = ({ form }: { form: Form }) => {
  const { elements, addElement, setElements } = useForms();
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
      const type = active.data.current?.type as string;
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
    <div className={cn(" flex h-full w-full justify-center  ")}>
      {/*       <div className="scroll-bar h-screen w-[40%] overflow-hidden overflow-y-auto">
        {elements?.length &&
          elements.map((element) => {
            const FormComponent = FormElements[element.type].formComponent;
            return (
              <div className="flex justify-between gap-2">
                <FormComponent element={element} />
              </div>
            );
          })}
      </div> */}
      <div
        ref={droppable.setNodeRef}
        className={cn(
          " w-[80%]  rounded-md border-4 border-slate-500 px-5 py-5 pb-20",
          droppable.isOver && "border-white",
        )}
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
          <h2 className="flex h-full w-full items-center justify-center text-xl text-slate-500">
            Let build your own form!
          </h2>
        )}
      </div>
    </div>
  );
};

export default Frame;
