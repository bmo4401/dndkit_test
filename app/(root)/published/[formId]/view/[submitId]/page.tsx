import { getForm, getSubmission, getSubmissions } from "@/actions/form";
import PublishedForm from "@/components/PublishedForm";
interface SubmittedFormProps {
  params: {
    formId: string;
    submitId: string;
  };
}
const SubmittedForm: React.FC<SubmittedFormProps> = async ({
  params: { formId, submitId },
}) => {
  const form = await getSubmission({ formId: +formId, submitId: +submitId });

  return <PublishedForm form={form} isSubmitted={true} />;
};
export default SubmittedForm;
