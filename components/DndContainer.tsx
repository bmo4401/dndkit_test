"use client";
import DndNavbar from "@/components/DndNavbar";
import DndElements from "@/components/frame/right/Sidebar";
import Frame from "@/components/frame/left/Frame";
import PreviewModal from "@/components/modals/PreviewModal";
import Heading from "@/components/ui/Heading";
import useForms from "@/hooks/useForms";
import DndProvider from "@/providers/DndProvider";
import { Form } from "@prisma/client";
import { useEffect } from "react";

const DndContainer = ({ form }: { form: Form }) => {
  const { setElements } = useForms();

  useEffect(() => {
    if (form.content) {
      setElements(JSON.parse(form.content));
    }
  }, [form.id]);
  return (
    <DndProvider>
      <div className="scroll-bar flex w-full flex-col justify-between gap-3 px-5">
        <PreviewModal form={form} />
        <div className="flex items-center justify-between">
          {" "}
          <Heading text={form.name}>
            <DndNavbar id={form.id} />
          </Heading>
        </div>

        <div className="flex h-full w-full justify-between">
          <Frame form={form} />
          <DndElements />
        </div>
      </div>
    </DndProvider>
  );
};
export default DndContainer;
