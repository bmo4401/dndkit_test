"use client";

import { FormElementsList } from "@/components/data";
import DndElement from "@/components/frame/left/DndElement";

const DndElements = () => {
  return (
    <div className="flex w-1/3 flex-col">
      <div className=" flex flex-wrap  rounded-md border border-rose-500">
        {FormElementsList.map((item) => (
          <DndElement
            key={item.type}
            id={item.type}
            property={item.propertyComponent}
          />
        ))}
      </div>
      <div className=" flex flex-wrap rounded-md border border-rose-500">
        {/*    {list2.map((item) => (
          <DndElement
            key={`${item.id}-list2`}
            id={`${item.id}-list2`}
            name={item.name}
          />
        ))} */}
      </div>
    </div>
  );
};
export default DndElements;
