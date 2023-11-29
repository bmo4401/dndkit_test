"use client";
import { DndElementType } from "@/types/element";
import { Baseline, Heading, Pencil, X } from "lucide-react";
import { useState } from "react";

const Design = () => {
  return (
    <div className="flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <h2>{TextArea.type}</h2>

      <div className="flex h-10 w-full select-none items-center justify-center rounded-md text-slate-500">
        {TextArea.type} will display here
      </div>
    </div>
  );
};
const Form = () => {
  return (
    <div className="flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <h2>{TextArea.type}</h2>

      <div className="flex h-10 w-full items-center rounded-md border border-slate-500" />
    </div>
  );
};

const Property = () => {
  return (
    <div className="flex w-24 flex-col items-center justify-center gap-1 rounded-md border border-slate-500 p-4">
      {TextArea.type}
      <TextArea.icon />
    </div>
  );
};

const TextArea: DndElementType = {
  type: "TextArea",
  icon: Baseline,
  designComponent: Design,
  formComponent: Form,
  propertyComponent: Property,
};

export default TextArea;
