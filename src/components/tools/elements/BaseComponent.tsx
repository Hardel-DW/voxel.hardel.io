import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component";
import { useElementCondition } from "@/lib/store/hooks";
import { memo, useMemo } from "react";

export const BaseComponent = <T extends FormComponent>(WrappedComponent: React.ComponentType<{ component: T }>) => {
    const BaseComponentWrapper = memo(({ component }: { component: T }) => {
        const shouldHide = useMemo(() => {
            return component.hide && useElementCondition(component.hide);
        }, [component.hide]);

        if (shouldHide) {
            return null;
        }

        return <WrappedComponent component={component} />;
    });

    BaseComponentWrapper.displayName = `BaseComponent(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
    return BaseComponentWrapper;
};
