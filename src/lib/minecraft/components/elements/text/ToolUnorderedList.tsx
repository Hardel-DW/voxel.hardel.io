import ToolListItem from "./ToolListItem";
import type { ToolListItemType } from "./ToolListItem";

export type ToolUnorderedListType = {
    type: "UnorderedList";
    sublist: UnorderedListChildren[];
};

export type UnorderedListChildren = ToolListItemType | ToolUnorderedListType;

export default function ToolUnorderedList({ sublist }: { sublist: UnorderedListChildren[] }) {
    const renderChild = (child: UnorderedListChildren) => {
        switch (child.type) {
            case "ListItem":
                return <ToolListItem key={child.content.toString()} content={child.content} />;
            case "UnorderedList":
                return <ToolUnorderedList key={`list-${Math.random()}`} sublist={child.sublist} />;
            default:
                return null;
        }
    };

    return <ul className="list-disc list-inside space-y-2">{sublist.map(renderChild)}</ul>;
}
