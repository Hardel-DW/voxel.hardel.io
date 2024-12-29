import { create } from "zustand";

interface DatapackState {
    indexedFiles: Record<string, unknown>;
    setIndexedFiles: (files: Record<string, unknown>) => void;
    clearIndex: () => void;
}

export const useDatapackStore = create<DatapackState>((set) => ({
    indexedFiles: {},
    setIndexedFiles: (files: Record<string, unknown>) => set({ indexedFiles: files }),
    clearIndex: () => set({ indexedFiles: {} })
}));
