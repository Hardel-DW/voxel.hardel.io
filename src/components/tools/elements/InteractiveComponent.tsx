import type { ActionValue } from "@voxelio/breeze/core";
import type { BaseInteractiveComponent, LockRenderer } from "@voxelio/breeze/core";
import { useConfiguratorStore } from "@/components/tools/Store";
import { useElementCondition, useElementLocks, useElementValue } from "@/lib/hook/useBreezeElement";

export interface InteractiveProps<T> {
    value: T;
    lock: LockRenderer;
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
        const shouldHide = useElementCondition(component.hide);
        const value = useElementValue<T>(component.renderer);
        const lock = useElementLocks(component.lock);
        const handleChange = useConfiguratorStore((state) => state.handleChange);
        const currentElementId = useConfiguratorStore((state) => state.currentElementId);
        if (shouldHide || value === null) return null;

        const handleValueChange = (newValue: T) => {
            if (lock.isLocked) return;
            handleChange(component.action, currentElementId, newValue);
        };

        const interactiveProps: InteractiveProps<T> = { value, lock, handleChange: handleValueChange };

        return <WrappedComponent component={component} interactiveProps={interactiveProps} />;
    };

    InteractiveComponentWrapper.displayName = `InteractiveComponent(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return InteractiveComponentWrapper;
};
