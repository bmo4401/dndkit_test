import { DndElementType, ElementType } from "@/types/element";
import { create } from "zustand";

interface State {
  mode: boolean;
  input: string;
  isRequired: boolean;
  setMode: (value: boolean) => void;
  setInput: (value: string) => void;
  setIsRequired: (value: boolean) => void;
}

const useTitle = create<State>((set, get) => ({
  input: "",
  mode: false,
  isRequired: false,
  setMode: (value: boolean) => {
    return set((state) => ({
      mode: value,
    }));
  },
  setInput: (value: string) => {
    return set((state) => ({
      input: value,
    }));
  },
  setIsRequired: (value: boolean) => {
    return set((state) => ({ isRequired: value }));
  },
}));

export default useTitle;
