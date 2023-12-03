"use client";
import prisma from "@/libs/prisma";

const Demo = () => {
  const handleForm = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    ("use server");
    await prisma.form.create({ data: { name, description } });
  };

  return (
    /* Form */
    <form action={handleForm}>
      {/* Name Field */}
      <div className="flex gap-2">
        <label htmlFor="name">Name</label>
        <input id="name" type={"text"} name="name" />
      </div>
      {/* Description Field */}
      <div className="flex gap-2">
        <label htmlFor="description">Description</label>
        <input id="description" type={"text"} name="description" />
      </div>
      <button type="submit">Submit</button>S
    </form>
  );
};

export default Demo;
