import type React from "react";
import { useState } from "react";
import { DropdownContext } from "./useDropdown";

export interface DropdownContextType {
    openDropdowns: Set<string>;
    toggleDropdown: (id: string) => void;
    closeDropdown: (id: string) => void;
    isOpen: (id: string) => boolean;
}

export function DropdownProvider({ children }: { children: React.ReactNode }) {
    const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

    const isOpen = (id: string) => openDropdowns.has(id);

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

            if (newSet.has(id)) {
                closeDropdown(id);
                return newSet;
            }

            const parentId = id.split(".").slice(0, -1).join(".");

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

    return <DropdownContext.Provider value={{ openDropdowns, toggleDropdown, closeDropdown, isOpen }}>{children}</DropdownContext.Provider>;
}
