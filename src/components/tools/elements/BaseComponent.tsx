import { useElementCondition } from "@/lib/hook/useBreezeElement";
import type { FormComponent } from "@voxelio/breeze/core";

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
