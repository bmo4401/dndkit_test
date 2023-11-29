'use client';
import { DndElementType } from '@/types/element';
import { Heading2 } from 'lucide-react';
import { useState } from 'react';

const Design = () => {
  const [mode, setMode] = useState(false);
  const [input, setInput] = useState('');
  return (
    <div className="group relative  w-full h-24 border border-slate-500 rounded-md flex flex-col justify-center px-6 py-3 gap-3 items-start">
      {mode ? (
        <div className="flex gap-5">
          <input
            value={input ?? ''}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              e.key === 'Enter' && setMode((prev) => !prev);
            }}
            className="w-full bg-transparent outline-none text-white"
            placeholder={Subtitle.type}
            autoComplete="off"
            autoFocus
            spellCheck={false}
          />
        </div>
      ) : (
        <span
          className="w-full flex gap-2 items-center"
          onDoubleClick={() => setMode((prev) => !prev)}
        >
          {input.length !== 0 ? input : Subtitle.type}
        </span>
      )}

      <div className="rounded-md w-full h-10 flex items-center text-slate-500 select-none">
        {Subtitle.type} will display here.
      </div>
    </div>
  );
};
const Form = () => {
  return (
    <div className="w-full h-24 border border-slate-500 rounded-md flex flex-col justify-center px-6 py-3 gap-3 items-start">
      <h2>{Subtitle.type}</h2>

      <div className="border border-slate-500 rounded-md w-full h-10 flex items-center" />
    </div>
  );
};

const Property = () => {
  return (
    <div className="w-24 p-4 rounded-md border border-slate-500 flex items-center justify-center gap-1 flex-col">
      {Subtitle.type}
      <Subtitle.icon />
    </div>
  );
};

const Subtitle: DndElementType = {
  type: 'Subtitle',
  icon: Heading2,
  designComponent: Design,
  formComponent: Form,
  propertyComponent: Property,
};

export default Subtitle;
