'use client';
import { FormElements } from '@/components/DndElements';
import useDesign from '@/hooks/useDesign';
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
      const isDndElement = over?.id === 'drop-area';
      const DndElement = FormElements[active.id];
      isDndElement && addElement(DndElement);
    },
  });
  return (
    <div className="flex gap-5 justify-between w-full h-full  rounded-md">
      <div className="w-[40%] h-screen overflow-hidden overflow-y-auto">
        {elements?.length &&
          elements.map(({ formComponent: FormComponent }) => (
            <div className="flex justify-between gap-3">
              <FormComponent />
            </div>
          ))}
      </div>
      <div
        ref={droppable.setNodeRef}
        className="w-[60%] border border-rose-500 h-screen overflow-hidden overflow-y-auto"
      >
        {elements?.length &&
          elements.map(({ type, designComponent: DesignComponent }) => (
            <div className="flex justify-between gap-3">
              <Handler id={type} />
              <DesignComponent />
            </div>
          ))}
      </div>
    </div>
  );
};

const Handler = ({ id }: { id: string }) => {
  const draggable = useDraggable({
    id,
    data: {
      type: 'handler',
    },
  });
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className="h-24 flex items-center justify-center aspect-square rounded-md border border-slate-500"
    >
      {' '}
      <Menu />
    </div>
  );
};
export default Frame;
