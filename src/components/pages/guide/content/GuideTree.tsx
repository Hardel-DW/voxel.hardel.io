import { cn } from "@/lib/utils";
import React from "react";

interface Props {
    image: {
        src: string;
        alt: string;
    };
    index: number;
    slug: string;
    selected?: boolean;
}

export default function GuideTree(props: Props) {
    return (
        <div
            style={{ animationDuration: `${(props.index + 5) * 50}ms` }}
            className={cn("select-none relative group/card transition-opacity hover:opacity-100 move-left", {
                "opacity-100": props.selected,
                "opacity-50": !props.selected
            })}
        >
            {props.selected && (
                <div className="absolute inset-0 -z-10 hue-rotate-45 brightness-20">
                    <img src="/images/shine.avif" alt="Shine" />
                </div>
            )}

            {/* Card */}
            <a href={props.slug}>
                <div
                    className={cn(
                        "stack rounded-2xl w-full h-36 relative cursor-pointer border border-zinc-700 transition-all group-hover/card:border-zinc-600 bg-content",
                        {
                            "border-zinc-700": props.selected,
                            "border-zinc-800": !props.selected
                        }
                    )}
                >
                    <div
                        className="size-full rounded-2xl relative -z-10 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${props.image.src})` }}
                    />
                </div>
            </a>
        </div>
    );
}
