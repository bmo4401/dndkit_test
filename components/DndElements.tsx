'use client';

import DndElement from '@/components/DndElement';
import UseDesign from '@/hooks/UseDesign';
import { useDndMonitor, useDraggable } from '@dnd-kit/core';

const DndElements = () => {
  useDndMonitor({
    onDragStart: ({ active }) => {
      console.log('❄️ ~ file: DndElements.tsx:19 ~ active:', active);
    },
  });
  const list1 = [
    {
      id: 1,
      name: 'Item',
    },
    {
      id: 2,
      name: 'Item',
    },
    {
      id: 3,
      name: 'Item',
    },
    {
      id: 4,
      name: 'Item',
    },
    {
      id: 5,
      name: 'Item',
    },
    {
      id: 6,
      name: 'Item',
    },
    {
      id: 7,
      name: 'Item',
    },
  ];

  const list2 = [
    {
      id: 1,
      name: 'Item',
    },
    {
      id: 2,
      name: 'Item',
    },
    {
      id: 3,
      name: 'Item',
    },
    {
      id: 4,
      name: 'Item',
    },
    {
      id: 5,
      name: 'Item',
    },
    {
      id: 6,
      name: 'Item',
    },
    {
      id: 7,
      name: 'Item',
    },
  ];

  return (
    <div className="w-1/3 flex flex-col">
      <div className=" flex-wrap flex  border border-rose-500 rounded-md">
        {list1.map((item) => (
          <DndElement
            key={`${item.id}-list1`}
            id={`${item.id}-list1`}
            name={item.name}
          />
        ))}
      </div>
      <div className=" flex-wrap border flex border-rose-500 rounded-md">
        {list2.map((item) => (
          <DndElement
            key={`${item.id}-list2`}
            id={`${item.id}-list2`}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};
export default DndElements;
