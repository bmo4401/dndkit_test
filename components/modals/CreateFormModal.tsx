"use client";
import { createForm } from "@/actions/form";
import { Button as ButtonCustom } from "@/components/ui/Button";
import useModal from "@/hooks/useModal";
import { cn } from "@/libs/utils";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const CreateFormModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { show, setShow } = useModal();

  const router = useRouter();
  const handleForm = async (formData: FormData) => {
    setIsLoading(true);
    const name = formData.get("name") as string;
    if (!name) {
      setIsValid(false);
      setTimeout(() => {
        setIsValid(true);
        setIsLoading(false);
      }, 1000);
      return;
    }

    const description = formData.get("description") as string;

    const res = await createForm({ name, description });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    if (res.id) {
      setShow(false);
      router.push(`/builder/${res.id}`);
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
        <ButtonCustom
          type="submit"
          className={cn(
            "my-3  w-full cursor-pointer  border-none text-lg font-semibold text-white outline-none hover:opacity-80",
            !isValid ? "bg-rose-500" : "gradient-button",
          )}
        >
          {isLoading === false ? (
            isValid ? (
              "Save"
            ) : (
              "Please give a name to the form"
            )
          ) : (
            <RotateCw className="animate-spin opacity-80 duration-500" />
          )}
        </ButtonCustom>
      </form>
    </div>
  );
};

export default CreateFormModal;
