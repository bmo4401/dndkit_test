import { cn } from '@/libs/utils';
import { DndElementType, PropertyProps } from '@/types/element';
import { Heading } from 'lucide-react';
import { SetStateAction } from 'react';

const Design = () => {
  return (
    <div className="w-full h-24 border border-slate-500 rounded-md flex flex-col justify-center px-6 py-3 gap-3 items-start">
      <h2>{Title.type}</h2>

      <div className="rounded-md w-full h-10 justify-center flex items-center">
        {Title.type} will display here.
      </div>
    </div>
  );
};
const Form = () => {
  return (
    <div className="w-full h-24 border border-slate-500 rounded-md flex flex-col justify-center px-6 py-3 gap-3 items-start">
      <h2>{Title.type}</h2>

      <div className="border border-slate-500 rounded-md w-full h-10 justify-center flex items-center" />
    </div>
  );
};

const Property = () => {
  return <div>Property</div>;
};

const Title: DndElementType = {
  type: 'Title',
  icon: Heading,
  designComponent: Design,
  formComponent: Form,
  propertyComponent: Property,
};

export default Title;
