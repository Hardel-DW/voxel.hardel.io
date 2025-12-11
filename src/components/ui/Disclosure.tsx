import { type HTMLAttributes, type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

const variants = {
    heading: {
        default: "text-zinc-200 text-base",
        large: "text-zinc-200 text-lg font-semibold",
        primary: "text-pink-500 text-base font-medium",
        accent: "text-zinc-100 text-base font-medium border-l-2 border-pink-500 pl-2",
        minimal: "text-zinc-400 text-sm"
    }
} as const;

interface DisclosureProps extends Omit<HTMLAttributes<HTMLDetailsElement>, "children"> {
    heading: string;
    variant?: keyof typeof variants.heading;
    children: ReactNode;
}

export default function Disclosure({ heading, variant = "default", children, className, ...rest }: DisclosureProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="py-5">
            <details className={cn("group relative", className)} {...rest} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
                <summary className="flex justify-between items-center gap-x-10 font-medium cursor-pointer list-none group-open:before:absolute group-open:before:inset-0 group-open:before:cursor-pointer">
                    <span className={cn("select-none", variants.heading[variant])}>{heading}</span>
                    <span className={cn("transition shrink-0", isOpen && "rotate-180")}>
                        <img loading="eager" src="/icons/chevron-down.svg" alt="arrow" className="size-6 invert select-none" />
                    </span>
                </summary>
                {children}
            </details>
        </div>
    );
}
