import { SubmissionType } from "@/components/View";
import { Submission } from "@prisma/client";
import {
  ArrowUpRight,
  CheckSquare,
  Eye,
  MousePointer2,
  MousePointerSquare,
} from "lucide-react";
import Link from "next/link";

const PublishedSummary = ({
  form,
  summarySubmissions,
}: {
  form: {
    name: string;
    url: string;
    content: string;
    description: string;
    id: number;
  };
  summarySubmissions: {
    views: number;
    rateSubmit: string;
    totalSubmit: number;
    targetSubmit: number;
  };
}) => {
  return (
    <div className=" flex max-w-[50%] flex-col gap-5 px-5">
      <DetailInfo form={form} />
      {/* Card */}
      <SummaryCards summarySubmissions={summarySubmissions} />
    </div>
  );
};
export default PublishedSummary;

const DetailInfo = ({
  form,
}: {
  form: {
    name: string;
    url: string;
    content: string;
    description: string;
    id: number;
  };
}) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border border-slate-500 px-3 py-2 pl-5">
      <div className="flex w-full justify-between gap-3">
        {" "}
        <h2 className="w-28">Name</h2>
        <div className="flex w-[calc(100%-7rem)] items-start justify-start gap-3 ">
          <span>:</span>
          <p>{form.name}</p>
        </div>
      </div>
      <div className="flex w-full justify-between gap-3">
        <h2 className="w-28">Description</h2>
        <div className="flex w-[calc(100%-7rem)] items-start justify-start gap-3 ">
          <span>:</span>

          <p className=""> {form.description ? form.description : `(Empty)`}</p>
        </div>
      </div>
      <div className="flex w-full justify-between gap-3">
        <h2 className="w-28">Submit at </h2>
        <div className="flex w-[calc(100%-7rem)] items-start justify-start gap-3 ">
          <span>:</span>

          <Link
            href={`/published/${form.id}`}
            className="flex items-center gap-2 opacity-80 hover:opacity-100"
          >
            <MousePointerSquare className="text-subPrimary" size={25} />
            <span className="text-slate-500 underline hover:text-white">{`${process.env.NEXT_PUBLIC_URL}/published/${form.id}`}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export async function SummaryCards({
  summarySubmissions,
}: {
  summarySubmissions: {
    views: number;
    rateSubmit: string;
    totalSubmit: number;
    targetSubmit: number;
  };
}) {
  return (
    <div className="grid grid-cols-2 gap-10">
      <SummaryCard
        title="Total visits"
        icon={<Eye size={28} className=" text-blue-600" />}
        helperText="All time for visits"
        value={summarySubmissions?.views?.toLocaleString() ?? ""}
        className="shadow-md shadow-blue-600"
      />
      <SummaryCard
        title="Submission target"
        icon={<ArrowUpRight size={30} className=" text-red-600" />}
        helperText="Target for submissions"
        value={
          `${summarySubmissions?.totalSubmit.toLocaleString()}/${summarySubmissions?.targetSubmit.toLocaleString()}` ??
          ""
        }
        className="shadow-md shadow-red-600"
      />
      <SummaryCard
        title="Total submissions"
        icon={<CheckSquare size={25} className=" text-yellow-600" />}
        helperText="All submissions"
        value={summarySubmissions?.totalSubmit.toLocaleString() ?? ""}
        className="shadow-md shadow-yellow-600"
      />
      <SummaryCard
        title="Submission rate"
        icon={<MousePointer2 width={30} className=" text-green-600" />}
        helperText="Total number of submissions received"
        value={summarySubmissions?.rateSubmit.toLocaleString() + "%" ?? ""}
        className="shadow-md shadow-green-600"
      />
    </div>
  );
}

import { cn } from "@/libs/utils";
import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  icon: ReactNode;
  helperText: string;
  value: string;
  loading?: boolean;
  className: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  className,
  helperText,
  icon: Icon,
  loading,
  title,
  value,
}) => {
  return (
    <div
      className={cn(
        "h-36 w-full rounded-md border border-slate-500 p-3",
        className,
      )}
    >
      <div className="flex h-full flex-col   justify-between px-3">
        {" "}
        <div className="flex  justify-between">
          {" "}
          <div className="flex flex-col justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-400">{title}</h2>
          </div>
          {Icon}
        </div>
        <h2 className="text-xl font-semibold">{value}</h2>
        <p className="text-sm text-slate-600">{helperText}</p>
      </div>
    </div>
  );
};
