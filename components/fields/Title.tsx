"use client";
import { generateId } from "@/libs/utils";
import { DndElementType } from "@/types/element";
import { Heading1 } from "lucide-react";
import { useState } from "react";

const Design = () => {
  const [mode, setMode] = useState(false);
  const [input, setInput] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  return (
    <div className="group relative  flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      {mode ? (
        <div className="flex gap-5">
          <input
            value={input ?? ""}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && setMode((prev) => !prev);
            }}
            className="w-full bg-transparent text-white outline-none"
            placeholder={Title.type}
            autoComplete="off"
            autoFocus
            spellCheck={false}
          />
          <input
            id="required"
            type="checkbox"
            checked={isRequired}
            onChange={() => setIsRequired((prev) => !prev)}
          />
          <label htmlFor="required">Required</label>
        </div>
      ) : (
        <span
          className="flex w-full items-center gap-2 hover:cursor-pointer hover:opacity-80"
          onDoubleClick={() => setMode((prev) => !prev)}
        >
          <span> {input.length !== 0 ? input : Title.type}</span>
          {isRequired && <span className="text-rose-500">*</span>}
        </span>
      )}

      <div className="flex h-10 w-full select-none items-center rounded-md text-slate-500">
        {Title.type} will display here.
      </div>
    </div>
  );
};
const Form = () => {
  return (
    <div className="flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <h2>{Title.type}</h2>

      <div className="flex h-10 w-full items-center rounded-md border border-slate-500" />
    </div>
  );
};

const DesignOverlay = () => {
  return (
    <div className="group relative  flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <span className="flex w-full items-center gap-2 hover:cursor-pointer hover:opacity-80">
        {Title.type}
      </span>

      <div className="flex h-10 w-full select-none items-center rounded-md text-slate-500">
        {Title.type} will display here.
      </div>
    </div>
  );
};

const Property = () => {
  return (
    <div className="flex w-24 flex-col items-center justify-center gap-1 rounded-md border border-slate-500 p-4">
      {Title.type}
      <Title.icon />
    </div>
  );
};

const Title: DndElementType = {
  type: "Title",
  icon: Heading1,
  designComponent: Design,
  designOverlay: DesignOverlay,
  formComponent: Form,
  propertyComponent: Property,
};

export default Title;
