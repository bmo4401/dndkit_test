'use client';
import { FormElements } from '@/components/DndElements';
import FrameElement from '@/components/FrameElement';
import useDesign from '@/hooks/useDesign';
import { generateId } from '@/libs/utils';
import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const Frame = () => {
  const { elements, addElement } = useDesign();
  const droppable = useDroppable({
    id: 'drop-area',
  });
  useDndMonitor({
    onDragEnd: ({ active, over }) => {
      const isDropArea = over?.id === 'drop-area';
      const isHandler = active.data.current?.isHandler;
      const isDndElement = active.data.current?.isDndElement;
      const DndElement = FormElements[active.data.current?.type];
      if (isDndElement && isDropArea) {
        addElement({ id: generateId(), element: DndElement });
      }
    },
  });
  return (
    <div className="flex gap-5 justify-between w-full h-full  rounded-md">
      <div className="w-[40%] h-screen overflow-hidden overflow-y-auto">
        {/* Form Preview */}
        {elements?.length &&
          elements.map(({ element: { formComponent: FormComponent } }) => (
            <div className="flex justify-between gap-3">
              <FormComponent />
            </div>
          ))}
      </div>
      <div
        ref={droppable.setNodeRef}
        className="w-[60%] border border-rose-500 h-screen overflow-hidden overflow-y-auto"
      >
        {/* Form Builder */}
        {elements?.length &&
          elements.map(({ element, id }, index) => {
            return (
              <FrameElement
                id={id}
                key={id}
                element={element}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Frame;
