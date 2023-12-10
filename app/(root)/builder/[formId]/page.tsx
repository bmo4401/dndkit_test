import { getForm } from "@/actions/form";
import DndContainer from "@/components/DndContainer";
import { Metadata } from "next";
interface BuilderPageProps {
  params: {
    formId: string;
  };
}
export const metadata: Metadata = {
  title: "Form Builder",
  description: "Web tool for easily and quickly building your own form",
};
const BuilderPage: React.FC<BuilderPageProps> = async ({
  params: { formId },
}) => {
  const form = await getForm({ id: +formId });
  return <DndContainer form={form} />;
};
export default BuilderPage;
