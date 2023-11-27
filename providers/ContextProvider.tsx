'use client';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

type DesignerContextType = {
  selectedElement: string;
  setSelectedElement: Dispatch<SetStateAction<string>>;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedElement, setSelectedElement] = useState('');
  return (
    <DesignerContext.Provider value={{ selectedElement, setSelectedElement }}>
      {children}
    </DesignerContext.Provider>
  );
};
export default ContextProvider;
