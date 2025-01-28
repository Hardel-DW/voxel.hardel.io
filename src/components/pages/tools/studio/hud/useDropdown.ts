import { createContext, useContext } from "react";
import type { DropdownContextType } from "./DropdownContext";

export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export function useDropdown() {
    const context = useContext(DropdownContext);
    if (context === undefined) {
        throw new Error("useDropdown doit être utilisé à l'intérieur d'un DropdownProvider");
    }
    return context;
}
