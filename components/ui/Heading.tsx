"use client";
import { Button } from "@/components/ui/Button";
import useModal from "@/hooks/useModal";
import { cn } from "@/libs/utils";
import { usePathname } from "next/navigation";

const Heading = ({
  text,
  className,
  children,
}: {
  children?: React.ReactNode;
  text: string;
  className?: string;
}) => {
  const { show, setShow } = useModal();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <div
      className={cn(
        "h-full w-full border border-l-0 border-r-0 border-slate-500 px-5 py-5 text-3xl",
        className,
      )}
    >
      <div className="flex h-full w-full items-center justify-between">
        {text}
        {children}
        {isHomePage && (
          <Button
            onClick={() => setShow(!show)}
            className="bg-gradient text-lg font-semibold"
          >
            Create New
          </Button>
        )}
      </div>
    </div>
  );
};
export default Heading;
