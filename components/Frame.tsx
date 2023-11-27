'use client';
import { useDroppable } from '@dnd-kit/core';

const Frame = () => {
  const droppable = useDroppable({
    id: 'drop-area',
  });
  return (
    <div
      ref={droppable.setNodeRef}
      className="w-full h-full border border-rose-500 rounded-md"
    >
      Frame
    </div>
  );
};
export default Frame;
