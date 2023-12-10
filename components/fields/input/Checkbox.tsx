"use client";
import { Button } from "@/components/ui/Button";
import useForms, { SelectedElementType } from "@/hooks/useForms";
import { DndElementType } from "@/types/element";
import { CheckSquare, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";

function Design({ element }: { element: SelectedElementType }) {
  const { updateElement } = useForms();
  const [mode, setMode] = useState(false);
  const [input, setInput] = useState(
    element.attribute?.design.input || Checkbox.type,
  );
  const [isRequired, setIsRequired] = useState(
    element.attribute?.design.isRequired,
  );
  const update = () => {
    updateElement({
      element: {
        ...element,
        attribute: {
          form: { ...element.attribute?.form },
          design: { input, isRequired },
        },
      },
    });
    setMode(!mode);
  };
  return (
    <div className="group relative  flex min-h-[6rem] w-full flex-col items-start justify-between  rounded-md border border-slate-500 px-6 py-3">
      {mode ? (
        <div className=" flex w-full  flex-col items-start gap-2 pb-8">
          <input
            value={input ?? Checkbox.type}
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
            <span> {input.length !== 0 ? input : Checkbox.type}</span>
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
            className=" flex h-10 w-full select-none items-center gap-1 rounded-md text-sm text-slate-500"
          >
            <input
              type="checkbox"
              disabled={true}
              checked={true}
              className="aspect-square  h-4 rounded-md border border-slate-500 bg-transparent text-sm disabled:bg-primary  "
            />
            <input
              disabled={true}
              value={input}
              className=" h-10 w-full rounded-md  bg-transparent px-3 text-sm underline  "
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
        <span> {Checkbox.type}</span>
        {Checkbox.attribute?.design.isRequired && (
          <span className="text-rose-500">*</span>
        )}
        <PencilIcon
          className="cursor-pointer  text-slate-500 hover:opacity-80"
          size={18}
        />
      </span>
      <div className=" flex h-10 w-full select-none items-center gap-1 rounded-md text-sm text-slate-500">
        <input
          type="checkbox"
          disabled
          checked={true}
          className="aspect-square  h-4 rounded-md border border-slate-500 bg-transparent text-sm disabled:bg-primary  "
        />
        <input
          value={Checkbox.attribute?.design?.input}
          className=" h-10 w-full rounded-md  bg-transparent px-3 text-sm underline  "
        />
      </div>
    </div>
  );
}
interface FormProps {
  element: SelectedElementType;
  isSubmitted?: boolean;
}
const Form: React.FC<FormProps> = ({ element, isSubmitted = false }) => {
  const [input, setInput] = useState("");
  const [isRequired] = useState(element.attribute?.design.isRequired);
  const [check, setCheck] = useState(
    element.attribute?.form.input === "true" ? "true" : "false",
  );
  useEffect(() => {
    setInput(element.attribute?.design.input);
  }, [element.attribute?.design.input]);
  const { updateElement } = useForms();
  const update = () => {
    updateElement({
      element: {
        ...element,
        attribute: { form: { check }, design: { input } },
      },
    });
  };
  return (
    <div className="mx-3  flex w-full  items-center gap-2 py-2">
      <input
        required={isRequired}
        type="checkbox"
        disabled={isSubmitted}
        name={element.id}
        value={check}
        checked={check === "true" ? true : false}
        onChange={(e) => {
          setCheck(e.target.checked === true ? "true" : "false");
        }}
        onKeyDown={(e) => {
          e.key === "Enter" && update();
        }}
        onBlur={() => update()}
        placeholder="Type here"
        className="aspect-square  h-5 rounded-md border border-slate-500 bg-transparent text-sm disabled:bg-primary"
      />
      <input
        disabled={isSubmitted}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
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
      {Checkbox.type}
      <Checkbox.icon />
    </div>
  );
};

const Checkbox: DndElementType = {
  type: "Checkbox",
  icon: CheckSquare,
  attribute: {
    form: { input: "false" },
    design: { input: "Checkbox", isRequired: false },
  },
  getAttribute: () => ({
    icon: Checkbox.icon,
    type: Checkbox.type,
    attribute: Checkbox.attribute,
  }),
  designComponent: Design,
  designOverlay: DesignOverlay,
  formComponent: Form,
  propertyComponent: Property,
};

export default Checkbox;
