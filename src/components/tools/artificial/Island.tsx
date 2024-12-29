import { useState } from "react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/lib/hook/useClickOutside";
import { InnerGlow } from "@/components/tools/artificial/InnerGlow";
import { RenderAIContent } from "@/components/tools/artificial/RenderAIContent";
import { useAIStream, type IActionResponse } from "@/lib/hook/useAIStream";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { Identifier } from "@/lib/minecraft/core/Identifier";
import { SplitSequentialAction } from "@/lib/minecraft/core/engine/actions";
import type { PropsConfirmationCardAI } from "./ConfirmationCardAI";
import { useTranslate } from "@/components/useTranslate";

export const Island: React.FC = () => {
    const { t } = useTranslate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [cards, setCards] = useState<PropsConfirmationCardAI[]>([]);
    const store = useConfiguratorStore();
    const { streamingText, isStreaming, startStreaming, reference } = useAIStream((object: IActionResponse) => {
        if (object.action && object.identifier) {
            const identifier = Identifier.fromString(object.identifier, "enchantment");
            const actions = SplitSequentialAction(object.action);
            setCards(actions.map((action) => ({ action, identifier })));
        }
    });
    const ref = useClickOutside(() => handleReset());

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.length > 1) {
            launchProcess();
        }
    };

    const handleClick = () => {
        launchProcess();
    };

    const handleReset = () => {
        setIsExpanded(false);
        setIsFocused(false);
    };

    const launchProcess = async () => {
        if (inputValue.length > 0) {
            try {
                setIsExpanded(true);
                await startStreaming(inputValue);
                setInputValue("");
            } catch (error) {
                console.error("Error during streaming:", error);
            }
        }
    };

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    if (store.elements.length === 0) return null;

    return (
        <>
            {isStreaming && <InnerGlow />}
            <div
                ref={ref}
                style={{
                    width: isExpanded ? "70vw" : isFocused ? "500px" : "400px",
                    minHeight: isExpanded ? "300px" : "auto",
                    borderRadius: isExpanded ? "24px" : "50px"
                }}
                onKeyDown={handleKeyPress}
                className="fixed max-h-[50vh] space-y-2 z-100 bottom-5 left-1/2 -translate-x-1/2 bg-black/80 border-zinc-900 border-2 backdrop-blur-md px-2 py-2 flex flex-col cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-90 starting:opacity-0"
                aria-expanded={isExpanded}>
                <div
                    className={cn(
                        "text-white transition-opacity p-2 duration-300 starting:opacity-0 opacity-100 grow overflow-y-auto border-b border-zinc-900 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent",
                        isExpanded ? "grid" : "hidden"
                    )}>
                    <RenderAIContent content={streamingText} isStreaming={isStreaming} cards={cards} reference={reference} />
                </div>
                <div className="w-full flex gap-x-4 items-center justify-between mt-auto p-2">
                    <input
                        type="custom"
                        placeholder={t("ai.island.placeholder")}
                        disabled={isStreaming}
                        className={cn(
                            "bg-transparent border-none text-base w-full shrink outline-none placeholder:text-white/50",
                            isStreaming ? "text-white/50 select-none shine-text" : "text-white"
                        )}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onClick={(e) => e.stopPropagation()}
                    />

                    <div className="flex gap-x-2 items-center">
                        <button
                            type="button"
                            onClick={toggleExpand}
                            className="hover:opacity-50 w-6 h-6 transition-opacity duration-300 cursor-pointer focus:outline-none">
                            {isExpanded ? (
                                <img src="/icons/tools/artificial/compress.svg" alt="Réduire" className="invert" />
                            ) : (
                                <img src="/icons/tools/artificial/expand.svg" alt="Agrandir" className="invert" />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleClick}
                            disabled={inputValue.length === 0 || isStreaming}
                            className="disabled:opacity-50 w-6 h-6 hover:opacity-50 z-20 cursor-pointer transition-opacity duration-300 disabled:cursor-not-allowed focus:outline-none">
                            {isStreaming ? (
                                <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            ) : (
                                <img src="/icons/tools/artificial/send.svg" alt="Logo" className="invert" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
