import TranslateText, { type TranslateTextType } from "@/lib/minecraft/components/elements/text/TranslateText.tsx";

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
