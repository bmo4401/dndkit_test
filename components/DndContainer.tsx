import DndElements from '@/components/DndElements';
import Frame from '@/components/Frame';
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
