import TranslateText, { type TranslateTextType } from "@/components/tools/elements/text/TranslateText.tsx";
import ToolUnorderedList, { type UnorderedListChildren } from "./ToolUnorderedList";

export type TextRenderType = {
    type: "Text";
    content: TextContent[];
};

export type ToolParagraphType = {
    type: "Paragraph";
    content: TranslateTextType;
};

type TextContent = ToolParagraphType | UnorderedListChildren;

export default function TextRender({ content }: { content: TextContent[] }) {
    const renderContent = (element: TextContent) => {
        switch (element.type) {
            case "Paragraph":
                return (
                    <p className="text-zinc-300">
                        <TranslateText content={element.content} />
                    </p>
                );

            case "UnorderedList":
                return <ToolUnorderedList sublist={element.sublist} />;

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            {content.map((element, index) => (
                <div key={index.toString()}>{renderContent(element)}</div>
            ))}
        </div>
    );
}
