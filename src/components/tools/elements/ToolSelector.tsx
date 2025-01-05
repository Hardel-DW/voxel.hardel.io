import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import translate from "@/lib/minecraft/i18n/translate";
import Tabs from "@/components/ui/react/Tabs";

export default function ToolSelector(props: {
    title: TranslateTextType | string;
    description?: TranslateTextType | string;
    value?: string;
    onChange?: (value: string) => void;
    options: { label: TranslateTextType | string; value: string }[];
    lock?: TranslateTextType | string;
}) {
    const list = props.options.map((option) => ({ label: translate(option.label) || "", value: option.value }));

    const handleChange = (option: string) => {
        if (props.lock) return;

        props.onChange?.(option);
    };

    return (
        <div className="flex justify-between items-center py-2 px-1">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="text-white line-clamp-1">{translate(props.title)}</span>
                </div>
                {props.lock ? (
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(props.lock)}</span>
                ) : (
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(props.description)}</span>
                )}
            </div>

            <Tabs tabs={list} defaultTab={props.value} onChange={handleChange} disabled={!!props.lock} />
        </div>
    );
}
