import { cn } from "@/lib/utils.ts";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import type * as React from "react";

const Tabs = TabsPrimitive.Root;
const TabsContent = TabsPrimitive.Content;

const TabsList = ({
    ref,
    className,
    ...props
}: {
    ref?: React.Ref<HTMLDivElement>;
    className?: string;
} & React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "inline-flex h-10 justify-center rounded-2xl border-b-0 border border-zinc-800 bg-zinc-950 p-1 text-zinc-400",
            className
        )}
        {...props}
    />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = ({
    ref,
    className,
    ...props
}: {
    ref?: React.Ref<HTMLButtonElement>;
    className?: string;
} & React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            "inline-flex text-zinc-500 items-center justify-center whitespace-nowrap rounded-xl px-3 py-1.5 text-sm font-medium transition-all disabled:pointer-events-none cursor-pointer hover:text-white disabled:opacity-50 data-[state=active]:text-white",
            className
        )}
        {...props}
    />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
