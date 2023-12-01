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
        "aspect-square w-full rounded-md border border-slate-500 p-5",
        className,
      )}
    >
      <div className="flex h-full justify-between px-3">
        {" "}
        <div className="flex h-full flex-col justify-between gap-10">
          {" "}
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <h2 className="text-4xl font-semibold">{value}</h2>
          </div>
          <p className="text-slate-600">{helperText}</p>
        </div>
        {Icon}
      </div>
    </div>
  );
};
export default SummaryCard;
