import { useTranslate } from "@/components/TranslateContext.tsx";
import type { EnchantmentProps } from "@/components/pages/tools/enchant/Config.ts";
import { useEnchantments } from "@/components/pages/tools/enchant/EnchantmentsContext.tsx";
import type { FormComponent } from "@/components/ui/tools";
import VoxelToolCounter from "@/components/ui/tools/ToolCounter.tsx";
import { ToolRange } from "@/components/ui/tools/ToolRange.tsx";
import ToolSelectable from "@/components/ui/tools/ToolSelectable.tsx";
import ToolSlot from "@/components/ui/tools/ToolSlot.tsx";
import ToolSwitch from "@/components/ui/tools/ToolSwitch.tsx";
import ToolVillager from "@/components/ui/tools/ToolVillager.tsx";

type RenderComponentProps = {
    component: FormComponent;
    formValues: EnchantmentProps | undefined;
    handleChange: (key: string, value: string | number | boolean) => void;
};

export type ToolGridType = {
    type: "grid";
    columns: number;
    children: Exclude<FormComponent, ToolGridType>[];
};

export function RenderComponent({ component, formValues, handleChange }: RenderComponentProps) {
    const { handleRemoveLockedField, handleAddLockedField } = useEnchantments();
    const { translate } = useTranslate();

    function getValue<T>(key: keyof EnchantmentProps, defaultValue?: T): T | undefined {
        if (!formValues) return defaultValue;
        return formValues[key] as T;
    }

    switch (component.type) {
        case "Counter": {
            const value = getValue<number>(component.name as keyof EnchantmentProps, 0);
            return (
                <VoxelToolCounter
                    key={component.name}
                    value={value}
                    min={component.min}
                    max={component.max}
                    step={component.step}
                    title={translate[component.title]}
                    image={component.image}
                    description={translate[component.description]}
                    onChange={(option) => handleChange(component.name, option)}
                />
            );
        }
        case "Range": {
            const value = getValue<number>(component.name as keyof EnchantmentProps, 0);
            return (
                <ToolRange
                    key={component.name}
                    value={value}
                    id={component.name}
                    label={translate[component.label]}
                    onChange={(e) => handleChange(component.name, e.target.valueAsNumber)}
                />
            );
        }
        case "Switch": {
            const value = getValue<boolean>(component.name as keyof EnchantmentProps, false);
            const locked = formValues?.lockedFields?.find((field) => field.field === component.name);

            return (
                <ToolSwitch
                    key={component.name}
                    title={translate[component.title]}
                    checked={value}
                    forced={locked ? translate[locked.reason] : undefined}
                    description={translate[component.description]}
                    name={component.name}
                    onChange={(e) => {
                        const checked = e.target.checked;
                        const lockField = component.lock;
                        handleChange(component.name, checked);

                        checked && lockField ? handleAddLockedField(component.name, lockField) : handleRemoveLockedField(component.name);
                    }}
                />
            );
        }
        case "grid": {
            const { columns, children } = component;
            const width = window.innerWidth;
            const numColumns = Math.min(columns, Math.floor(width / 300));

            return (
                <div className="grid max-xl:grid-cols-1 gap-4" style={{ gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))` }}>
                    {children.map((child, index: number) => (
                        <RenderComponent key={index.toString()} component={child} formValues={formValues} handleChange={handleChange} />
                    ))}
                </div>
            );
        }
        case "Slot": {
            const value = getValue<boolean>(component.name as keyof EnchantmentProps, false);
            const locked = formValues?.lockedFields?.find((field) => field.field === component.name);
            console.log(locked);

            return (
                <ToolSlot
                    key={component.name}
                    checked={value}
                    forced={locked ? translate[locked.reason] : undefined}
                    description={component.description ? translate[component.description] : undefined}
                    onChange={(option) => handleChange(component.name, option)}
                    title={translate[component.title]}
                    image={component.image}
                />
            );
        }
        case "Selectable": {
            const currentValue = getValue<string>(component.name as keyof EnchantmentProps, "");
            return (
                <ToolSelectable
                    key={component.name}
                    title={translate[component.title]}
                    image={component.image}
                    value={component.value}
                    onChange={(option) => handleChange(component.name, option)}
                    currentValue={currentValue}
                />
            );
        }
        case "Villager": {
            const value = getValue<string>(component.name as keyof EnchantmentProps, "");
            return (
                <ToolVillager
                    key={component.name}
                    name={component.name}
                    onChange={(option) => handleChange(component.name, option)}
                    value={value}
                    title={translate[component.title]}
                    image={component.image}
                />
            );
        }
        default:
            return null;
    }
}
