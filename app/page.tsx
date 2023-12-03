import { Cards } from "@/components/Cards";
import { SummaryCards } from "@/components/SummaryCards";
import Heading from "@/components/ui/Heading";

export default function HomePage() {
  return (
    <main className="flex w-full flex-col justify-around gap-10 bg-black p-5  text-white">
      <SummaryCards />
      <Heading text={"Your Forms"} />
      <Cards />
    </main>
  );
}
