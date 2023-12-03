import { getForm, getSubmissions, getSummarySubmissions } from "@/actions/form";
import View from "@/components/View";
import Heading from "@/components/ui/Heading";

interface ViewPageProps {
  params: {
    formId: string;
  };
}
const ViewPage: React.FC<ViewPageProps> = async ({ params: { formId } }) => {
  const form = await getForm({ id: +formId });
  const submittedForms = await getSubmissions({ id: +formId });
  const summarySubmissions = await getSummarySubmissions({ id: +formId });
  return (
    <View
      form={form}
      submittedForms={submittedForms}
      summarySubmissions={summarySubmissions}
    />
  );
};

export default ViewPage;
