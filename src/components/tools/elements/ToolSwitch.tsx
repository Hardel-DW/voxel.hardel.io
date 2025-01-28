import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import translate from "@/lib/minecraft/i18n/translate";

export default function ToolSwitch(props: {
    title: TranslateTextType | string;
    description: TranslateTextType | string;
    name?: TranslateTextType | string;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    lock?: TranslateTextType | string;
}) {
    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl">
            <label className="flex items-center justify-between w-full">
                <div className="flex flex-col w-3/4">
                    <span className="text-white line-clamp-1">{translate(props.title)}</span>
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">
                        {props.lock ? (
                            <span className="text-xs text-zinc-400 font-light w-max">{translate(props.lock)}</span>
                        ) : (
                            translate(props.description)
                        )}
                    </span>
                </div>
                <div className="flex gap-4">
                    <input
                        type="checkbox"
                        name={translate(props.name) || "No name"}
                        disabled={!!props.lock}
                        checked={props.checked || !!props.lock}
                        onChange={(e) => props.onChange?.(e.target.checked)}
                    />
                </div>
            </label>
        </div>
    );
}
