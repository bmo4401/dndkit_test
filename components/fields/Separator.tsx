'use client';
import { DndElementType } from '@/types/element';
import { Minus, SeparatorHorizontal } from 'lucide-react';
import { useState } from 'react';

const Design = () => {
  return (
    <div className="w-full h-24 border border-slate-500 rounded-md flex justify-center px-6 py-3 gap-3 items-center">
      <h2 className="w-10">{Separator.type}</h2>

      <div className="flex rounded-md w-full  select-none justify-center">
        <Separator.icon size={40} />
      </div>
    </div>
  );
};
const Form = () => {
  return (
    <div className="w-full h-24 border border-slate-500 rounded-md flex flex-col justify-center px-6 py-3 gap-3 items-start">
      <h2>{Separator.type}</h2>

      <div className="border border-slate-500 rounded-md w-full h-10 flex items-center justify-center" />
    </div>
  );
};

const Modify = () => {
  return <div>Modify</div>;
};

const Separator: DndElementType = {
  type: 'Separator',
  icon: Minus,
  designComponent: Design,
  formComponent: Form,
  modifyComponent: Modify,
};

export default Separator;
