import { getKey } from "@/lib/minecraft/i18n/translations";
import ToolListItem from "@/components/tools/elements/text/ToolListItem";
import type { UnorderedListChildren } from "@/lib/minecraft/core/schema/primitive/text";

export default function ToolUnorderedList({ sublist }: { sublist: UnorderedListChildren[] }) {
    const renderChild = (child: UnorderedListChildren) => {
        switch (child.type) {
            case "ListItem":
                return <ToolListItem key={getKey(child.content)} content={child.content} />;
            case "UnorderedList":
                return <ToolUnorderedList key={`list-${Math.random()}`} sublist={child.sublist} />;
            default:
                return null;
        }
    };

    return <ul className="list-disc list-inside space-y-2">{sublist.map(renderChild)}</ul>;
}
