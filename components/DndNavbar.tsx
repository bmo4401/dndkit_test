"use client";
import { saveForm } from "@/actions/form";
import { Button } from "@/components/ui/Button";
import useForms from "@/hooks/useForms";
import useModal from "@/hooks/useModal";

const DndNavbar = ({ id }: { id: number }) => {
  const { showPreviewModal, setShowPreviewModal } = useModal();

  const { elements, clearElement } = useForms();
  console.log("❄️ ~ file: DndNavbar.tsx:11 ~ elements:", elements);
  return (
    <nav className="flex items-center gap-3 px-3 text-base">
      <Button onClick={() => clearElement()}>Clear</Button>
      <Button
        onClick={async () =>
          await saveForm({ id, content: JSON.stringify(elements) })
        }
      >
        Save
      </Button>
      <Button className="" onClick={() => setShowPreviewModal(true)}>
        Preview
      </Button>
      <Button className="border-none bg-gradient-to-br from-green-800 to-emerald-300">
        Publish
      </Button>
    </nav>
  );
};
export default DndNavbar;
