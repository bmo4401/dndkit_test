'use client';
import DndElementOverlay from '@/components/overlay/DndElementOverlay';
import { DndContext, DragOverlay } from '@dnd-kit/core';

const DndProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DndContext>
      {children}
      <DragOverlay>
        <DndElementOverlay />
      </DragOverlay>
    </DndContext>
  );
};
export default DndProvider;
