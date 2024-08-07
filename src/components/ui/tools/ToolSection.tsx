import type React from "react";

interface Props {
    title: string;
    children?: React.ReactNode;
}

export default function ToolSection({ title, children }: Props) {
    return (
        <div className="bg-black/50 p-4 flex flex-col ring-0 transition-all rounded-xl">
            <div className="py-2 px-4 flex justify-between items-center cursor-pointer">
                <div>
                    <h2 className="text-2xl font-semibold">{title}</h2>
                </div>
                <img
                    src="/icons/chevron-down.svg"
                    alt="expand"
                    className={"w-5 h-5 cursor-pointer invert transition-transform duration-300"}
                />
            </div>
            <div className="transition-height duration-100 ease-in-out overflow-hidden pb-1 px-1">
                <div className="pt-4 gap-4 flex items flex-col">{children}</div>
            </div>
        </div>
    );
}
