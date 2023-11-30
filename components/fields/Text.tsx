"use client";
import { DndElementType } from "@/types/element";
import { Heading, Pencil, Type, X } from "lucide-react";
import { useState } from "react";

const Design = () => {
  return (
    <div className="flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <h2>{Text.type}</h2>

      <div className="flex h-10 w-full select-none items-center justify-center rounded-md text-slate-500">
        {Text.type} will display here
      </div>
    </div>
  );
};
const Form = () => {
  return (
    <div className="mx-3 flex h-10 w-full items-center rounded-md border border-slate-500 p-3" />
  );
};

const Property = () => {
  return (
    <div className="flex w-24 flex-col items-center justify-center gap-1 rounded-md border border-slate-500 p-4">
      {Text.type}
      <Text.icon />
    </div>
  );
};

const Text: DndElementType = {
  type: "Text",
  icon: Type,
  designComponent: Design,
  formComponent: Form,
  propertyComponent: Property,
};

export default Text;
