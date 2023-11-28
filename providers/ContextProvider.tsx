'use client';
import { DndElementType, ElementType } from '@/types/element';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

type DesignerContextType = {
  selectedElement: string;
  setSelectedElement: Dispatch<SetStateAction<string>>;
  elements: { element: DndElementType; id: string }[];
  addElement: ({
    id,
    element,
  }: {
    id: string;
    element: DndElementType;
  }) => void;
  removeElement: (id: string) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedElement, setSelectedElement] = useState('');
  const [elements, setElements] = useState<
    { element: DndElementType; id: string }[]
  >([]);
  /* Add element */
  const addElement = ({
    id,
    element,
  }: {
    id: string;
    element: DndElementType;
  }) => {
    setElements((prev) => {
      if (!prev) return [{ id, element }];
      return [...prev, { id, element }];
    });
  };
  /* Remove element */
  const removeElement = (id: string) => {
    const newElements = elements.filter((element) => element.id !== id);

    setElements((prev) => {
      return newElements;
    });
  };
  return (
    <DesignerContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
        elements,
        addElement,
        removeElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
};
export default ContextProvider;
