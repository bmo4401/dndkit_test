"use client";
import { DndElementType } from "@/types/element";
import { SeparatorHorizontal } from "lucide-react";
import { useState } from "react";

const Design = () => {
  const [mode, setMode] = useState(false);
  const [spacer, setSpacer] = useState(5);
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
              value={spacer ?? ""}
              onChange={(e) => setSpacer(+e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && setMode((prev) => !prev);
              }}
              className="hidden-control  bg-transparent outline-none"
              placeholder={Spacer.type}
              style={{ width: (spacer + "").length * 10 }}
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
            <span className="text-slate-200">{spacer} px</span>
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

const Form = () => {
  return (
    <div className="flex h-24 w-full flex-col items-start justify-center gap-3 rounded-md border border-slate-500 px-6 py-3">
      <h2>{Spacer.type}</h2>

      <div className="flex h-10 w-full items-center rounded-md border border-slate-500" />
    </div>
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
  designComponent: Design,
  designOverlay: DesignOverlay,
  formComponent: Form,
  propertyComponent: Property,
};

export default Spacer;
