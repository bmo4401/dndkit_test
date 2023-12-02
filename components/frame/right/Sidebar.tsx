"use client";

import { InputComponents, TitleComponents } from "@/components/data";
import DndElement from "@/components/frame/right/DndElement";

const DndElements = () => {
  return (
    <div className="flex w-1/3 flex-col gap-2">
      <h2 className="h-fit border-b border-white pb-2 text-slate-400">
        Pick your component
      </h2>
      <div className="flex flex-col gap-2">
        <h2 className="h-fit">Title Components</h2>
        <div className=" flex flex-wrap  gap-2 rounded-md ">
          {TitleComponents.map((item) => (
            <DndElement
              key={item.type}
              id={item.type}
              property={item.propertyComponent}
            />
          ))}
        </div>
      </div>
      <div className="h-px border-b border-white pb-2 text-slate-400" />

      <div className="flex flex-col gap-2">
        <h2 className="h-fit">Input Components</h2>
        <div className=" flex flex-wrap  gap-2 rounded-md ">
          {InputComponents.map((item) => (
            <DndElement
              key={item.type}
              id={item.type}
              property={item.propertyComponent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default DndElements;
