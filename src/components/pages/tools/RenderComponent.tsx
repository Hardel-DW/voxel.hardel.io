import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/components/pages/tools/ConfiguratorContext.tsx";
import ToolCounter from "@/components/ui/tools/ToolCounter.tsx";
import ToolRange from "@/components/ui/tools/ToolRange.tsx";
import ToolSlot from "@/components/ui/tools/ToolSlot.tsx";
import ToolSwitch from "@/components/ui/tools/ToolSwitch.tsx";
import ToolEffectRecord from "@/components/ui/tools/schema/ToolEffectRecord.tsx";
import type { EffectComponentsRecord } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";
import type { FormComponent } from "@/lib/minecraft/voxel";
import { handleChange } from "@/lib/minecraft/voxel/actions";
import { checkCondition } from "@/lib/minecraft/voxel/condition";
import { toast } from "sonner";

type RenderComponentProps = {
    sectionId: string;
    component: FormComponent;
};

export function RenderComponent<T extends Record<string, unknown>>({ component, sectionId }: RenderComponentProps) {
    const context = useConfigurator<T>();
    const { translate } = useTranslate();

    switch (component.type) {
        case "Counter": {
            const result = checkCondition<T>(component.condition, context);
            if (typeof result?.value !== "number") {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.effect"]
                });

                return null;
            }

            return (
                <ToolCounter
                    key={component.title}
                    value={result?.value}
                    min={component.min}
                    max={component.max}
                    step={component.step}
                    title={translate[component.title]}
                    image={component.image}
                    description={translate[component.description]}
                    onChange={(option) => handleChange(component.action, option, context)}
                />
            );
        }
        case "Range": {
            const result = checkCondition<T>(component.condition, context);
            if (typeof result?.value !== "number") {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.effect"]
                });

                return null;
            }

            return (
                <ToolRange
                    key={component.label}
                    id={component.label}
                    value={result?.value}
                    label={translate[component.label]}
                    onValueChange={(option) => handleChange(component.action, option, context)}
                />
            );
        }
        case "Switch": {
            const result = checkCondition<T>(component.condition, context);
            const lock = checkCondition<T>(component.lock, context);

            if (typeof result?.value !== "boolean") {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.effect"]
                });

                return null;
            }

            return (
                <ToolSwitch
                    key={component.title}
                    title={translate[component.title]}
                    checked={result?.value}
                    lock={lock?.lockedBy}
                    description={translate[component.description]}
                    name={component.title}
                    onChange={(value) => handleChange(component.action, value, context)}
                />
            );
        }
        case "Slot": {
            const hide = checkCondition<T>(component.hide, context);
            const result = checkCondition<T>(component.condition, context);
            const lock = checkCondition<T>(component.lock, context);

            if (typeof result?.value !== "boolean") {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.effect"]
                });

                return null;
            }

            if (hide?.value && typeof hide.value !== "boolean") {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.effect"]
                });

                return null;
            }

            return (
                <ToolSlot
                    key={component.title}
                    title={translate[component.title]}
                    checked={result?.value}
                    value={result?.value}
                    hide={hide?.value}
                    lock={lock?.lockedBy}
                    description={component.description ? translate[component.description] : undefined}
                    image={component.image}
                    onChange={(value) => handleChange(component.action, value, context)}
                />
            );
        }
        case "Effect": {
            const result = checkCondition<T>(component.condition, context);
            if (result?.value && typeof result.value !== "object") {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.effect"]
                });

                return null;
            }

            return (
                <ToolEffectRecord
                    value={result?.value as EffectComponentsRecord}
                    onChange={(value) => handleChange(component.action, value, context)}
                />
            );
        }
        case "Grid": {
            return (
                <div className="grid max-xl:grid-cols-1 gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(225px, 1fr))" }}>
                    {component.children.map((child, index: number) => (
                        <RenderComponent key={index.toString()} sectionId={sectionId} component={child} />
                    ))}
                </div>
            );
        }
    }
}
