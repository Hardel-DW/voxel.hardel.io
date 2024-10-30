import type { FormComponent } from "@/lib/minecraft/core/engine";
import { cn } from "@/lib/utils.ts";
import type React from "react";

export type ToolScrollableType = {
    type: "Scrollable";
    height?: number;
    children: FormComponent[];
};

export default function ToolScrollable(props: {
    children?: React.ReactNode;
    height?: number;
    className?: string;
}) {
    return (
        <div
            className={cn("overflow-y-auto ring-0 ring-zinc-700 transition-all hover:ring-1 rounded-xl", props.className)}
            style={{
                height: props.height ? `${props.height}px` : "300px"
            }}
        >
            <div className="p-4">{props.children}</div>
        </div>
    );
}
