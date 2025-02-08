import { getTagsFromRegistry } from "@voxelio/breeze/core";
import type { TagType } from "@voxelio/breeze/schema";
import type { APIRoute } from "astro";
import JSZip from "jszip";

export const GET: APIRoute = async ({ params, request }) => {
    try {
        const url = new URL(request.url);
        const pathParts = params.path?.split("/") || [];
        const registry = pathParts[0];
        const remainingPath = pathParts.slice(1);
        const namespace = url.searchParams.get("namespace") || "minecraft";
        const nested = url.searchParams.get("nested") === "true";

        if (!registry || remainingPath.length === 0) {
            return new Response("Missing parameters", { status: 400 });
        }

        const basePath = `tags/${registry}/${remainingPath.join("/")}`;
        const response = await fetch("https://uy64vwmxhf.ufs.sh/f/llTsukoqRt5Q0pEurfTfxVudAjNlKhbDQFRSw9rXzeJ6P4qC");

        const arrayBuffer = await response.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);

        const result: Record<string, string[]> = {};

        const processFile = async (filePath: string) => {
            const file = zip.file(filePath);
            if (!file) return;

            const content = await file.async("string");
            const data = JSON.parse(content) as TagType;

            const fileName = filePath.split("/").pop()?.replace(".json", "") || "";
            const key = `#${namespace}:${remainingPath.join("/")}/${fileName}`;

            result[key] = getTagsFromRegistry(data);
        };

        const files = Object.keys(zip.files).filter(
            (path) =>
                path.startsWith(basePath) && path.endsWith(".json") && (nested || path.split("/").length === basePath.split("/").length + 1)
        );

        await Promise.all(files.map(processFile));

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=86400"
            }
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
