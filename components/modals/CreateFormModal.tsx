"use client";
import React, { useState, useTransition } from "react";
import { Button as ButtonCustom } from "@/components/ui/Button";
import { createForm } from "@/actions/form";
import { useFormStatus } from "react-dom";
import useModal from "@/hooks/useModal";
import { cn } from "@/libs/utils";
const CreateFormModal = () => {
  const { show, setShow } = useModal();
  const { pending } = useFormStatus();

  const handleForm = async (formData: FormData) => {
    const input = formData.get("name") as string;
    await createForm(input);
    setShow(false);
  };

  return (
    <div
      className={cn(
        "absolute top-0 flex h-screen items-start justify-center overflow-hidden pt-32 transition-all duration-300 ease-in-out",
        !show ? "w-0" : "w-screen",
      )}
    >
      {/* overlay */}
      <div
        onClick={() => setShow(false)}
        className="absolute inset-0 h-full w-full bg-black/80 opacity-80"
      />
      <form
        action={handleForm}
        className="z-10 flex w-[30%] flex-col justify-center gap-5 rounded-md border border-white bg-black px-5 py-5"
      >
        <h2 className="text-linear m-auto text-2xl font-bold">
          Create New Form
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
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

        <ButtonCustom
          disabled={pending}
          type="submit"
          className="gradient-button w-full  border-none text-white  outline-none"
        >
          Save
        </ButtonCustom>
      </form>
    </div>
  );
};

export default CreateFormModal;
