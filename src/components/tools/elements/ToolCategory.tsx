import { RenderComponent } from "@/components/tools/RenderComponent.tsx";
import TranslateText from "@/components/tools/elements/text/TranslateText";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component.ts";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";

export default function ToolCategory(props: {
    title: TranslateTextType | string;
    component: FormComponent[];
}) {
    return (
        <div className="not-first:mt-8">
            <div className="flex items-center gap-x-4 mb-8">
                <div className="h-1 flex-1 bg-zinc-700" />
                <h2 className="text-2xl font-semibold px-4">
                    <TranslateText content={props.title} />
                </h2>
                <div className="h-1 flex-1 bg-zinc-700" />
            </div>
            <div className="flex flex-col gap-4">
                {props.component.map((child, index) => (
                    <RenderComponent key={index.toString()} component={child} />
                ))}
            </div>
        </div>
    );
}
