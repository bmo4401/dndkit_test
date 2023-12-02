import { getForm } from "@/actions/form";
import PublishedForm from "@/components/PublishedForm";
interface BuilderPageProps {
  params: {
    formId: string;
  };
}
const PublishedPage: React.FC<BuilderPageProps> = async ({
  params: { formId },
}) => {
  const form = await getForm({ id: +formId });

  return <PublishedForm form={form} />;
};
export default PublishedPage;
