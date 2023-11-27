'use client';
import { DndContext, DragOverlay } from '@dnd-kit/core';

const DndProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DndContext>
      {children}
      <DragOverlay>
        <div className="border border-rose-500 p-10">Overlay </div>
      </DragOverlay>
    </DndContext>
  );
};
export default DndProvider;
