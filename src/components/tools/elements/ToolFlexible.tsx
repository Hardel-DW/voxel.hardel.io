import { RenderComponent } from "@/components/tools/RenderComponent";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component";
import { cn } from "@/lib/utils";

interface ToolFlexibleProps {
    direction?: "horizontal" | "vertical";
    children: FormComponent[];
}

export default function ToolFlexible({ direction = "horizontal", children }: ToolFlexibleProps) {
    return (
        <div
            className={cn("flex gap-4", {
                "flex-row": direction === "horizontal",
                "flex-col": direction === "vertical"
            })}>
            {children.map((child: FormComponent, index: number) => (
                <RenderComponent key={index.toString()} component={child} />
            ))}
        </div>
    );
}
