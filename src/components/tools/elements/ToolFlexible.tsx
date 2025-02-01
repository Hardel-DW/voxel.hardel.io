import { RenderComponent } from "@/components/tools/RenderComponent";
import type { FormComponent, ToolListType } from "@/lib/minecraft/core/schema/primitive/component";
import { cn } from "@/lib/utils";

export default function ToolFlexible({ component }: { component: ToolListType }) {
    return (
        <div
            className={cn("flex gap-4", {
                "flex-row": component.direction === "horizontal",
                "flex-col": component.direction === "vertical"
            })}>
            {component.children.map((child: FormComponent, index: number) => (
                <RenderComponent key={index.toString()} component={child} />
            ))}
        </div>
    );
}
