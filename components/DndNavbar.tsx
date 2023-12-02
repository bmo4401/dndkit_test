"use client";
import { publishForm, saveForm } from "@/actions/form";
import { Button } from "@/components/ui/Button";
import useForms from "@/hooks/useForms";
import useModal from "@/hooks/useModal";
import { useRouter } from "next/navigation";

const DndNavbar = ({ id }: { id: number }) => {
  const { setShowPreviewModal } = useModal();
  const router = useRouter();
  const { elements, clearElement } = useForms();
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
      <Button
        className="bg-gradient border-none"
        onClick={async () => {
          const res = await publishForm({
            id,
            content: JSON.stringify(elements),
          });
          router.push(`/published/${res.id}`);
        }}
      >
        Publish
      </Button>
    </nav>
  );
};
export default DndNavbar;
