import { useTranslate } from "@/lib/hook/useTranslate";
import type { Condition } from "@voxelio/breeze";
import { Identifier, useConfiguratorStore, useElementCondition } from "@voxelio/breeze/core";
import type { TranslationKey } from "@voxelio/breeze/i18n";
interface ToolPropertyElementProps {
    name: string;
    condition: Condition;
    onChange: () => void;
}

export function ToolPropertyElement({ name, condition, onChange }: ToolPropertyElementProps) {
    const { t } = useTranslate();
    const currentElementId = useConfiguratorStore((state) => state.currentElementId);
    const isChecked = useElementCondition(condition, currentElementId, name);

    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl">
            <label htmlFor={name} className="flex items-center justify-between w-full">
                <div className="flex flex-col w-3/4">
                    <span className="text-white line-clamp-1">{Identifier.toDisplay(name)}</span>
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{t(`tools.effects.${name}` as TranslationKey)}</span>
                </div>
                <input id={name} name={name} type="checkbox" checked={!isChecked} onChange={onChange} />
            </label>
        </div>
    );
}
