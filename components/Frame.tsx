'use client';
import { FormElements } from '@/components/DndElements';
import useDesign from '@/hooks/useDesign';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { Menu } from 'lucide-react';

const Frame = () => {
  const { elements, addElement } = useDesign();
  const droppable = useDroppable({
    id: 'drop-area',
  });
  useDndMonitor({
    onDragEnd: ({ active, over }) => {
      const isDndElement = over?.id === 'drop-area';
      console.log('❄️ ~ file: Frame.tsx:16 ~ isDndElement:', isDndElement);
      const DndElement = FormElements[active.id];
      isDndElement && addElement(DndElement);
    },
  });
  return (
    <div
      ref={droppable.setNodeRef}
      className="w-full h-full border border-rose-500 rounded-md"
    >
      {elements?.length &&
        elements.map(({ designComponent: DesignComponent }) => (
          <div className="flex items-center justify-center">
            <Handler />
            <DesignComponent />
          </div>
        ))}
    </div>
  );
};

const Handler = () => {
  return (
    <div className="h-24 flex items-center justify-center aspect-square rounded-md border border-slate-500">
      {' '}
      <Menu />
    </div>
  );
};
export default Frame;
