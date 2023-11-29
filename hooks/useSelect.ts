import { DndElementType, ElementType } from "@/types/element";
import { create } from "zustand";

type selectedElementType = {
  isDndElement?: boolean;
  isHandler?: boolean;
  type: ElementType;
};

interface State {
  selectedElement: selectedElementType | null;

  setSelectedElement: (element: selectedElementType | null) => void;
}

const useDesigner = create<State>((set, get) => ({
  selectedElement: null,

  setSelectedElement: (element: selectedElementType | null) => {
    return set((state) => ({
      selectedElement: element,
    }));
  },
}));

export default useDesigner;
