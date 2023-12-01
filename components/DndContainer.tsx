import DndNavbar from "@/components/DndNavbar";
import DndElements from "@/components/frame/left/Sidebar";
import Frame from "@/components/frame/right/Frame";
import PreviewModal from "@/components/modals/PreviewModal";
import Heading from "@/components/ui/Heading";
import DndProvider from "@/providers/DndProvider";
import { Form } from "@prisma/client";

const DndContainer = ({ form }: { form: Form }) => {
  return (
    <DndProvider>
      <div className="flex h-full w-full flex-col gap-3 p-5">
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
