import { DndElementType } from "@/types/element";
import { create } from "zustand";
interface State {
  show: boolean;
  showPreviewModal: boolean;
  setShow: (value: boolean) => void;
  setShowPreviewModal: (value: boolean) => void;
}

const useModal = create<State>((set, get) => ({
  show: false,
  showPreviewModal: false,
  setShow: (value: boolean) => set({ show: value }),
  setShowPreviewModal: (value: boolean) => set({ showPreviewModal: value }),
}));

export default useModal;
