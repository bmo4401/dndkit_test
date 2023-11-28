'use client';
import { DndElementType } from '@/types/element';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

type DesignerContextType = {
  selectedElement: string;
  setSelectedElement: Dispatch<SetStateAction<string>>;
  elements: DndElementType[] | null;
  addElement: (value: DndElementType) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedElement, setSelectedElement] = useState('');
  const [elements, setElements] = useState<DndElementType[] | null>(null);
  const addElement = (element: DndElementType) => {
    console.log('❄️ ~ file: ContextProvider.tsx:17 ~ element:', element);
    setElements((prev) => {
      if (!prev) return [element];
      return [...prev, element];
    });
  };
  return (
    <DesignerContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
        elements,
        addElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
};
export default ContextProvider;
