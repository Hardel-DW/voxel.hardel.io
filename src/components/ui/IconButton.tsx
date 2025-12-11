import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends HTMLAttributes<HTMLDivElement> {
    icon: string;
}

export default function IconButton({ icon, className, ...rest }: IconButtonProps) {
    return (
        <div
            className={cn(
                "w-12 h-12 p-2 z-20 relative hover:bg-zinc-800/50 cursor-pointer transition bg-black/10 border border-white/10 rounded-md flex justify-center items-center",
                className
            )}
            {...rest}>
            <img alt="Icon" src={icon} width="24" height="24" className="invert" />
        </div>
    );
}
