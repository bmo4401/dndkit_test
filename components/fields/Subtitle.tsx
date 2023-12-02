"use client";
import useForms, { SelectedElementType } from "@/hooks/useForms";
import { DndElementType } from "@/types/element";
import { Heading2, PencilIcon } from "lucide-react";
import { useState } from "react";
interface DesignProps {
  element: SelectedElementType;
}
const Subtitle: DndElementType = {
  type: "Subtitle",
  icon: Heading2,
  attribute: {
    design: { input: "" },
  },
  getAttribute: () => ({
    icon: Subtitle.icon,
    type: Subtitle.type,
    attribute: Subtitle.attribute,
  }),
  designComponent: Design,
  formComponent: Form,
  designOverlay: DesignOverlay,
  propertyComponent: Property,
};

function Design({ element }: DesignProps) {
  const { updateElement } = useForms();
  const [mode, setMode] = useState(false);
  const [input, setInput] = useState(element.attribute?.design.input);

  const update = () => {
    updateElement({
      element: { ...element, attribute: { design: { input } } },
    });
    setMode(!mode);
  };
  return (
    <div className="group relative  flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      {mode ? (
        <div className="flex gap-5">
          <input
            value={input ?? ""}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && update();
            }}
            className="w-full bg-transparent text-white outline-none"
            placeholder={Subtitle.type}
            autoComplete="off"
            autoFocus
            spellCheck={false}
          />
        </div>
      ) : (
        <span
          className="flex w-full items-center gap-2"
          onDoubleClick={() => {
            setMode(!mode);
          }}
        >
          {input.length !== 0 ? input : Subtitle.type}
          <PencilIcon
            className="cursor-pointer text-slate-500 hover:opacity-80"
            onClick={() => setMode(!mode)}
            size={18}
          />
        </span>
      )}

      <div
        onClick={() => {
          if (mode) {
            update();
            setMode(!mode);
          }
        }}
        className="flex h-10 w-full select-none items-center rounded-md text-slate-500"
      >
        {Subtitle.type} will display here.
      </div>
    </div>
  );
}
interface FormProps {
  element: SelectedElementType;
}
function Form({ element }: FormProps) {
  console.log("❄️ ~ file: Subtitle.tsx:83 ~ element:", element);
  const { input } = element.attribute?.form ?? element.attribute?.design;
  return (
    <div className="flex w-full px-3  pb-2 text-xs text-gray-600">
      <h2>{input.length !== 0 ? input : Subtitle.type}</h2>
    </div>
  );
}

function DesignOverlay() {
  return (
    <div className="group relative  flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <span className="flex w-full items-center gap-2">{Subtitle.type}</span>

      <div className="flex h-10 w-full select-none items-center rounded-md text-slate-500">
        {Subtitle.type} will display here.
      </div>
    </div>
  );
}

function Property() {
  return (
    <div className="flex w-24 flex-col items-center justify-center gap-1 rounded-md border border-slate-500 p-4">
      {Subtitle.type}
      <Subtitle.icon />
    </div>
  );
}

export default Subtitle;
