import { getForm } from "@/actions/form";
import DndContainer from "@/components/DndContainer";
interface BuilderPageProps {
  params: {
    formId: string;
  };
}
const BuilderPage: React.FC<BuilderPageProps> = async ({
  params: { formId },
}) => {
  const form = await getForm({ id: +formId });
  return <DndContainer form={form} />;
};
export default BuilderPage;
