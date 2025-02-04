import type { VoxelElement } from "@/lib/minecraft/core/Element";
import type { VoxelRegistryElement } from "@/lib/minecraft/core/Element";
import type { IdentifierObject } from "@/lib/minecraft/core/Identifier";
import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { APIContext } from "astro";

export const prerender = false;

interface ArtificialAction {
    action: Action | null;
    identifier: IdentifierObject | null;
    response: string;
    onlyResponse: boolean;
    error?: string;
}

export async function POST({ request }: APIContext) {
    try {
        const body = await request.json();
        const contextPrompt =
            body.elements && body.elements.length > 0
                ? `Here are the elements, use them as a source of information:\n${body.elements
                      .map((el: VoxelRegistryElement<VoxelElement>) => `${el.identifier}:\n${JSON.stringify(el.data, null, 2)}`)
                      .join("\n\n")}\n\nUser question: ${body.prompt}`
                : `User question: ${body.prompt}`;

        const response = await fetch("https://voxelia.hardel7401.workers.dev/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: contextPrompt }]
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
        }

        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    throw new Error("No reader available");
                }

                const decoder = new TextDecoder();
                const encoder = new TextEncoder();
                let accumulatedText = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const text = decoder.decode(value);
                    accumulatedText += text;
                    const lines = text.split("\n").filter((line) => line.trim());

                    for (const line of lines) {
                        if (line.includes("[DONE]")) {
                            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                            continue;
                        }

                        if (line.startsWith("data: ")) {
                            try {
                                const jsonStr = line.replace(/^data: /, "");
                                const data = JSON.parse(jsonStr);
                                let validJson: ArtificialAction;

                                if (data.response) {
                                    try {
                                        const match = data.response.match(/\{[\s\S]*\}/);
                                        if (match) {
                                            validJson = JSON.parse(match[0]);
                                        } else {
                                            validJson = {
                                                error: "Invalid response format",
                                                onlyResponse: true,
                                                response: data.response,
                                                identifier: null,
                                                action: null
                                            };
                                        }
                                    } catch (e) {
                                        validJson = {
                                            error: "Failed to parse response as JSON",
                                            onlyResponse: true,
                                            response: data.response,
                                            identifier: null,
                                            action: null
                                        };
                                    }

                                    const cleanResponse = JSON.stringify({ response: validJson });
                                    controller.enqueue(encoder.encode(`data: ${cleanResponse}\n\n`));
                                }
                            } catch (e) {
                                console.error("Failed to process line:", e);
                            }
                        }
                    }
                }
                controller.close();
            }
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache, no-transform",
                Connection: "keep-alive"
            }
        });
    } catch (error) {
        console.error("Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
