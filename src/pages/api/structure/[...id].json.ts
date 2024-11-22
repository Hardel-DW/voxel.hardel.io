import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export const prerender = true;
export async function getStaticPaths() {
    const structures = await getCollection("structure");
    return structures.map((s) => ({
        params: { id: s.id },
        props: { structure: s.data }
    }));
}

export function GET({ props }: APIContext) {
    return new Response(JSON.stringify(props.structure));
}
