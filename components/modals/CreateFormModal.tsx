"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";

const CreateFormModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleForm = () => {
    console.log("submit");
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create New
      </Button>
      <Modal
        title="Create Form"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className="bg-transparent"
      >
        <form action={handleForm}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type={"name"}
              className="rounded-md border border-slate-500"
            />
          </div>

          <button type="submit">Save</button>
        </form>
      </Modal>
    </>
  );
};

export default CreateFormModal;
