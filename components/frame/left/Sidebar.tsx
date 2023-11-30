"use client";

<<<<<<< HEAD:components/frame/left/Sidebar.tsx
import DndElement from '@/components/frame/left/DndElement';
import Separator from '@/components/fields/Separator';
import Spacer from '@/components/fields/Spacer';
import Subtitle from '@/components/fields/Subtitle';
import Text from '@/components/fields/Text';
import TextArea from '@/components/fields/TextArea';
import Title from '@/components/fields/Title';
import { useDndMonitor } from '@dnd-kit/core';
=======
import DndElement from "@/components/DndElement";
import Separator from "@/components/fields/Separator";
import Spacer from "@/components/fields/Spacer";
import Subtitle from "@/components/fields/Subtitle";
import Text from "@/components/fields/Text";
import TextArea from "@/components/fields/TextArea";
import Title from "@/components/fields/Title";
>>>>>>> fa69727340bcdf3fc14d5656d98c66e1ed006c25:components/DndElements.tsx

export const FormElements = {
  [Title.type]: Title,
  [Text.type]: Text,
  [TextArea.type]: TextArea,
  [Subtitle.type]: Subtitle,
  [Spacer.type]: Spacer,
  [Separator.type]: Separator,
};
export const FormElementsList = [
  Title,
  Subtitle,
  Text,
  TextArea,
  Spacer,
  Separator,
];
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
