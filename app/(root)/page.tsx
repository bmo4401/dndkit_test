import { getForms } from "@/actions/form";
import CreateFormModal from "@/components/modals/CreateFormModal";

export default async function Home() {
  const forms = await getForms();
  return (
    <main className="flex h-screen w-screen justify-around bg-black text-white">
      <div className="px-5 py-3">
        {forms.map((form) => {
          return <div>{form.name}</div>;
        })}
      </div>
      <CreateFormModal />
    </main>
  );
}
