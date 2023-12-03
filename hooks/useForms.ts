import { getForm } from "@/actions/form";
import { AttributeType, DndElementType } from "@/types/element";
import { Form } from "@prisma/client";
import { create } from "zustand";
export type SelectedElementType = AttributeType & { id: string };
interface State {
  form: Form | null;
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

const useForms = create<State>((set, get) => ({
  form: null,
  elements: [],
  selectedElement: null,
  setElements: (elements: SelectedElementType[]) => {
    set((state) => ({
      elements,
    }));
  },

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

export default useForms;
