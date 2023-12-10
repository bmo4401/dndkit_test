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
  const [input, setInput] = useState(
    element.attribute?.design.input || Select.type,
  );
  const { updateElement } = useForms();
  const [mode, setMode] = useState(false);

  const [options, setOptions] = useState<string[]>(
    element.attribute?.design?.options,
  );
  const [isRequired] = useState(element.attribute?.design.isRequired);
  const [selected, setSelected] = useState(
    element.attribute?.design?.options[0],
  );

  /*   useEffect(() => {
    setSelected(element.attribute?.design?.options[0]);
  }, [element.attribute?.design?.options]); */
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
            input,
            options,
          },
        },
      },
    });
    setMode(!mode);
  };
  return (
    <div className="relative flex  min-h-[6rem]  w-full flex-col items-start justify-between  rounded-md border border-slate-500 px-6 py-3">
      {mode ? (
        <div className="flex h-fit w-full flex-col gap-2 ">
          <div className="flex  w-full flex-col items-start gap-1">
            <input
              value={input ?? Select.type}
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
          </div>
          {options.map((option, index) => (
            <div className="flex items-center gap-2">
              <input
                /* bug: using an option as a key will un-focus the input field with each type because React will rerender components with a new key */
                key={index}
                value={option}
                onChange={(e) => {
                  updateOptions({
                    index,
                    value: e.target.value,
                  });
                }}
                onKeyDown={(e) => {
                  e.key === "Enter" && update();
                }}
                className="w-1/2 rounded-md border border-slate-500 bg-transparent px-3 py-1 text-white outline-none"
                spellCheck={false}
              />
              <Plus
                onClick={() => addOption({ index: index + 1 })}
                size={20}
                className="text-subPrimary"
              />
              <Minus
                onClick={() => removeOption({ index: index })}
                size={20}
                className="text-rose-500"
              />
            </div>
          ))}
          <Button
            onClick={update}
            className="absolute bottom-3 right-3 h-fit border-none bg-subPrimary  px-3 py-2 text-sm"
          >
            Save
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <span className="border-r border-slate-500 pr-2">
              {" "}
              {input.length !== 0 ? input : Select.type}
            </span>
            <span> {options.length} options</span>
            <span
              className="hover:cursor-pointer hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                setMode(!mode);
              }}
            >
              <PencilIcon
                className="cursor-pointer  text-slate-500 hover:opacity-80"
                size={18}
              />
            </span>
          </div>
          <Listbox disabled value={selected} onChange={setSelected}>
            <div className="w-1/2 rounded-md border border-slate-500 bg-transparent">
              <Listbox.Button
                aria-disabled={true}
                className="relative w-full rounded-md bg-transparent py-2 pl-3 pr-8 text-start text-white"
              >
                <span className="">{selected}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                  <ChevronsUpDownIcon
                    className="h-5 w-5 text-white"
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
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-transparent shadow-lg ring-1 ring-black/5 focus:outline-none">
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
        </>
      )}
    </div>
  );
}
function DesignOverlay() {
  return (
    <div className="group relative  flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <div className="flex items-center gap-2">
        <span className="border-r border-slate-500 pr-2"> {Select.type}</span>
        <span> {Select.attribute?.design?.options.length} options</span>

        <span className="hover:cursor-pointer hover:opacity-80">
          <PencilIcon
            className="cursor-pointer  text-slate-500 hover:opacity-80"
            size={18}
          />
        </span>
      </div>
      <div className="w-1/2 rounded-md border border-slate-500 bg-transparent">
        <div className="relative w-full rounded-md bg-transparent py-2 pl-3 pr-8 text-start text-white">
          <span className="">{Select.attribute?.design.options[0]}</span>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
            <ChevronsUpDownIcon
              className="h-5 w-5 text-white"
              aria-hidden="true"
            />
          </span>
        </div>
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

  useEffect(() => {
    setOptions(element.attribute?.design?.options);
  }, [element.attribute?.design?.input.length]);
  const [selected, setSelected] = useState(
    element.attribute?.design?.options[0],
  );

  return (
    <div className=" mx-3  flex w-full  items-center gap-2  py-2">
      <input name={element.id} value={selected} className="hidden" />
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-1/2 rounded-md border border-slate-500">
          <Listbox.Button
            aria-disabled={isSubmitted}
            className="relative w-full rounded-md  bg-transparent py-2 pl-3 pr-8 text-start text-white"
          >
            <span className="">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDownIcon
                className="h-5 w-5 text-white"
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
      isRequired: false,

      input: "",
      options: ["Option 1", "Option 2", "Option 3"],
    },
  },
  getAttribute: () => ({
    icon: Select.icon,
    type: Select.type,
    attribute: Select.attribute,
  }),
  designComponent: Design,
  designOverlay: DesignOverlay,
  formComponent: Form,
  propertyComponent: Property,
};

export default Select;
