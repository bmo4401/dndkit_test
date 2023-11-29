import { FormElements } from "@/components/DndElements";
import useSelect from "@/hooks/useSelect";

const DndElementOverlay = () => {
  const { selectedElement } = useSelect();

  if (!selectedElement) return;
  const propertyOverlay =
    selectedElement.isDndElement &&
    FormElements[selectedElement.type].propertyComponent;
  const designerOverlay =
    selectedElement.isHandler &&
    FormElements[selectedElement.type].designComponent;
  const Overlay = (designerOverlay ?? propertyOverlay) as React.FC;
  return (
    <div className=" w-96">
      <Overlay />
    </div>
  );
};
export default DndElementOverlay;
