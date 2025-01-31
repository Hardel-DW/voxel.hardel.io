import type { ActionValue } from "@/lib/minecraft/core/engine/actions";
import type { BaseInteractiveComponent } from "@/lib/minecraft/core/schema/primitive/component";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementLocks, useElementValue } from "@/lib/store/hooks";

export interface InteractiveProps<T> {
    value: T;
    isLocked: boolean;
    lockText: TranslateTextType | undefined;
    handleChange: (newValue: T) => void;
}

export interface InteractiveComponentProps<T, C extends BaseInteractiveComponent> {
    component: C;
    interactiveProps: InteractiveProps<T>;
}

export const InteractiveComponent = <T extends ActionValue, C extends BaseInteractiveComponent>(
    WrappedComponent: React.ComponentType<{
        component: C;
        interactiveProps: InteractiveProps<T>;
    }>
) => {
    const InteractiveComponentWrapper = ({ component }: { component: C }) => {
        const value = useElementValue<T>(component.renderer);
        if (value === null) return null;

        const { isLocked, text: lockText } = useElementLocks(component.lock);
        const handleChange = useConfiguratorStore((state) => state.handleChange);
        const currentElementId = useConfiguratorStore((state) => state.currentElementId);

        const handleValueChange = (newValue: T) => {
            if (component.lock) return;
            handleChange(component.action, currentElementId, newValue);
        };

        const interactiveProps: InteractiveProps<T> = {
            value,
            isLocked,
            lockText,
            handleChange: handleValueChange
        };

        return <WrappedComponent component={component} interactiveProps={interactiveProps} />;
    };

    InteractiveComponentWrapper.displayName = `InteractiveComponent(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return InteractiveComponentWrapper;
};
