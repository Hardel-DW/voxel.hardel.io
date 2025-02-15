import { getElementByRegistry, useCopilotStore } from "@/components/pages/tools/copilot/store/DatapackStore";
import { Identifier, type TagType } from "@voxelio/breeze";
import TextureRenderer from "@/components/minecraft/TextureRenderer";
import { useResource } from "@/components/pages/tools/copilot/store/hooks/useResource";
import TagsComparator from "@/lib/minecraft/core/tags/TagsComparator";
import { useShallow } from "zustand/react/shallow";
import Loader from "@/components/ui/react/Loader";

export default function EnchantmentLabel(props: { item: string }) {
    const identifier = Identifier.of(props.item, "tags/item");
    const packTags = useCopilotStore(useShallow((state) => getElementByRegistry<TagType>(state, "tags/item")));
    const { data, loading } = useResource<TagType>("data/tag/item");

    const itemId = (): string => {
        if (!data) return "minecraft:barrier";
        const items = new TagsComparator([...data, ...packTags]).getRecursiveValues(identifier);
        return items.length ? items[Math.floor(Math.random() * items.length)] : "minecraft:barrier";
    };

    return (
        <>
            <div className="flex w-full items-center justify-between gap-2">
                <span className="text-lg font-medium text-white tracking-tight line-clamp-1">{identifier.toResourceName()}</span>
                {!data || loading ? <Loader /> : <TextureRenderer id={itemId()} />}
            </div>
        </>
    );
}
