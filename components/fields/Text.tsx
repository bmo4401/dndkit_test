'use client';
import { DndElementType } from '@/types/element';
import { Heading, Pencil, Type, X } from 'lucide-react';
import { useState } from 'react';

const Design = () => {
  return (
    <div className="w-full h-24 border border-slate-500 rounded-md flex flex-col justify-center px-6 py-3 gap-3 items-start">
      <h2>{Text.type}</h2>

      <div className="justify-center rounded-md w-full h-10 flex items-center select-none text-slate-500">
        {Text.type} will display here
      </div>
    </div>
  );
};
const Form = () => {
  return (
    <div className="w-full h-24 border border-slate-500 rounded-md flex flex-col justify-center px-6 py-3 gap-3 items-start">
      <h2>{Text.type}</h2>

      <div className="border border-slate-500 rounded-md w-full h-10 flex items-center" />
    </div>
  );
};

const Property = () => {
  return (
    <div className="w-24 p-4 rounded-md border border-slate-500 flex items-center justify-center gap-1 flex-col">
      {Text.type}
      <Text.icon />
    </div>
  );
};

const Text: DndElementType = {
  type: 'Text',
  icon: Type,
  designComponent: Design,
  formComponent: Form,
  propertyComponent: Property,
};

export default Text;
