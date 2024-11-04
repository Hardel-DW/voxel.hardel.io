import type React from "react";
import { useDropdown } from "./DropdownContext";

interface DropdownTriggerProps {
    dropdownId: string;
    children: React.ReactNode;
}

export default function DropdownTrigger({ dropdownId, children }: DropdownTriggerProps) {
    const { toggleDropdown } = useDropdown();

    return (
        <div onClick={() => toggleDropdown(dropdownId)} onKeyDown={() => toggleDropdown(dropdownId)}>
            {children}
        </div>
    );
}
