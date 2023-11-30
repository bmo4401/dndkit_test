import { getForms } from "@/actions/form";
import DndContainer from "@/components/DndContainer";
import DndNavbar from "@/components/DndNavbar";
import CreateFormModal from "@/components/modals/CreateFormModal";
import { Button } from "@/components/ui/Button";

export default async function Home() {
  const forms = await getForms();
  const createForm = () => {};
  return (
    <main className="flex h-screen w-screen justify-around bg-black text-white">
      <div>
        {forms.map((form) => {
          return <div>{form.name}</div>;
        })}
      </div>
      <CreateFormModal />
    </main>
  );
}
