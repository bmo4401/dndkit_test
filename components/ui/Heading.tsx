import { cn } from "@/libs/utils";

const Heading = ({
  text,
  className,
  children,
}: {
  children?: React.ReactNode;
  text: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-full w-full border border-l-0 border-r-0 border-slate-500 px-5 py-6 text-3xl",
        className,
      )}
    >
      <div className="flex h-full w-full items-center justify-between">
        {text}
        {children}
      </div>
    </div>
  );
};
export default Heading;
