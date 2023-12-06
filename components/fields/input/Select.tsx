"use client";
import { Button } from "@/components/ui/Button";
import useForms, { SelectedElementType } from "@/hooks/useForms";
import { cn } from "@/libs/utils";
import { DndElementType } from "@/types/element";
import { Listbox, Transition } from "@headlessui/react";
import {
  Check,
  CheckIcon,
  CheckSquare,
  ChevronsUpDownIcon,
  Minus,
  PencilIcon,
  Plus,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";

function Design({ element }: { element: SelectedElementType }) {
  const { updateElement } = useForms();
  const [mode, setMode] = useState(false);
  const [options, setOptions] = useState<string[]>(
    element.attribute?.design.input,
  );
  console.log("❄️ ~ file: Select.tsx:24 ~ options:", options);
  const [isRequired, setIsRequired] = useState(
    element.attribute?.design.isRequired,
  );
  const addOption = ({ index }: { index: number }) => {
    const newOptions = [...options];
    newOptions.splice(index, 0, "");
    setOptions(newOptions);
  };

  const removeOption = ({ index }: { index: number }) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  const updateOptions = ({
    index,
    value,
  }: {
    value: string;
    index: number;
  }) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const update = () => {
    updateElement({
      element: {
        ...element,
        attribute: {
          form: { ...element.attribute?.form },
          design: {
            input: options,
          },
        },
      },
    });
    setMode(!mode);
  };
  return (
    <div className=" relative  flex  w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      {mode ? (
        <div className="flex h-fit w-full flex-col  ">
          {options.map((option, index) => (
            <div className="flex items-center gap-2">
              <input
                key={option}
                value={option}
                onChange={(e) =>
                  updateOptions({
                    index,
                    value: e.target.value,
                  })
                }
                onKeyDown={(e) => {
                  e.key === "Enter" && update();
                }}
                className="w-1/2 border border-slate-500 bg-transparent px-3 py-2 text-white outline-none"
                placeholder={option}
                autoComplete="off"
                autoFocus
                spellCheck={false}
              />
              <Plus
                onClick={() => addOption({ index: index + 1 })}
                className="text-subPrimary"
              />
              <Minus
                onClick={() => removeOption({ index: index })}
                className="text-rose-500"
              />
            </div>
          ))}
          <Button
            onClick={update}
            className="absolute bottom-3 right-3 border-none bg-subPrimary"
          >
            Save
          </Button>
        </div>
      ) : (
        <span
          className="flex w-full items-center gap-2 hover:cursor-pointer hover:opacity-80"
          onDoubleClick={() => setMode(!mode)}
        >
          <span> {options.length} options</span>
          {isRequired && <span className="text-rose-500">*</span>}
          <PencilIcon
            className="cursor-pointer  text-slate-500 hover:opacity-80"
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
        {Select.type} will display here.
      </div>
    </div>
  );
}
interface FormProps {
  element: SelectedElementType;
  isSubmitted?: boolean;
}
const Form: React.FC<FormProps> = ({ element, isSubmitted = false }) => {
  const [options, setOptions] = useState<Array<string>>([]);
  console.log("❄️ ~ file: Select.tsx:140 ~ options:", options);
  useEffect(() => {
    setOptions(element.attribute?.design?.input);
  }, [element.attribute?.design?.input.length]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(element.attribute?.form.input);
  }, [element.attribute?.form.input]);
  const { updateElement } = useForms();
  const update = () => {
    updateElement({
      element: {
        ...element,
        attribute: { form: { selected }, design: element.attribute?.design },
      },
    });
  };
  return (
    <div className=" mx-3  flex w-full  items-center gap-2  py-2">
      <input name={element.id} value={selected} className="hidden" />
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-1/2">
          <Listbox.Button
            aria-disabled={isSubmitted}
            className="relative w-full rounded-md  bg-white py-2 pl-3 pr-8 text-start text-black"
          >
            <span className="">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDownIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative rounded-md   py-2 pl-3 text-base  ${
                      active ? "bg-subPrimary text-white" : "text-black"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span>{option}</span>
                      <Check
                        className={cn(
                          "absolute right-1 top-1/4 hidden",
                          selected && "block ",
                        )}
                        size={20}
                      />
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

const Property = () => {
  return (
    <div className="flex w-24 flex-col items-center justify-center gap-1 rounded-md border border-slate-500 p-4">
      {Select.type}
      <Select.icon />
    </div>
  );
};

const Select: DndElementType = {
  type: "Select",
  icon: CheckSquare,
  attribute: {
    form: { input: "Choose your answer" },
    design: {
      input: ["Option 1", "Option 2", "Option 3"],
    },
  },
  getAttribute: () => ({
    icon: Select.icon,
    type: Select.type,
    attribute: Select.attribute,
  }),
  designComponent: Design,
  formComponent: Form,
  propertyComponent: Property,
};

export default Select;
