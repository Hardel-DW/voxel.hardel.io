import ConfirmationCardAI, { type PropsConfirmationCardAI } from "@/components/tools/artificial/ConfirmationCardAI";
import Reference from "@/components/tools/artificial/Reference";
import { identifierToString, type IdentifierObject } from "@/lib/minecraft/core/Identifier";

interface Props {
    content: string;
    isStreaming: boolean;
    cards: PropsConfirmationCardAI[];
    reference: IdentifierObject[];
}

export const RenderAIContent: React.FC<Props> = (props) => {
    return (
        <>
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-center relative z-50 self-items-start">
                    <div className="flex gap-x-2 items-center">
                        <img src="/icons/company/meta.svg" alt="AI" className="w-6 h-6 invert" />
                        <div className="text-white">
                            <span className="text-xs">Llama 3.3 - 70b</span>
                        </div>
                    </div>
                    {props.reference.length > 0 && (
                        <div className="flex gap-x-2 items-center text-xs">
                            {props.reference.map((reference) => (
                                <Reference key={identifierToString(reference)} reference={reference} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-white overflow-y-auto rounded-md mt-2">
                    <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-black/50 from-25% to-transparent" />
                    {props.content}
                    {props.isStreaming && <span className="animate-pulse ml-1 inline-block">▊</span>}
                    <div className="h-1 w-full bg-zinc-950" />
                </div>
            </div>
            {props.cards.length > 0 && (
                <div className="flex flex-col gap-4">
                    {props.cards.map((card) => (
                        <ConfirmationCardAI key={card.identifier} {...card} />
                    ))}
                </div>
            )}
        </>
    );
};
