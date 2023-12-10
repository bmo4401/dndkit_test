"use client";
import { Button } from "@/components/ui/Button";
import useForms, { SelectedElementType } from "@/hooks/useForms";
import { DndElementType } from "@/types/element";
import { Baseline, PencilIcon } from "lucide-react";
import { useState } from "react";

function Design({ element }: { element: SelectedElementType }) {
  const { updateElement } = useForms();
  const [mode, setMode] = useState(false);
  const [input, setInput] = useState(
    element.attribute?.design.input || TextArea.type,
  );
  const [isRequired, setIsRequired] = useState(
    element.attribute?.design.isRequired,
  );
  const update = () => {
    updateElement({
      element: { ...element, attribute: { design: { input, isRequired } } },
    });
    setMode(!mode);
  };
  return (
    <div className="group relative  flex min-h-[6rem] w-full flex-col items-start justify-between gap-2  rounded-md border border-slate-500 px-6 py-3">
      {mode ? (
        <div className="flex  w-full flex-col items-start gap-2 ">
          <input
            value={input ?? TextArea.type}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && update();
            }}
            placeholder="Give a name"
            className=" h-10 w-full rounded-md border border-slate-500 bg-transparent px-3 text-sm"
          />
          {/* Description */}
          <p className="text-xs text-slate-500">
            <span className="text-rose-500">*</span> Please enter a name for
            this field to collect data in the table.
          </p>
          {/* isRequired */}
          <div className="flex items-center gap-2">
            <input
              id={element.id}
              type="checkbox"
              className="aspect-square h-4"
              onChange={(e) => {
                setIsRequired(e.target.checked);
              }}
              checked={isRequired}
            />
            <label htmlFor={element.id} className="text-sm">
              isRequired
            </label>
          </div>
          <Button
            onClick={update}
            className="absolute bottom-3 right-3 h-fit border-none bg-subPrimary  px-3 py-2 text-sm"
          >
            Save
          </Button>
        </div>
      ) : (
        <>
          <span
            className="flex w-full items-center gap-2 hover:cursor-pointer hover:opacity-80"
            onDoubleClick={() => setMode(!mode)}
          >
            <span> {input.length !== 0 ? input : TextArea.type}</span>
            {isRequired && <span className="text-rose-500">*</span>}
            <PencilIcon
              className="cursor-pointer  text-slate-500 hover:opacity-80"
              onClick={() => setMode(!mode)}
              size={18}
            />
          </span>
          <div
            onClick={() => {
              if (mode) {
                update();
                setMode(!mode);
              }
            }}
            className="flex max-h-[2.5rem] w-full select-none items-center rounded-md text-sm text-slate-500"
          >
            <textarea
              disabled={true}
              className=" w-full resize rounded-md border border-slate-500 bg-transparent px-3  text-sm outline-[1px] outline-white "
            />
          </div>
        </>
      )}
    </div>
  );
}
function DesignOverlay() {
  return (
    <div className="group relative  flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <span className="flex w-full items-center gap-2 hover:cursor-pointer hover:opacity-80">
        {TextArea.type}
        <PencilIcon
          className="cursor-pointer  text-slate-500 hover:opacity-80"
          size={18}
        />
      </span>

      <div className="flex max-h-[2.5rem] w-full select-none items-center rounded-md text-sm text-slate-500">
        <textarea className=" w-full resize rounded-md border border-slate-500 bg-transparent px-3  text-sm outline-[1px] outline-white " />
      </div>
    </div>
  );
}
interface FormProps {
  element: SelectedElementType;
  isSubmitted?: boolean;
}
const Form: React.FC<FormProps> = ({ element, isSubmitted = false }) => {
  const [input, setInput] = useState(element.attribute?.form?.input);
  const [isRequired] = useState(element.attribute?.design.isRequired);

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
        required={isRequired}
        disabled={isSubmitted}
        name={element.id}
        value={input}
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
    design: {
      input: "",
      isRequired: false,
    },
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
  designOverlay: DesignOverlay,
  formComponent: Form,
  propertyComponent: Property,
};

export default TextArea;
