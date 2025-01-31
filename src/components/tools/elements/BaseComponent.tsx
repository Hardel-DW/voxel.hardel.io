import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component";
import { useElementCondition } from "@/lib/minecraft/core/engine/utils/hooks";

export const BaseComponent = <T extends FormComponent>(WrappedComponent: React.ComponentType<{ component: T }>) => {
    const BaseComponentWrapper = ({ component }: { component: T }) => {
        const shouldHide = useElementCondition(component.hide);
        if (shouldHide) {
            return null;
        }

        return <WrappedComponent component={component} />;
    };

    BaseComponentWrapper.displayName = `BaseComponent(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
    return BaseComponentWrapper;
};
