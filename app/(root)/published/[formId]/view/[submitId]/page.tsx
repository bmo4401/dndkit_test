import { getForm, getSubmission, getSubmissions } from "@/actions/form";
import PublishedForm from "@/components/PublishedForm";
import { Metadata } from "next";
interface SubmittedFormProps {
  params: {
    formId: string;
    submitId: string;
  };
}
export const metadata: Metadata = {
  title: "Form Builder",
  description: "Web tool for easily and quickly building your own form",
};
const SubmittedForm: React.FC<SubmittedFormProps> = async ({
  params: { formId, submitId },
}) => {
  const form = await getSubmission({ formId: +formId, submitId: +submitId });

  return <PublishedForm form={form} isSubmitted={true} />;
};
export default SubmittedForm;
