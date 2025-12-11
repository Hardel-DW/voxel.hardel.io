import type { HTMLAttributes, ReactNode } from "react";
import Star from "@/components/ui/Star";

interface GroupItemProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    children: ReactNode;
}

export default function GroupItem({ title, children, ...rest }: GroupItemProps) {
    return (
        <div
            className="in-data-layout-grid:contents in-data-layout-category:flex in-data-layout-category:flex-col"
            data-marketplace-category={title.toLowerCase()}
            {...rest}>
            <h3 className="text-3xl font-semibold tracking-tighter in-data-layout-grid:hidden">{title}</h3>
            <Star className="in-data-layout-grid:hidden" />
            <div className="grid grid-cols-marketplace gap-4 mt-4 in-data-layout-grid:contents">{children}</div>
        </div>
    );
}
