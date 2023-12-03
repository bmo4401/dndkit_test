"use server";
import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const getForms = () => {
  try {
    return prisma.form.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    throw new Error("some thing went wrong");
  }
};

export const getForm = async ({ id }: { id: number }) => {
  try {
    const res = await prisma.form.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    if (!res) throw new Error("some thing went wrong");
    return res;
  } catch (error) {
    console.log("❄️ ~ file: form.ts:26 ~ error:", error);
    throw new Error("some thing went wrong");
  }
};

export const createForm = async ({
  name,
  description,
}: {
  name: string;
  description?: string;
}) => {
  try {
    const res = await prisma.form.create({
      data: { name, description, content: "" },
    });
    revalidatePath("/");
    return res;
  } catch (error) {
    console.log("❄️ ~ file: form.ts:42 ~ error:", error);
    throw new Error("some thing went wrong");
  }
};

export const saveForm = async ({
  id,
  content,
}: {
  id: number;
  content: string;
}) => {
  try {
    const res = await prisma.form.update({ data: { content }, where: { id } });
    return res;
  } catch (error) {
    console.log("❄️ ~ file: form.ts:57 ~ error:", error);
    throw new Error("some thing went wrong");
  }
};

export const publishForm = async ({
  id,
  content,
}: {
  id: number;
  content: string;
}) => {
  try {
    const res = await prisma.form.update({
      data: { content, published: true },
      where: { id },
    });
    return res;
  } catch (error) {
    console.log("❄️ ~ file: form.ts:75 ~ error:", error);
    throw new Error("some thing went wrong");
  }
};

export const submitForm = async ({
  id,
  data,
}: {
  id: number;
  data: string;
}) => {
  try {
    await prisma.form.update({
      where: {
        id,
      },
      data: {
        submissions: {
          increment: 1,
        },
      },
    });
    revalidatePath(`/published/${id}/view`);
    const res = await prisma.submission.create({
      data: { formId: id, content: data },
    });
    return res;
  } catch (error) {
    console.log("❄️ ~ file: form.ts:107 ~ error:", error);
    throw new Error("some thing went wrong");
  }
};

export const getSummaryForms = async () => {
  try {
    const res = await prisma.form.aggregate({
      _sum: {
        views: true,
        submissions: true,
      },
      _count: {
        id: true,
      },
    });
    const views = res._sum.views;
    const totalSubmit = res._sum.submissions ?? 0;
    const rateSubmit = ((views ? totalSubmit / views : 0) * 100).toFixed(2);
    const totalForm = res._count.id;
    return {
      views,
      totalForm,
      rateSubmit,
      totalSubmit,
    };
  } catch (error) {
    console.log("❄️ ~ file: form.ts:134 ~ error:", error);
    throw new Error("some thing went wrong");
  }
};

export const getSubmission = async ({
  formId: relativeFormId,
  submitId,
}: {
  formId: number;
  submitId: number;
}) => {
  try {
    const res = await prisma.submission.findUnique({
      where: { formId: relativeFormId, id: submitId },
      include: {
        Form: { select: { name: true, description: true } },
      },
    });
    if (!res) {
      throw new Error("some thing went wrong");
    }
    const {
      id,
      Form: { name, description },
      content,
      createdAt,
      formId,
    } = res;

    return { id, content, createdAt, formId, name, description };
  } catch (error) {
    console.log("❄️ ~ file: form.ts:166 ~ error:", error);
    throw new Error("some thing went wrong");
  }
};

export const getSubmissions = async ({ id }: { id: number }) => {
  try {
    const res = await prisma.submission.findMany({
      where: { formId: id },
      include: {
        Form: {
          select: {
            content: true,
            name: true,
            description: true,
            url: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res;
  } catch (error) {
    console.log("❄️ ~ file: form.ts:192 ~ error:", error);
    throw new Error("some thing went wrong");
  }
};

export const getSummarySubmissions = async ({ id }: { id: number }) => {
  try {
    const res = await prisma.form.aggregate({
      where: { id },
      _sum: {
        views: true,
        submissions: true,
      },
      _count: {
        id: true,
      },
    });
    const views = res._sum.views ?? 0;
    const totalSubmit = res._sum.submissions ?? 0;
    const rateSubmit = ((views ? totalSubmit / views : 0) * 100).toFixed(2);
    const targetSubmit = totalSubmit / 10;
    return {
      views,
      rateSubmit,
      totalSubmit,
      targetSubmit,
    };
  } catch (error) {
    console.log("❄️ ~ file: form.ts:220 ~ error:", error);
    throw new Error("some thing went wrong");
  }
};
