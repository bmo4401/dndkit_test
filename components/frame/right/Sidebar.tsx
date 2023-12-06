"use client";

import DndElement from "@/components/frame/right/DndElement";
import Separator from "@/components/fields/title/Separator";
import Spacer from "@/components/fields/title/Spacer";
import Subtitle from "@/components/fields/title/Subtitle";
import Text from "@/components/fields/input/Text";
import TextArea from "@/components/fields/input/TextArea";
import Checkbox from "@/components/fields/input/Checkbox";
import Title from "@/components/fields/title/Title";
import Select from "@/components/fields/input/Select";
export const FormElements = {
  /* input */
  [Text.type]: Text,
  [TextArea.type]: TextArea,
  [Checkbox.type]: Checkbox,
  [Select.type]: Select,
  /* title */
  [Title.type]: Title,
  [Subtitle.type]: Subtitle,
  [Spacer.type]: Spacer,
  [Separator.type]: Separator,
};
export const TitleComponents = [Title, Subtitle, Spacer, Separator];

export const InputComponents = [Text, TextArea, Checkbox, Select];

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
