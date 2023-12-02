import { getSummaryForms } from "@/actions/form";
import SummaryCard from "@/components/SummaryCard";
import { ArrowUpRight, CheckSquare, Eye, MousePointer2 } from "lucide-react";

export async function SummaryCards() {
  const summaryFormData = await getSummaryForms();

  return (
    <div className="grid w-full grid-cols-1 gap-14 px-5  md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total visits"
        icon={<Eye size={35} className=" text-blue-600" />}
        helperText="All time for visits"
        value={summaryFormData?.views?.toLocaleString() ?? ""}
        className="shadow-md shadow-blue-600"
      />
      <SummaryCard
        title="Total forms"
        icon={<ArrowUpRight size={38} className=" text-red-600" />}
        value={summaryFormData?.totalForm.toLocaleString() ?? ""}
        helperText="Total created forms"
        className="shadow-md shadow-red-600"
      />
      <SummaryCard
        title="Total submissions"
        icon={<CheckSquare size={30} className=" text-yellow-600" />}
        helperText="All submissions"
        value={summaryFormData?.totalSubmit.toLocaleString()}
        className="shadow-md shadow-yellow-600"
      />
      <SummaryCard
        title="Submission Rate"
        icon={<MousePointer2 size={35} className=" text-green-600" />}
        helperText="Total submissions "
        value={summaryFormData?.rateSubmit.toLocaleString() + "%" ?? ""}
        className="shadow-md shadow-green-600"
      />
    </div>
  );
}
