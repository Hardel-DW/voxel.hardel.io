import { useTranslate } from "@/components/useTranslate";
import type { ToolPropertyType } from "@/lib/minecraft/core/schema/primitive/component";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementCondition, useElementValue } from "@/lib/store/hooks";
import { ToolPropertyElement } from "./ToolPropertyElement";

export default function ToolProperty({ component }: { component: ToolPropertyType }) {
    const { t } = useTranslate();
    const properties = useElementValue<Record<string, any>>(component.properties);
    if (!properties) return null;

    const handleChange = useConfiguratorStore((state) => state.handleChange);
    const currentElementId = useConfiguratorStore((state) => state.currentElementId);

    const getEffectCondition = (effect: string) => {
        return useElementCondition(component.condition, currentElementId, effect);
    };

    return (
        <div className="grid gap-4">
            {!properties || Object.entries(properties).length === 0 ? (
                <h1 className="text-zinc-400 text-center py-4">{t("tools.enchantments.section.effects.components.empty")}</h1>
            ) : null}

            {properties &&
                Object.entries(properties).map(([effect]) => {
                    const checked = getEffectCondition(effect);
                    return (
                        <ToolPropertyElement
                            key={effect}
                            name={effect}
                            isChecked={!checked}
                            onChange={() => {
                                if (component.action) {
                                    handleChange(component.action, currentElementId, effect);
                                }
                            }}
                        />
                    );
                })}
        </div>
    );
}
