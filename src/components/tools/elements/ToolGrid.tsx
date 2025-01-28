import { RenderComponent } from "@/components/tools/RenderComponent";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component";

interface ToolGridProps {
    size?: string;
    children: FormComponent[];
}

export default function ToolGrid({ size = "255px", children }: ToolGridProps) {
    return (
        <div
            className="grid max-xl:grid-cols-1 gap-4"
            style={{
                gridTemplateColumns: `repeat(auto-fit, minmax(${size}, 1fr))`
            }}>
            {children.map((child: FormComponent, index: number) => (
                <RenderComponent key={index.toString()} component={child} />
            ))}
        </div>
    );
}
