import { cn } from "@/lib/utils";
import type * as React from "react";

const Card = ({
    ref,
    className,
    ...props
}: {
    ref?: React.Ref<HTMLDivElement>;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => (
    <div ref={ref} className={cn("rounded-3xl border border-zinc-900 bg-zinc-950 text-zinc-200 shadow-md", className)} {...props} />
);
Card.displayName = "Card";

const CardHeader = ({
    ref,
    className,
    ...props
}: {
    ref?: React.Ref<HTMLDivElement>;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 border-0 border-transparent", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({
    ref,
    className,
    ...props
}: {
    ref?: React.Ref<HTMLDivElement>;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => (
    <div ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({
    ref,
    className,
    ...props
}: {
    ref?: React.Ref<HTMLDivElement>;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => <div ref={ref} className={cn("text-sm text-zinc-400", className)} {...props} />;
CardDescription.displayName = "CardDescription";

const CardContent = ({
    ref,
    className,
    ...props
}: {
    ref?: React.Ref<HTMLDivElement>;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
CardContent.displayName = "CardContent";

const CardFooter = ({
    ref,
    className,
    ...props
}: {
    ref?: React.Ref<HTMLDivElement>;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />;
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
