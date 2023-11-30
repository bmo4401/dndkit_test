import { getSummaryForms } from "@/actions/form";
import SummaryCard from "@/components/SummaryCard";
import { ArrowUpRight, CheckSquare, Eye, MousePointer2 } from "lucide-react";

export async function SummaryCards() {
  const summaryFormData = await getSummaryForms();
  console.log(
    "❄️ ~ file: SummaryCards.tsx:8 ~ summaryFormData:",
    summaryFormData,
  );
  return (
    <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total visits"
        icon={<Eye className="text-blue-600" />}
        helperText="All time for visits"
        value={summaryFormData?.views?.toLocaleString() ?? ""}
        className="shadow-md shadow-blue-600"
      />
      <SummaryCard
        title="Total submissions"
        icon={
          <CheckSquare className="aspect-square w-[1.15rem] text-yellow-600" />
        }
        helperText="All time for submissions"
        value={summaryFormData?.totalSubmit.toLocaleString() ?? ""}
        className="shadow-md shadow-yellow-600"
      />
      <SummaryCard
        title="Submission rate"
        icon={<MousePointer2 className="text-green-600" />}
        helperText="All time for submissions"
        value={summaryFormData?.rateSubmit.toLocaleString() + "%" ?? ""}
        className="shadow-md shadow-green-600"
      />

      <SummaryCard
        title="Bounce rate"
        icon={<ArrowUpRight className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        value={summaryFormData?.totalForm.toLocaleString() + "%" ?? ""}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}
