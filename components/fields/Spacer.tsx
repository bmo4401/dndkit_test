'use client';
import { DndElementType } from '@/types/element';
import { SeparatorHorizontal } from 'lucide-react';
import { useState } from 'react';

const Design = () => {
  const [mode, setMode] = useState(false);
  const [spacer, setSpacer] = useState(5);
  return (
    <div className="w-full h-24 border border-slate-500 rounded-md flex justify-center px-6 py-3 gap-3 items-center">
      <div>
        {' '}
        <h2 className="w-10">{Spacer.type}</h2>
      </div>

      <div className="justify-center rounded-md w-full flex items-center select-none Spacer-slate-500 gap-1 flex-col">
        <Spacer.icon size={40} />
        {mode ? (
          <div className="w-fit overflow-hidden">
            <input
              value={spacer ?? ''}
              onChange={(e) => setSpacer(+e.target.value)}
              onKeyDown={(e) => {
                e.key === 'Enter' && setMode((prev) => !prev);
              }}
              className="hidden-control  bg-transparent outline-none"
              placeholder={Spacer.type}
              style={{ width: (spacer + '').length * 10 }}
              autoComplete="off"
              type="number"
              autoFocus
            />
            <span className="text-slate-200"> px</span>
          </div>
        ) : (
          <span
            className="w-fit flex gap-2 items-center hover:cursor-pointer hover:opacity-80"
            onDoubleClick={() => setMode((prev) => !prev)}
          >
            <span className="text-slate-200">{spacer} px</span>
          </span>
        )}
      </div>
    </div>
  );
};
const Form = () => {
  return (
    <div className="w-full h-24 border border-slate-500 rounded-md flex flex-col justify-center px-6 py-3 gap-3 items-start">
      <h2>{Spacer.type}</h2>

      <div className="border border-slate-500 rounded-md w-full h-10 flex items-center" />
    </div>
  );
};

const Property = () => {
  return (
    <div className="w-24 p-4 rounded-md border border-slate-500 flex items-center justify-center gap-1 flex-col">
      {Spacer.type}
      <Spacer.icon />
    </div>
  );
};

const Spacer: DndElementType = {
  type: 'Spacer',
  icon: SeparatorHorizontal,
  designComponent: Design,
  formComponent: Form,
  propertyComponent: Property,
};

export default Spacer;
