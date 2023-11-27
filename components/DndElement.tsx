'use client';
import UseDesign from '@/hooks/UseDesign';
import { cn } from '@/libs/utils';
import { useDndMonitor, useDraggable } from '@dnd-kit/core';
import { setEngine } from 'crypto';
import { Dispatch, SetStateAction } from 'react';

interface DndElementProps {
  id: string;
  name: string;
}

const DndElement: React.FC<DndElementProps> = ({ id, name }) => {
  const draggable = useDraggable({ id: id });
  const { selectedElement, setSelectedElement } = UseDesign();

  useDndMonitor({
    onDragStart: ({ active }) => {
      setSelectedElement(active.id + '');
    },
    onDragEnd: ({ active, over }) => {
      console.log('❄️ ~ file: DndElement.tsx:22 ~ activatorEvent:', active);
      console.log('❄️ ~ file: DndElement.tsx:22 ~ over:', over);
      setSelectedElement('');
    },
  });
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(
        'w-fit p-5 rounded-md border border-emerald-500',
        selectedElement === id ? 'opacity-60' : 'opacity-100',
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {name}
    </div>
  );
};
export default DndElement;
