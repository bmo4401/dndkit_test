import { DndElementType } from "@/types/element";
import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";
export type SelectedElementType = DndElementType & { id: string };

interface State {
  elements: SelectedElementType[] | [];

  setElements: (elements: SelectedElementType[]) => void;

  addElement: ({
    index,
    element,
  }: {
    index?: number;
    element: SelectedElementType;
  }) => void;
  removeElement: (id: string) => void;
  updateElement: ({
    element,
    id,
  }: {
    id: string;
    element: SelectedElementType;
  }) => void;
}

const useDesigner = create<State>((set, get) => ({
  elements: [],
  selectedElement: null,
  setElements: (elements: SelectedElementType[]) =>
    set((state) => ({
      elements,
    })),

  addElement: ({
    index = 0,
    element,
  }: {
    index?: number;
    element: SelectedElementType;
  }) => {
    if (index === -1) return;
    const newElements = [...get().elements];
    newElements.splice(index, 0, element);
    set((state) => ({
      elements: newElements,
    }));
  },
  removeElement: (id: string) => {
    console.log("❄️ ~ file: useDesign.ts:51 ~ id:", id);
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),
    }));
  },
  updateElement: ({
    id,
    element,
  }: {
    id: string;
    element: SelectedElementType;
  }) => {
    const newElements = [...get().elements];
    const index = newElements.findIndex((el) => el.id === id);
    newElements[index] = element;
    set((state) => ({
      elements: newElements,
    }));
  },
}));

export default useDesigner;
