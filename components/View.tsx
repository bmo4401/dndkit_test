"use client";
import { CSVLink } from "react-csv";
import FormTable from "@/components/FormTable";
import PublishedSummary from "@/components/PublishedSummary";
import Heading from "@/components/ui/Heading";
import { Form } from "@prisma/client";
import { AttributeType } from "@/types/element";
import useCSV from "@/hooks/useCSV";
import { Button } from "@/components/ui/Button";

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
  const { data, headers } = useCSV();

  return (
    <main className=" flex h-fit w-full flex-col justify-around  gap-5 px-5 pb-10">
      <Heading text={"Submitted Forms"}>
        <Button className="bg-gradient border-none text-base font-medium ">
          <CSVLink data={data} headers={headers} filename={form.name}>
            Export to CSV
          </CSVLink>
        </Button>
      </Heading>
      <div className=" flex  justify-center gap-16 px-5">
        {" "}
        <FormTable submittedForms={submittedForms} />
        <PublishedSummary form={form} summarySubmissions={summarySubmissions} />
      </div>
    </main>
  );
};
export default View;
