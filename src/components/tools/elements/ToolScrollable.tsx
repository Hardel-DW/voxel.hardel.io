import { RenderComponent } from "@/components/tools/RenderComponent";
import type { ToolScrollableType } from "@/lib/minecraft/core/schema/primitive/component";
import { cn } from "@/lib/utils.ts";

export default function ToolScrollable({ component }: { component: ToolScrollableType }) {
    return (
        <div
            className={cn("overflow-y-auto flex-1 p-px")}
            style={{
                height: component.height ? `${component.height}px` : "300px"
            }}>
            {component.children.map((child, index) => (
                <RenderComponent key={index.toString()} component={child} />
            ))}
        </div>
    );
}
