import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import type { CollectionEntry } from "astro:content";

export const prerender = true;
export async function getStaticPaths() {
    const loot = await getCollection("loot");
    return loot.map((s) => ({
        params: { id: s.id },
        props: { loot: s.data }
    }));
}

async function getAllItems(
    data: CollectionEntry<"loot">["data"],
    collection: CollectionEntry<"loot">[]
): Promise<NonNullable<CollectionEntry<"loot">["data"]["items"]>> {
    const items: NonNullable<CollectionEntry<"loot">["data"]["items"]> = [];

    if (data.items) items.push(...data.items);
    if (data.reference) {
        for (const ref of data.reference) {
            const referencedLoot = collection.find((l) => l.id === ref.id);
            if (referencedLoot) {
                const referencedItems = await getAllItems(referencedLoot.data, collection);
                items.push(...referencedItems);
            }
        }
    }

    return items;
}

export async function GET({ props }: APIContext) {
    const collection = await getCollection("loot");
    const allItems = await getAllItems(props.loot, collection);

    return new Response(JSON.stringify(allItems));
}
