import { DndElementType } from "@/types/element";
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
  updateElement: ({ element }: { element: SelectedElementType }) => void;
  clearElement: () => void;
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
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),
    }));
  },
  updateElement: ({ element }: { element: SelectedElementType }) => {
    const newElements = [...get().elements];
    const index = newElements.findIndex((el) => el.id === element.id);
    newElements[index] = element;
    console.log(element);
    set((state) => ({
      elements: newElements,
    }));
  },
  clearElement: () => {
    set((state) => ({
      elements: [],
    }));
  },
}));

export default useDesigner;
