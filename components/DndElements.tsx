'use client';

import DndElement from '@/components/DndElement';
import Separator from '@/components/fields/Separator';
import Spacer from '@/components/fields/Spacer';
import Subtitle from '@/components/fields/Subtitle';
import Text from '@/components/fields/Text';
import TextArea from '@/components/fields/TextArea';
import Title from '@/components/fields/Title';
import { useDndMonitor } from '@dnd-kit/core';

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
    <div className="w-1/3 flex flex-col">
      <div className=" flex-wrap flex  border border-rose-500 rounded-md">
        {FormElementsList.map((item) => (
          <DndElement
            key={item.type}
            id={item.type}
            name={item.type}
            icon={item.icon}
          />
        ))}
      </div>
      <div className=" flex-wrap border flex border-rose-500 rounded-md">
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
