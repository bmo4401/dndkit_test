import { getForm } from "@/actions/form";
import PublishedForm from "@/components/PublishedForm";
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
const PublishedPage: React.FC<BuilderPageProps> = async ({
  params: { formId },
}) => {
  const form = await getForm({ id: +formId, isView: true });

  return <PublishedForm form={form} />;
};
export default PublishedPage;
