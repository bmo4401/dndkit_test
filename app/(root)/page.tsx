import { Cards } from "@/components/Cards";
import Loading from "@/components/modals/LoadingModal";
import { SummaryCards } from "@/components/SummaryCards";
import { Button } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import useModal from "@/hooks/useModal";
import { usePathname } from "next/navigation";

export default function HomePage() {
  return (
    <main className="flex w-full flex-col justify-around gap-10 bg-black p-5  text-white">
      <SummaryCards />
      <Heading text={"Your Forms"} />
      <Cards />
    </main>
  );
}
