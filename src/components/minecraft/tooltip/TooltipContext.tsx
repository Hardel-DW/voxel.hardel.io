import React, { createContext } from "react";

type TooltipContextData = {
    hoveredItem?: string;
    setHoveredItem: (item?: string) => void;
};

export const TooltipContext = createContext<TooltipContextData>({} as TooltipContextData);
export default function TooltipContextProvider({ children }: { children: React.ReactNode }) {
    const [hoveredItem, setHoveredItem] = React.useState<string>();

    return <TooltipContext.Provider value={{ hoveredItem, setHoveredItem }}>{children}</TooltipContext.Provider>;
}
