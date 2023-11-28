'use client';
import useDesign from '@/hooks/useDesign';
import { cn } from '@/libs/utils';
import { useDndMonitor, useDraggable } from '@dnd-kit/core';
import { LucideIcon } from 'lucide-react';

interface DndElementProps {
  id: string;
  name: string;
  icon: LucideIcon;
}

const DndElement: React.FC<DndElementProps> = ({ id, name, icon: Icon }) => {
  const draggable = useDraggable({
    id: id,
    data: {
      isDndElement: true,
    },
  });
  const { selectedElement, setSelectedElement } = useDesign();

  useDndMonitor({
    onDragStart: ({ active }) => {
      setSelectedElement(active.id + '');
    },
    onDragEnd: ({ active, over }) => {
      setSelectedElement('');
    },
  });
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(
        ' p-4 rounded-md border border-slate-500 flex items-center justify-center gap-1 flex-col',
        selectedElement === id ? 'opacity-60' : 'opacity-100',
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Icon />
      <span>{name}</span>
    </div>
  );
};
export default DndElement;
