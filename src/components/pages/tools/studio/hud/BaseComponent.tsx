import { type VariantProps, cva } from "@/lib/cva";
import { cn } from "@/lib/utils";
import type React from "react";

const baseComponentVariants = cva(
    "select-none flex items-center gap-4 relative border-zinc-800 border-t border-b text-sm backdrop-blur-sm bg-header-translucent rounded-2xl",
    {
        variants: {
            variant: {
                default: "px-8",
                dropdown: "p-4 gap-1 grid starting:translate-y-6 starting:opacity-0 translate-y-0 opacity-100 transition duration-500"
            },
            hover: {
                true: "cursor-pointer hover:border-zinc-700 transition"
            }
        },
        defaultVariants: {
            variant: "default",
            hover: false
        }
    }
);

interface BaseComponentProps extends React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>, VariantProps<typeof baseComponentVariants> {
    icons?: string;
}

export default function BaseComponent({ variant, hover, icons, className, ...props }: BaseComponentProps) {
    return (
        <div {...props} className={cn(baseComponentVariants({ variant, hover }), className)}>
            {icons && <img src={icons} alt="icon" className="size-4 invert mx-auto" />}
            {props.children}
        </div>
    );
}
