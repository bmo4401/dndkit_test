"use client";
import { createForm } from "@/actions/form";
import useModal from "@/hooks/useModal";
import { cn } from "@/libs/utils";
import useForms from "@/hooks/useForms";
import { Form } from "@prisma/client";
const PreviewModal = ({ form }: { form: Form }) => {
  const { setShowPreviewModal, showPreviewModal } = useModal();
  const { elements } = useForms();

  const content = elements ?? form.content;
  const handleForm = async (formData: FormData) => {
    const input = formData.get("close") as string;
    await createForm(input);
    setShowPreviewModal(false);
  };

  return (
    <div
      className={cn(
        "absolute top-0 flex h-screen items-start justify-center overflow-hidden pt-32 transition-all duration-300 ease-in-out",
        !showPreviewModal ? "w-0" : "w-screen",
      )}
    >
      {/* overlay */}
      <div
        onClick={() => setShowPreviewModal(false)}
        className="absolute inset-0 h-full w-full bg-black/80 opacity-80"
      />
      <div className="relative z-20 flex h-[80%] w-[50%] flex-col items-center gap-5 overflow-hidden overflow-y-auto border border-rose-500 bg-black pt-24">
        {/* absolute */}
        <div className="bg-gradient absolute left-10 top-10 flex h-10 w-[calc(100%-5rem)] items-center pl-5">
          {/* line */}
          <h2 className="text-xl font-semibold">Form Builder</h2>
        </div>
        {/* title */}
        <h2 className="flex w-fit justify-center border-b border-slate-500 px-2 text-2xl">
          {form.name}
        </h2>
      </div>
    </div>
  );
};

export default PreviewModal;
