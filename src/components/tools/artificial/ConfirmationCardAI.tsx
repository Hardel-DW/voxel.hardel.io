import { useTranslate } from "@/components/useTranslate";
import { type Analysers, getAnalyserForVersion } from "@/lib/minecraft/core/engine/Analyser";
import { type Action, updateData } from "@/lib/minecraft/core/engine/actions";
import { useConfiguratorStore } from "@/lib/minecraft/core/engine/Store";
import { useState } from "react";
import { ValueRenderer, type ValueRendererProps } from "./value/ValueRenderer";
import { Identifier } from "@/lib/minecraft/core/Identifier";

export type PropsConfirmationCardAI = {
    action: Action;
    identifier: string;
};

export default function ConfirmationCardAI(props: PropsConfirmationCardAI) {
    const [isTriggered, setIsTriggered] = useState(false);
    const { lang, t } = useTranslate();
    const store = useConfiguratorStore();
    const element = store.elements.get(props.identifier);
    const analyserId = store.configuration?.analyser.id;

    if (!element) {
        console.error("Element not found with identifier", props.identifier);
        return null;
    }

    if (typeof analyserId !== "string") {
        console.error("Invalid analyser ID type with identifier", props.identifier);
        return null;
    }

    if (props.action.type === "sequential" || props.action.type === "alternative") {
        console.error("Sequential action type not supported with identifier", props.identifier);
        return null;
    }

    const properties = getAnalyserForVersion(analyserId as keyof Analysers, store.version ?? Number.POSITIVE_INFINITY);
    const property = properties?.analyser.properties(lang);

    if (!property) {
        console.error("Property not found");
        return null;
    }

    const { icon, name, type: propertyType } = property[props.action.field];
    const handleChange = store.handleChange;
    const oldValue = element[props.action.field];
    const preview = updateData(props.action, element, store.version ?? Number.POSITIVE_INFINITY);

    if (!preview) {
        console.error("Preview not found");
        return null;
    }

    const newValue = preview[props.action.field];

    const data: ValueRendererProps = {
        type: propertyType,
        old: oldValue,
        new: newValue,
        isTriggered: isTriggered
    };

    const handleAccept = () => {
        if (!isTriggered) {
            handleChange(props.action, props.identifier);
            setIsTriggered(true);
        }
    };

    const handleRefuse = () => {
        setIsTriggered(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, callback: () => void) => {
        if (e.key === "Enter") {
            callback();
        }
    };

    return (
        <div className="group pt-8 starting:translate-y-10 translate-y-0 transition-all duration-300">
            <div className="flex w-full justify-between">
                <div className="w-fit border-t border-x border-zinc-900 bg-zinc-950 group-hover:border-zinc-800 transition-all duration-300 text-white py-2 px-6 rounded-t-md translate-y-px">
                    <p className="text-xs">{new Identifier(element.identifier).toFilePath()}</p>
                </div>
                {!isTriggered && (
                    <div className="flex gap-2">
                        <div
                            onClick={handleAccept}
                            onKeyDown={(e) => handleKeyDown(e, handleAccept)}
                            className="w-fit border border-green-900 hover:border-green-700 bg-zinc-950 transition-all duration-300 text-white py-2 px-6 rounded-t-md -translate-y-2">
                            <p className="text-xs">{t("ai.confirmation.accept")}</p>
                        </div>

                        <div
                            onClick={handleRefuse}
                            onKeyDown={(e) => handleKeyDown(e, handleRefuse)}
                            className="w-fit border border-red-900 hover:border-red-700 bg-zinc-950 transition-all duration-300 text-white py-2 px-6 rounded-t-md -translate-y-2">
                            <p className="text-xs">{t("ai.confirmation.refuse")}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="border bg-zinc-950 group-hover:border-zinc-800 transition-all duration-300 flex justify-between border-zinc-900 text-white py-2 px-4 rounded-md">
                <div className="flex items-center gap-4 grow">
                    {icon && <img src={icon} alt={name} className="aspect-square h-full invert" />}
                    <div className="flex flex-col gap-1">
                        <h3 className="font-bold">{t("ai.confirmation.suggestedModification")}</h3>
                        <div className="flex items-center gap-1">
                            <span className="text-xs">{t("ai.confirmation.description")}</span>
                            <span className="text-xs font-semibold text-white">{name}</span>
                        </div>
                    </div>
                </div>
                <ValueRenderer {...data} />
            </div>
        </div>
    );
}
