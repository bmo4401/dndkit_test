"use client";
import useForms, { SelectedElementType } from "@/hooks/useForms";
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

interface FormProps {
  element: SelectedElementType;
  isSubmitted?: boolean;
}
const Form: React.FC<FormProps> = ({ element, isSubmitted = false }) => {
  const [input, setInput] = useState(element.attribute?.form.input ?? "");
  const { updateElement } = useForms();
  const update = () => {
    updateElement({
      element: {
        ...element,
        attribute: {
          form: {
            input,
          },
        },
      },
    });
  };
  return (
    <div className="mx-3 flex w-full py-2">
      <textarea
        disabled={isSubmitted}
        name={element.id}
        value={input ?? ""}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && update();
        }}
        onBlur={() => update()}
        rows={4}
        cols={30}
        className="resize rounded-md border border-slate-500 bg-transparent px-3 py-2 text-sm outline-[1px] outline-white "
        placeholder="Type here"
      />
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
  attribute: {
    form: {
      input: "",
    },
  },
  getAttribute: () => ({
    icon: TextArea.icon,
    type: TextArea.type,
    attribute: TextArea.attribute,
  }),
  designComponent: Design,
  formComponent: Form,
  propertyComponent: Property,
};

export default TextArea;
