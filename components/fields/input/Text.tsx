"use client";
import useForms, { SelectedElementType } from "@/hooks/useForms";
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
interface FormProps {
  element: SelectedElementType;
}
const Form: React.FC<FormProps> = ({ element }) => {
  const [input, setInput] = useState(element.attribute.input ?? "");
  const { updateElement } = useForms();
  const update = () => {
    updateElement({
      element: { ...element, attribute: { input } },
    });
  };
  return (
    <div className="flex  w-full items-center  p-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && update();
        }}
        onBlur={() => update()}
        className="mx-3  h-10 w-full rounded-md border border-slate-500 bg-transparent px-3"
      />
    </div>
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
  attribute: {
    input: "",
  },
  designComponent: Design,
  formComponent: Form,
  propertyComponent: Property,
};

export default Text;
