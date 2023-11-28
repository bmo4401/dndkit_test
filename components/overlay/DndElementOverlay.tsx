import { FormElements } from '@/components/DndElements';
import useDesign from '@/hooks/useDesign';

const DndElementOverlay = () => {
  const { selectedElement } = useDesign();
  console.log(
    '❄️ ~ file: DndElementOverlay.tsx:6 ~ selectedElement:',
    selectedElement,
  );

  if (!selectedElement) return;
  const OverLay = FormElements[selectedElement].designComponent;
  return (
    <div className=" w-96">
      <OverLay />
    </div>
  );
};
export default DndElementOverlay;
