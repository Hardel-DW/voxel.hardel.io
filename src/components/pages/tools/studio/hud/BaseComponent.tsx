import { cn } from "@/lib/utils";
import type React from "react";

const baseComponentStyles = {
    base: "select-none flex items-center gap-4 relative border-zinc-800 border-t border-b text-sm backdrop-blur-xs bg-header-translucent rounded-2xl",
    variants: {
        variant: {
            default: "px-8",
            dropdown:
                "p-4 gap-1 grid starting:translate-y-6 starting:opacity-0 translate-y-0 opacity-100 transition duration-500 max-h-96 overflow-y-auto"
        },
        hover: {
            true: "cursor-pointer hover:border-zinc-700 transition",
            false: ""
        }
    },
    defaultVariants: {
        variant: "default" as const,
        hover: false as const
    }
} as const;

type VariantProps = {
    variant?: keyof typeof baseComponentStyles.variants.variant;
    hover?: boolean;
};

interface BaseComponentProps extends React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>, VariantProps {
    icons?: string;
}

export default function BaseComponent({ variant, hover, icons, className, ...props }: BaseComponentProps) {
    const variantClasses = variant ?? baseComponentStyles.defaultVariants.variant;
    const hoverClasses = hover ?? baseComponentStyles.defaultVariants.hover;

    return (
        <div
            {...props}
            className={cn(
                baseComponentStyles.base,
                baseComponentStyles.variants.variant[variantClasses],
                baseComponentStyles.variants.hover[hoverClasses ? "true" : "false"],
                className
            )}>
            {icons && <img src={icons} alt="icon" className="size-4 invert mx-auto" />}
            {props.children}
        </div>
    );
}
