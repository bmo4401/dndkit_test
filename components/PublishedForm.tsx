"use client";
import { submitForm } from "@/actions/form";
import { FormElements } from "@/components/frame/right/Sidebar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/libs/utils";
import { AttributeType, ElementType } from "@/types/element";
import { Form, Submission } from "@prisma/client";
import { Check, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
const validInput: Partial<ElementType>[] = [
  "Text",
  "TextArea",
  "Checkbox",
  "Select",
];
const PublishedForm = ({
  form,
  isSubmitted = false,
}: {
  form: Form | (Submission & { name: string; description: string });
  isSubmitted?: boolean;
}) => {
  const [check, setCheck] = useState(false);
  const [elements, setElements] = useState<(AttributeType & { id: string })[]>(
    [],
  );
  const router = useRouter();
  useEffect(() => {
    if (form.content) {
      setElements(JSON.parse(form.content));
    }
  }, [form.id]);

  const handleSubmit = async (formData: FormData) => {
    let ids = [],
      data: (AttributeType & { id: string })[] = [];
    for (let i = 0; i < elements.length; i++) {
      if (validInput.includes(elements[i].type)) {
        ids.push(elements[i]);
      }
    }
    for (let i = 0; i < ids.length; i++) {
      let input =
        formData.get(ids[i].id) === "true"
          ? "✓"
          : formData.get(ids[i].id) === ""
            ? "(empty)"
            : formData.get(ids[i].id);
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
      setCheck(true);
      setTimeout(() => {
        router.push(`/published/${form.id}/view`);
      }, 1000);
    }
  };

  return (
    <div
      className={cn(
        "flex h-screen w-screen items-start justify-center overflow-hidden transition-all duration-300 ease-in-out",
      )}
    >
      <div className="scroll-bar relative z-20 flex max-h-[90%] w-[50%] flex-col  gap-5 overflow-hidden overflow-y-auto rounded-lg border border-slate-500 bg-black py-24">
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
            <SubmitForm isSubmitted={isSubmitted} check={check} />
          </form>
        </>
      </div>
    </div>
  );
};

const SubmitForm = ({
  isSubmitted,
  check,
}: {
  isSubmitted: boolean;
  check: boolean;
}) => {
  const formStatus = useFormStatus();

  return (
    <div className="w-full px-5">
      <Button
        disabled={isSubmitted ?? formStatus.pending}
        type="submit"
        className="gradient-button w-full   rounded-full border-none  text-lg font-semibold text-white outline-none duration-200 hover:scale-105 hover:cursor-pointer"
      >
        {!formStatus.pending ? (
          "Save"
        ) : check ? (
          <Check />
        ) : (
          <RotateCw className="animate-spin opacity-80 duration-500" />
        )}
      </Button>
    </div>
  );
};
export default PublishedForm;
