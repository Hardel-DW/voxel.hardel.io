import { create } from "zustand";

export interface SidebarState {
    selectedConcept: string | null;
    setSelectedConcept: (concept: string | null) => void;
}

const createSidebarStore = () =>
    create<SidebarState>((set) => ({
        selectedConcept: "loot_table",
        setSelectedConcept: (concept) => set({ selectedConcept: concept })
    }));

export const useSidebarStore = createSidebarStore();
