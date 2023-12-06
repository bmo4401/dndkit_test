"use client";
import { createForm } from "@/actions/form";
import useModal from "@/hooks/useModal";
import { cn } from "@/libs/utils";
import useForms from "@/hooks/useForms";
import { Form } from "@prisma/client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormElements } from "@/components/frame/right/Sidebar";
const PreviewModal = ({ form }: { form: Form }) => {
  const { setShowPreviewModal, showPreviewModal } = useModal();
  const { elements } = useForms();

  return (
    <div
      className={cn(
        "absolute top-0 flex h-screen items-start justify-center overflow-hidden pt-12 transition-all duration-300 ease-in-out",
        !showPreviewModal ? "w-0" : "w-screen",
      )}
    >
      {/* overlay */}
      <div
        onClick={() => setShowPreviewModal(false)}
        className="absolute inset-0 z-20 h-full w-full bg-black/80 opacity-80"
      />
      <div className="scroll-bar relative z-30 flex max-h-[90%] w-[50%] flex-col gap-5  overflow-hidden overflow-y-auto rounded-md border border-slate-500 bg-black pb-12 pt-24">
        {/* close */}
        <div className="absolute right-3 top-3 z-10">
          <X
            onClick={() => setShowPreviewModal(false)}
            className="cursor-pointer hover:opacity-80"
          />
        </div>
        {/* absolute */}
        <div className="bg-gradient absolute left-0 top-0 flex h-20 w-[calc(100%)] items-center pl-5">
          {/* main line */}
          <h2 className="text-2xl font-bold">Form Builder</h2>
        </div>
        {/* title */}
        <div className="flex w-full justify-center  px-2 text-2xl">
          <h2 className="border-b border-slate-500"> {form.name}</h2>
        </div>
        {/* description */}
        <div className="flex w-full justify-start px-8 text-sm">
          {" "}
          <p className=" text-slate-400">{form.description}</p>
        </div>
        {/* content */}
        <div className="flex flex-col px-5">
          {elements.map((element) => {
            const FormComponent = FormElements[element.type].formComponent;
            return <FormComponent element={element} />;
          })}
        </div>
        {/* Submit Button */}

        <div className="w-full px-10">
          <Button
            type="submit"
            className="gradient-button w-full   rounded-full border-none  text-lg font-semibold text-white outline-none hover:cursor-default"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
