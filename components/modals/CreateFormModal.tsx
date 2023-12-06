"use client";
import { createForm } from "@/actions/form";
import { Button as ButtonCustom } from "@/components/ui/Button";
import useModal from "@/hooks/useModal";
import { cn } from "@/libs/utils";
import { Check, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
const CreateFormModal = () => {
  const [check, setCheck] = useState(false);

  const [isValid, setIsValid] = useState(true);
  const { show, setShow } = useModal();
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const handleForm = async (formData: FormData) => {
    const name = formData.get("name") as string;
    if (!name) {
      setIsValid(false);
      setTimeout(() => {
        setIsValid(true);
      }, 1000);
      return;
    }

    const description = formData.get("description") as string;

    const res = await createForm({ name, description });
    if (res.id) {
      setCheck(true);
      setTimeout(() => {
        ref.current?.reset();
        router.push(`/builder/${res.id}`);
        setShow(false);
      }, 500);
    }
  };

  return (
    <div
      className={cn(
        "absolute top-0 z-20 flex h-screen items-start justify-center overflow-y-hidden pt-32 text-white transition-all duration-300 ease-in-out",
        !show ? "w-0" : "w-screen",
      )}
    >
      {/* overlay */}
      <div
        onClick={() => setShow(false)}
        className="absolute inset-0 h-full w-full overflow-hidden bg-black/80 opacity-80"
      />
      <form
        ref={ref}
        action={handleForm}
        className="z-10 flex w-[30%] flex-col justify-center gap-5 rounded-md border border-white bg-black px-5 py-5"
      >
        <h2 className="text-linear m-auto text-2xl font-bold">
          Create New Form
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <label htmlFor="name">Name</label>
            <span className="text-rose-500">*</span>
          </div>
          <input
            id="name"
            type={"text"}
            name="name"
            className="
            h-fit rounded-md
            px-3
            py-2   text-black outline-none focus:outline-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <label htmlFor="description">Description</label>
          </div>
          <input
            id="description"
            type={"text"}
            name="description"
            className="
            h-fit rounded-md
            px-3
            py-2   text-black outline-none focus:outline-primary"
          />
        </div>
        <SubmitForm isValid={isValid} check={check} />
      </form>
    </div>
  );
};

const SubmitForm = ({
  isValid,
  check,
}: {
  isValid: boolean;
  check: boolean;
}) => {
  const { pending } = useFormStatus();
  return (
    <ButtonCustom
      aria-disabled={pending}
      type="submit"
      className={cn(
        "my-3  w-full cursor-pointer  border-none text-lg font-semibold text-white outline-none hover:opacity-80",
        !isValid ? "bg-rose-500" : "gradient-button",
      )}
    >
      {pending === false ? (
        isValid ? (
          "Save"
        ) : (
          "Please give a name to the form"
        )
      ) : check ? (
        <Check />
      ) : (
        <RotateCw className="animate-spin opacity-80 duration-500" />
      )}
    </ButtonCustom>
  );
};
export default CreateFormModal;
