import { Cards } from "@/components/Cards";
import { SummaryCards } from "@/components/SummaryCards";
import CreateFormModal from "@/components/modals/CreateFormModal";

export default async function HomePage() {
  return (
    <main className="flex h-full w-full justify-around  p-5">
      <SummaryCards />
      <Cards />
      <CreateFormModal />
    </main>
  );
}
