import { getForm, getSubmissions, getSummarySubmissions } from "@/actions/form";
import View from "@/components/View";
import Heading from "@/components/ui/Heading";
import { Metadata } from "next";

interface ViewPageProps {
  params: {
    formId: string;
  };
}
export const metadata: Metadata = {
  title: "Form Builder",
  description: "Web tool for easily and quickly building your own form",
};
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
