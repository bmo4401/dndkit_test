"use client";
import { submitForm } from "@/actions/form";
import { Button } from "@/components/ui/Button";
import { AttributeType, ElementType } from "@/types/element";
import { Form, Submission } from "@prisma/client";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
const PublishedForm = ({
  children,
  form,
  isSubmitted = false,
}: {
  isSubmitted: boolean;
  children: React.ReactNode;
  form: Form | (Submission & { name: string; description: string });
}) => {
  const formStatus = useFormStatus();

  const [elements, setElements] = useState<(AttributeType & { id: string })[]>(
    [],
  );
  const router = useRouter();
  useEffect(() => {
    if (form.content) {
      setElements(JSON.parse(form.content));
    }
  }, [form.id]);
  const validInput: Partial<ElementType>[] = ["Text", "TextArea", "Checkbox"];

  const handleSubmit = async (formData: FormData) => {
    let ids = [],
      data: (AttributeType & { id: string })[] = [];
    for (let i = 0; i < elements.length; i++) {
      if (validInput.includes(elements[i].type)) {
        ids.push(elements[i]);
      }
    }
    for (let i = 0; i < ids.length; i++) {
      const input = formData.get(ids[i].id);
      data.push({
        id: ids[i].id,
        icon: ids[i].icon,
        type: ids[i].type,
        attribute: { form: { input } },
      });
    }
    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (elements[i].id === data[j].id) {
          elements[i].attribute = {
            ...elements[i].attribute,
            ...data[j].attribute,
          };
        }
      }
    }
    const validData = JSON.stringify(elements);
    const res = await submitForm({ id: form.id, data: validData });
    if (res.id) {
      router.push(`/published/${form.id}/view`);
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-3 px-5">
      {children}
      {!isSubmitted && (
        <div className="w-full px-5">
          <Button
            disabled={formStatus.pending}
            type="submit"
            className="gradient-button w-full   rounded-full border-none  text-lg font-semibold text-white outline-none duration-200 hover:scale-105"
          >
            {!formStatus.pending ? (
              "Save"
            ) : (
              <RotateCw className="animate-spin opacity-80 duration-500" />
            )}
          </Button>
        </div>
      )}
    </form>
  );
};

export default PublishedForm;
