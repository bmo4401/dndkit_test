import FormTable from "@/components/FormTable";
import PublishedSummary from "@/components/PublishedSummary";
import Heading from "@/components/ui/Heading";
import { Form } from "@prisma/client";

export type SubmissionType = {
  id: number;
  createdAt: Date;
  formId: number;
  content: string;
};
const View = ({
  submittedForms,
  summarySubmissions,
  form,
}: {
  submittedForms: SubmissionType[];
  summarySubmissions: {
    views: number;
    rateSubmit: string;
    totalSubmit: number;
    targetSubmit: number;
  };
  form: Form;
}) => {
  return (
    <main className="flex w-full flex-col justify-around gap-5  px-5 pb-10">
      <Heading text={"Submitted Forms"} />
      <div className="flex  justify-center gap-16 px-5">
        {" "}
        <FormTable submittedForms={submittedForms} />
        <PublishedSummary form={form} summarySubmissions={summarySubmissions} />
      </div>
    </main>
  );
};
export default View;
