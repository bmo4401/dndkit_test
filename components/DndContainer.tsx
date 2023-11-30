import DndElements from '@/components/frame/left/Sidebar';
import Frame from '@/components/frame/right/Frame';
import DndProvider from '@/providers/DndProvider';

const DndContainer = () => {
  return (
    <DndProvider>
      {' '}
      <div className="w-full h-full flex justify-between">
        <Frame />
        <DndElements />
      </div>
    </DndProvider>
  );
};
export default DndContainer;
