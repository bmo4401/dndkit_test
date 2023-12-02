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
    const res = await prisma.form.create({ data: { name, description } });
    revalidatePath("/");
    return res;
  } catch (error) {
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
    revalidatePath("/");
    return res;
  } catch (error) {
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
    revalidatePath("/");
    return res;
  } catch (error) {
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
    const res = await prisma.submission.create({
      data: { formId: id, content: data },
    });
    revalidatePath("/");
    return res;
  } catch (error) {
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
      include: { Form: { select: { name: true, description: true } } },
    });
    revalidatePath("/");
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
    });
    revalidatePath("/");
    return res;
  } catch (error) {
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
    throw new Error("some thing went wrong");
  }
};
