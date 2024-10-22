import type React from "react";

interface DropdownProps {
    id: string;
    children: React.ReactNode;
}

export default function Dropdown({ id, children }: DropdownProps) {
    return <div data-dropdown-id={id}>{children}</div>;
}
