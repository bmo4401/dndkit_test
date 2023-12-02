"use client";
import { submitForm } from "@/actions/form";
import { FormElements } from "@/components/data";
import { Button } from "@/components/ui/Button";
import { cn } from "@/libs/utils";
import { AttributeType } from "@/types/element";
import { Form, Submission } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const PublishedForm = ({
  form,
  isSubmitted = false,
}: {
  form: Form | (Submission & { name: string; description: string });
  isSubmitted?: boolean;
}) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [elements, setElements] = useState<(AttributeType & { id: string })[]>(
    [],
  );
  const router = useRouter();
  useEffect(() => {
    if (form.content) {
      setElements(JSON.parse(form.content));
    }
  }, [form.id]);
  const validInput = ["Text", "TextArea"];

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
    await submitForm({ id: form.id, data: validData });
    router.push("/");
  };
  if (!isMounted) return null;

  return (
    <div
      className={cn(
        "top-0 flex h-screen w-screen items-start justify-center overflow-hidden transition-all duration-300 ease-in-out",
      )}
    >
      <div className="scroll-bar relative z-20 mt-12 flex h-[80%] w-[50%] flex-col  gap-5 overflow-hidden overflow-y-auto rounded-lg border border-slate-500 bg-black pt-24">
        {/* absolute */}
        <div className="bg-gradient absolute left-0 top-0 flex h-20 w-[calc(100%)] items-center pl-5">
          {/* main line */}
          <h2 className="text-2xl font-bold">Form Builder</h2>
        </div>
        <>
          <div className="flex w-full justify-center  px-2 text-2xl">
            <h2 className="border-b border-slate-500"> {form.name}</h2>
          </div>
          {/*    description  */}
          <div className="flex w-full justify-start px-8 text-sm">
            {" "}
            <p className=" text-slate-400">{form.description}</p>
          </div>
          {/*    content */}
          <form action={handleSubmit} className="flex flex-col gap-3 px-5">
            <div className="flex flex-col">
              {elements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent;
                return (
                  <FormComponent element={element} isSubmitted={isSubmitted} />
                );
              })}
            </div>
            {!isSubmitted && (
              <div className="w-full px-5">
                <Button
                  type="submit"
                  className="gradient-button w-full   rounded-full border-none  text-lg font-semibold text-white outline-none duration-200 hover:scale-105"
                >
                  Submit
                </Button>
              </div>
            )}
          </form>
        </>
      </div>
    </div>
  );
};

export default PublishedForm;
