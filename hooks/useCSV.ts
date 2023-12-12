import { create } from "zustand";

interface State {
  data: any[];
  headers: any[];
  setHeader: (data: any[]) => void;

  setCSVData: (data: any[]) => void;
}
const useCSV = create<State>((set, get) => ({
  data: [],
  headers: [],
  setHeader: (item: any) => {
    set(() => ({
      headers: item,
    }));
  },
  setCSVData: (item: any) => {
    set(() => ({
      data: item,
    }));
  },
}));

export default useCSV;
