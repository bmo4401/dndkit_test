'use client';

import useDesign from '@/hooks/useDesign';
import { DndElementType } from '@/types/element';
import { useDndMonitor, useDraggable } from '@dnd-kit/core';
import { Menu } from 'lucide-react';

interface FrameElementProps {
  element: DndElementType;
  id: string;
}
const FrameElement: React.FC<FrameElementProps> = ({ element, id }) => {
  const { type, designComponent: DesignComponent } = element;
  const { removeElement } = useDesign();
  const draggable = useDraggable({
    id: id + 'frame-element',
    data: {
      isHandler: true,
      type: type,
      id,
    },
  });
  useDndMonitor({
    onDragStart: ({ active }) => {
      const isHandler = active.data.current?.isHandler;
      const id = active.data.current?.id;
      isHandler && removeElement(id);
    },
  });
  return (
    <div className="flex justify-between gap-3">
      <div
        ref={draggable.setNodeRef}
        {...draggable.attributes}
        {...draggable.listeners}
        className="h-24 flex items-center justify-center aspect-square rounded-md border border-slate-500"
      >
        {' '}
        <Menu />
      </div>
      <DesignComponent />
    </div>
  );
};

export default FrameElement;
