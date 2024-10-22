import type React from "react";
import { useDropdown } from "./DropdownContext";

interface DropdownContentProps {
    dropdownId: string;
    children: React.ReactNode;
}

export default function DropdownContent({ dropdownId, children }: DropdownContentProps) {
    const { openDropdowns } = useDropdown();

    if (!openDropdowns.has(dropdownId)) return null;

    return <div>{children}</div>;
}
