import { FormElements } from '@/components/DndElements';
import useDesign from '@/hooks/useDesign';

const DndElementOverlay = () => {
  const { selectedElement } = useDesign();

  if (!selectedElement) return;
  const OverLay = FormElements[selectedElement].designComponent;
  return (
    <div className="opacity-60 w-96">
      <OverLay />
    </div>
  );
};
export default DndElementOverlay;
