import type React from "react";
import { createContext, useContext, useState } from "react";

export interface DropdownContextType {
    openDropdowns: Set<string>;
    toggleDropdown: (id: string) => void;
    closeDropdown: (id: string) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export function DropdownProvider({ children }: { children: React.ReactNode }) {
    const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

    const closeDropdown = (id: string) => {
        setOpenDropdowns((prev) => {
            const newSet = new Set(prev);
            for (const dropdownId of newSet) {
                if (dropdownId === id || dropdownId.startsWith(`${id}.`)) {
                    newSet.delete(dropdownId);
                }
            }
            return newSet;
        });
    };

    const toggleDropdown = (id: string) => {
        setOpenDropdowns((prev) => {
            const newSet = new Set(prev);

            // Si le dropdown est déjà ouvert, on le ferme simplement
            if (newSet.has(id)) {
                closeDropdown(id);
                return newSet;
            }

            // On récupère le parent du dropdown actuel (tout ce qui est avant le dernier point)
            const parentId = id.split(".").slice(0, -1).join(".");

            // Si on a un parent, on ferme tous les autres sous-menus de ce parent
            if (parentId) {
                for (const dropdownId of newSet) {
                    if (dropdownId.startsWith(`${parentId}.`) && dropdownId !== id) {
                        newSet.delete(dropdownId);
                    }
                }
            }

            newSet.add(id);
            return newSet;
        });
    };

    return <DropdownContext.Provider value={{ openDropdowns, toggleDropdown, closeDropdown }}>{children}</DropdownContext.Provider>;
}

export function useDropdown() {
    const context = useContext(DropdownContext);
    if (context === undefined) {
        throw new Error("useDropdown doit être utilisé à l'intérieur d'un DropdownProvider");
    }
    return context;
}
