import { useTranslate } from "@/components/TranslateContext.tsx";
import { RenderComponent } from "@/lib/minecraft/components/RenderComponent.tsx";
import type { FormComponent } from "@/lib/minecraft/core/engine";

export type ToolCategoryType = {
    type: "Category";
    title: string;
    children: FormComponent[];
};

export default function ToolCategory({
    title,
    component
}: {
    title: string;
    component: FormComponent[];
}) {
    const { translate } = useTranslate();

    return (
        <div className="[&:not(:first-child)]:mt-8">
            <div className="flex items-center gap-x-4 mb-8">
                <div className="h-1 flex-1 bg-zinc-700" />
                <h2 className="text-2xl font-semibold px-4">{translate[title]}</h2>
                <div className="h-1 flex-1 bg-zinc-700" />
            </div>
            <div className="flex flex-col gap-4">
                {component.map((child, index) => (
                    <RenderComponent key={index.toString()} component={child} />
                ))}
            </div>
        </div>
    );
}
