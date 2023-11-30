import prisma from "@/libs/prisma";

export const getForms = () => {
  try {
    return prisma.form.findMany();
  } catch (error) {
    console.log("❄️ ~ file: form.ts:5 ~ error:", error);
    throw new Error("some thing went wrong");
  }
};
