"use server";
import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const getForms = () => {
  try {
    return prisma.form.findMany();
  } catch (error) {
    throw new Error("some thing went wrong");
  }
};

export const createForm = async (input: string) => {
  try {
    const res = await prisma.form.create({ data: { name: input } });
    revalidatePath("/");
    return res;
  } catch (error) {
    throw new Error("some thing went wrong");
  }
};
