"use client";
import React, { useState, useTransition } from "react";
import { Button, Modal } from "antd";
import { Button as ButtonCustom } from "@/components/ui/Button";
import { createForm } from "@/actions/form";
import { useFormStatus } from "react-dom";
const CreateFormModal = () => {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleForm = async (formData: FormData) => {
    const input = formData.get("name") as string;
    await createForm(input);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="flex w-full justify-center"
      >
        Create New
      </Button>
      <Modal
        title="Create Form"
        open={open}
        confirmLoading={pending}
        onCancel={handleCancel}
        footer={null} //hidden button
      >
        <form action={handleForm} className=" flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type={"text"}
              name="name"
              className="focus:outline-primary h-8 rounded-md border border-slate-500"
            />
          </div>

          <ButtonCustom
            disabled={pending}
            type="submit"
            className="gradient-button w-fit self-end border-none text-white outline-none"
          >
            Save
          </ButtonCustom>
        </form>
      </Modal>
    </>
  );
};

export default CreateFormModal;
