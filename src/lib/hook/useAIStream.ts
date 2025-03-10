import { useConfiguratorStore } from "@/components/tools/Store";
import { JSONBuilder } from "@/lib/utils/json";
import { type Action, Identifier, type IdentifierObject, searchRelevantElements } from "@voxelio/breeze/core";
import { useState } from "react";

interface UseAIStreamReturn {
    streamingText: string;
    isStreaming: boolean;
    reference: IdentifierObject[];
    startStreaming: (prompt: string) => Promise<void>;
    onFinishedStreaming: (object: IActionResponse) => void;
}

export interface IActionResponse {
    action: Action | null;
    identifier: string | null;
    response: string;
    onlyResponse: boolean;
}

interface AIResponse {
    response: IActionResponse;
}

export const useAIStream = (onFinishedStreaming: (object: IActionResponse) => void): UseAIStreamReturn => {
    const [streamingText, setStreamingText] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [reference, setReference] = useState<IdentifierObject[]>([]);
    const elements = useConfiguratorStore((state) => state.elements);

    const startStreaming = async (prompt: string) => {
        if (!prompt) return;

        setIsStreaming(true);
        setStreamingText("");

        try {
            const relevantElements = searchRelevantElements(Array.from(elements.values()), prompt, ["effects"]);
            setReference(relevantElements.map((el) => el.identifier));
            const response = await fetch("/api/llama", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt,
                    elements: relevantElements.map((el) => ({
                        identifier: new Identifier(el.identifier).toString(),
                        data: el.data
                    }))
                })
            });

            if (!response.ok) {
                throw new Error("Failed to get AI response");
            }

            const reader = response.body?.getReader();
            if (reader) {
                let accumulatedText = "";
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        setIsStreaming(false);
                        const json = new JSONBuilder(accumulatedText);
                        const content = json.build<IActionResponse>();
                        onFinishedStreaming(content);
                        break;
                    }

                    const text = new TextDecoder().decode(value);
                    const lines = text.split("\n").filter((line) => line.trim() !== "");

                    for (const line of lines) {
                        if (line.includes("[DONE]")) continue;

                        try {
                            const jsonStr = line.replace(/^data: /, "");
                            const parsed = JSON.parse(jsonStr) as AIResponse;
                            if (parsed.response?.response) {
                                accumulatedText += parsed.response.response;
                                const json = new JSONBuilder(accumulatedText);
                                const content = json.build<IActionResponse>();
                                const text = "response" in content ? content.response : null;
                                if (text) {
                                    setStreamingText(text);
                                }
                            }
                        } catch (e) {
                            console.error("Failed to parse JSON:", e, "on line:", line);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Streaming error:", error);
            setIsStreaming(false);
        }
    };

    return {
        streamingText,
        isStreaming,
        reference,
        startStreaming,
        onFinishedStreaming
    };
};
