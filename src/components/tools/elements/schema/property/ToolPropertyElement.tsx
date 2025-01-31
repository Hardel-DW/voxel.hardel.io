import { useTranslate } from "@/components/useTranslate";
import { stringIdentifierToDisplay } from "@/lib/minecraft/core/Identifier";

interface ToolPropertyElementProps {
    name: string;
    isChecked: boolean;
    onChange: () => void;
}

export function ToolPropertyElement({ name, isChecked, onChange }: ToolPropertyElementProps) {
    const { t } = useTranslate();

    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl">
            <label htmlFor={name} className="flex items-center justify-between w-full">
                <div className="flex flex-col w-3/4">
                    <span className="text-white line-clamp-1">{stringIdentifierToDisplay(name)}</span>
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{t(`tools.effects.${name}`)}</span>
                </div>
                <input id={name} name={name} type="checkbox" checked={isChecked} onChange={onChange} />
            </label>
        </div>
    );
}
