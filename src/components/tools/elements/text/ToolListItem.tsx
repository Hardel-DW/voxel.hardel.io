import TranslateText, { type TranslateTextType } from "@/components/tools/elements/text/TranslateText.tsx";

export type ToolListItemType = {
    type: "ListItem";
    content: TranslateTextType;
};

export default function ToolListItem({ content }: { content: TranslateTextType | string }) {
    return (
        <li className="text-zinc-400">
            <TranslateText content={content} />
        </li>
    );
}
