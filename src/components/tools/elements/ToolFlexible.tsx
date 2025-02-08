import { RenderComponent } from "@/components/tools/RenderComponent";
import { cn } from "@/lib/utils";
import type { FormComponent, ToolListType } from "@voxelio/breeze/core";

export default function ToolFlexible({ component }: { component: ToolListType }) {
    return (
        <div
            className={cn("flex gap-4 overflow-y-hidden", {
                "flex-row": component.direction === "horizontal",
                "flex-col": component.direction === "vertical"
            })}>
            {component.children.map((child: FormComponent, index: number) => (
                <RenderComponent key={index.toString()} component={child} />
            ))}
        </div>
    );
}
