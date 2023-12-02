import { getForms } from "@/actions/form";
import Card from "@/components/Card";

export async function Cards() {
  const forms = await getForms();
  return (
    <div className="flex h-full flex-col gap-5 px-5 pb-40">
      {forms.map((form) => (
        <Card key={form.id} form={form} />
      ))}
    </div>
  );
}
