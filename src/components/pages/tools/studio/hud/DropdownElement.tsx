import { useDropdown } from "@/components/pages/tools/studio/hud/DropdownContext.tsx";
import type React from "react";

interface DropdownElementProps extends React.PropsWithChildren<React.HTMLProps<HTMLDivElement>> {
    icons?: string;
    dropdownId?: string;
}

export default function DropdownElement({ icons, dropdownId, ...props }: DropdownElementProps) {
    const { toggleDropdown, closeDropdown } = useDropdown();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (dropdownId) {
            toggleDropdown(dropdownId);
        } else {
            closeDropdown("main");
        }

        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <div
            {...props}
            onClick={handleClick}
            className="px-4 py-2 flex items-center gap-2 cursor-pointer rounded-xl font-semibold text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition duration-200"
        >
            {icons && <img src={icons} alt="icon" className="invert size-4" />}
            <span className="flex-1">{props.children}</span>
            {dropdownId && <img src="/icons/chevron-right.svg" alt="expand" className="invert size-4 ml-4" />}
        </div>
    );
}
