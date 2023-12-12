"use client";
import { Button } from "@/components/ui/Button";
import useForms, { SelectedElementType } from "@/hooks/useForms";
import { cn } from "@/libs/utils";
import { DndElementType } from "@/types/element";
import { PencilIcon, Type } from "lucide-react";
import { useState } from "react";

function Design({ element }: { element: SelectedElementType }) {
  const { updateElement, setIsValidElement } = useForms();
  const [mode, setMode] = useState(false);
  const [input, setInput] = useState(element.attribute?.design?.input);
  const [isRequired, setIsRequired] = useState(
    element.attribute?.design?.isRequired,
  );
  const update = () => {
    updateElement({
      element: { ...element, attribute: { design: { input, isRequired } } },
    });
    setMode(!mode);
  };
  return (
    <div
      className={cn(
        " flex min-h-[6rem] w-full flex-col items-start justify-between rounded-md border px-6 py-3",
        element.isValid ? " border-slate-500" : " border-rose-500",
      )}
    >
      {mode ? (
        <div className="flex  w-full flex-col items-start gap-2 ">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && update();
            }}
            placeholder="Give a name"
            className=" h-10 w-full rounded-md border border-slate-500 bg-transparent px-3 text-sm"
            autoFocus
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
            <Button
              onClick={update}
              className="absolute bottom-3 right-3 h-fit border-none bg-subPrimary  px-3 py-2 text-sm"
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <span
            onClick={() => {
              setIsValidElement({ id: element.id, value: true });
              setMode(!mode);
            }}
            className="flex w-fit items-center gap-2 hover:cursor-pointer hover:opacity-80"
          >
            <span> {input.length !== 0 ? input : Text.type}</span>
            {isRequired && <span className="text-rose-500">*</span>}
            <PencilIcon
              className="cursor-pointer  text-slate-500 hover:opacity-80"
              size={18}
            />
            {!element.isValid && (
              <p className="text-xs text-rose-500">
                Please enter a name for this field to collect data in the table.
              </p>
            )}
          </span>
          <div
            onClick={() => {
              if (mode) {
                update();
                setMode(!mode);
              }
            }}
            className="flex w-full select-none items-center rounded-md text-sm text-slate-500"
          >
            <input
              disabled={true}
              className=" h-10 w-full rounded-md border border-slate-500 bg-transparent px-3 text-sm"
            />
          </div>
        </>
      )}
    </div>
  );
}

function DesignOverlay() {
  return (
    <div className=" flex min-h-[6rem] w-full flex-col items-start justify-between rounded-md border border-slate-500 px-6 py-3">
      <span className="flex w-full items-center gap-2 hover:cursor-pointer hover:opacity-80">
        <span> {Text.type}</span>
        <PencilIcon
          className="cursor-pointer  text-slate-500 hover:opacity-80"
          size={18}
        />
      </span>
      <div className="flex w-full select-none items-center rounded-md text-sm text-slate-500">
        <input className=" h-10 w-full rounded-md border border-slate-500 bg-transparent px-3 text-sm" />
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
  const [isRequired] = useState(element.attribute?.design?.isRequired);

  const { updateElement } = useForms();
  const update = () => {
    updateElement({
      element: { ...element, attribute: { form: { input } } },
    });
  };
  return (
    <div className="flex  w-full items-center py-2">
      <input
        required={isRequired}
        disabled={isSubmitted}
        name={element.id}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && update();
        }}
        onBlur={() => update()}
        placeholder="Type here"
        className="mx-3  h-10 w-full rounded-md border border-slate-500 bg-transparent px-3 text-sm"
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
    design: {
      input: "",
      isRequired: false,
    },
    form: { input: "" },
  },
  getAttribute: () => ({
    icon: Text.icon,
    type: Text.type,
    attribute: Text.attribute,
  }),
  designComponent: Design,
  designOverlay: DesignOverlay,
  formComponent: Form,
  propertyComponent: Property,
  isValid: true,
  setIsValid: ({ value }: { value: boolean }) => ({
    isValid: value,
  }),
};

export default Text;
