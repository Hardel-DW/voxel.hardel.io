import ToolUnorderedList from "@/components/tools/elements/text/ToolUnorderedList";
import type { TextContent, TextRenderType } from "@/lib/minecraft/core/schema/primitive/text";
import translate from "@/lib/minecraft/i18n/translate";

export default function TextRender({ component }: { component: TextRenderType }) {
    const renderContent = (element: TextContent) => {
        switch (element.type) {
            case "Paragraph":
                return <p className="text-zinc-300">{translate(element.content)}</p>;

            case "UnorderedList":
                return <ToolUnorderedList sublist={element.sublist} />;

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            {component.content.map((element, index) => (
                <div key={index.toString()}>{renderContent(element)}</div>
            ))}
        </div>
    );
}
