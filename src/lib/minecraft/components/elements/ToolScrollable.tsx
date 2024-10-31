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
            className={cn("overflow-y-auto flex-1 p-px", props.className)}
            style={{
                height: props.height ? `${props.height}px` : "300px"
            }}
        >
            <div>{props.children}</div>
        </div>
    );
}
