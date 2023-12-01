"use client";
import useForms, { SelectedElementType } from "@/hooks/useForms";
import { cn } from "@/libs/utils";
import { DndElementType } from "@/types/element";
import { SeparatorHorizontal } from "lucide-react";
import { useState } from "react";
interface DesignProps {
  element: SelectedElementType;
}
const Design: React.FC<DesignProps> = ({ element }) => {
  const { updateElement } = useForms();
  const [mode, setMode] = useState(false);
  const [space, setSpace] = useState(5);
  const update = () => {
    updateElement({
      element: { ...element, attribute: { design: { space } } },
    });
    setMode(!mode);
  };
  return (
    <div className="flex h-24 w-full items-center justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <div>
        {" "}
        <h2 className="w-10">{Spacer.type}</h2>
      </div>

      <div className="Spacer-slate-500 flex w-full select-none flex-col items-center justify-center gap-1 rounded-md">
        <Spacer.icon size={40} />
        {mode ? (
          <div className="w-fit overflow-hidden">
            <input
              value={space ?? ""}
              onChange={(e) => setSpace(+e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && update();
              }}
              onBlur={() => update()}
              className="hidden-control  bg-transparent outline-none"
              placeholder={Spacer.type}
              style={{ width: (space + "").length * 10 }}
              autoComplete="off"
              type="number"
              autoFocus
            />
            <span className="text-slate-200"> px</span>
          </div>
        ) : (
          <span
            className="flex w-fit items-center gap-2  hover:cursor-pointer hover:opacity-80"
            onDoubleClick={() => {
              setMode((prev) => !prev);
            }}
          >
            <span className="text-slate-200">{space} px</span>
          </span>
        )}
      </div>
    </div>
  );
};
const DesignOverlay = () => {
  return (
    <div className="flex h-24 w-full items-center justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <div>
        {" "}
        <h2 className="w-10">{Spacer.type}</h2>
      </div>

      <div className="Spacer-slate-500 flex w-full select-none flex-col items-center justify-center gap-1 rounded-md">
        <Spacer.icon size={40} />

        <span className="flex w-fit items-center gap-2  hover:cursor-pointer hover:opacity-80">
          <span className="text-slate-200">...px</span>
        </span>
      </div>
    </div>
  );
};
interface FormProps {
  element: SelectedElementType;
}
const Form: React.FC<FormProps> = ({ element }) => {
  const { space } = element.attribute?.design;
  return (
    <div
      className={cn("ml-3 h-fit w-full")}
      style={{ paddingTop: space, paddingBottom: space }}
    />
  );
};

const Property = () => {
  return (
    <div className="flex w-24 flex-col items-center justify-center gap-1 rounded-md border border-slate-500 p-4">
      {Spacer.type}
      <Spacer.icon />
    </div>
  );
};

const Spacer: DndElementType = {
  type: "Spacer",
  icon: SeparatorHorizontal,
  attribute: {
    design: { space: 5 },
  },
  designComponent: Design,
  designOverlay: DesignOverlay,
  formComponent: Form,
  propertyComponent: Property,
};

export default Spacer;
