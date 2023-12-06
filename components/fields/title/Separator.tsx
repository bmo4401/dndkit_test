"use client";
import { DndElementType } from "@/types/element";
import { Minus, SeparatorHorizontal } from "lucide-react";
import { useState } from "react";

const Design = () => {
  return (
    <div className="flex h-24 w-full items-center justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <h2 className="w-10">{Separator.type}</h2>

      <div className="flex w-full select-none  justify-center rounded-md">
        <Separator.icon size={40} />
      </div>
    </div>
  );
};
const Form = () => {
  return <div className="my-3 h-[1px] w-full bg-slate-500" />;
};

const Property = () => {
  return (
    <div className="flex w-24 flex-col items-center justify-center gap-1 rounded-md border border-slate-500 p-4">
      {Separator.type}
      <Separator.icon />
    </div>
  );
};

const Separator: DndElementType = {
  type: "Separator",
  icon: Minus,
  getAttribute: () => ({
    icon: Separator.icon,
    type: Separator.type,
  }),
  designComponent: Design,
  formComponent: Form,
  propertyComponent: Property,
};

export default Separator;
