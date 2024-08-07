import { useEnchantments } from "@/components/pages/tools/enchant/EnchantmentsContext.tsx";
import TextComponent from "@/components/ui/tools/schema/TextComponent.tsx";
import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import { cn } from "@/lib/utils.ts";
import { useMemo, useRef } from "react";

type Props = {
    element: Identifier;
};

export function EnchantmentItem({ element }: Props) {
    const { setCurrentEnchantmentData, currentEnchantmentId, enchantments } = useEnchantments();
    const switchRef = useRef<HTMLDivElement>(null);
    if (enchantments.length === 0) return null;
    const enchantment = useMemo(() => enchantments.find((enchantment) => enchantment.identifier.equals(element)), [enchantments, element]);
    if (!enchantment) return null;

    const handleClick = () => {
        if (switchRef.current?.contains(document.activeElement)) return;
        setCurrentEnchantmentData(enchantment.identifier, enchantment.data);
    };

    return (
        <div
            className={cn("odd:bg-black/75 pl-4 pr-2 py-2 rounded-xl", {
                "ring-1 ring-rose-900": currentEnchantmentId?.equals(element)
            })}
        >
            <div className="flex items-center justify-between" onClick={handleClick} onKeyDown={handleClick}>
                <TextComponent data={enchantment.data.description} />
                <div className="flex items-center gap-8" ref={switchRef}>
                    <label className="flex items-center justify-between gap-4">
                        <input type="checkbox" defaultChecked={true} name="enable" />
                    </label>
                </div>
            </div>
        </div>
    );
}
