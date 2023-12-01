import { Cards } from "@/components/Cards";
import { SummaryCards } from "@/components/SummaryCards";
import CreateFormModal from "@/components/modals/CreateFormModal";
import Heading from "@/components/ui/Heading";

export default async function HomePage() {
  return (
    <main className="flex w-full flex-col justify-around gap-10  p-5">
      <SummaryCards />
      <Heading text={"Your Forms"} />
      <Cards />
    </main>
  );
}
