import { Select } from "@/components/ui/Select.tsx";

interface Props {
    title: string;
    image: string;
    onChange?: (option: string) => void;
    value?: string;
    name: string;
}

export type VillagerStateEnum = "none" | "common" | "special" | "common_special";

export type ToolVillagerType = {
    type: "Villager";
    name: string;
    title: string;
    image: string;
};

export default function ToolVillager({ title, image, value, onChange, name }: Props) {
    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl">
            <div className="flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold mb-8">{title}</h3>
                <img src={image} alt={title} className="w-16" />
            </div>
            <div className="w-full flex justify-center">
                <div className="min-w-32">
                    <Select
                        id={name}
                        value={value}
                        options={["Default", "Novice to Expert", "Novice to Master", "Master Only"]}
                        defaultOption="Default"
                        onChange={(option) => onChange?.(option)}
                    />
                </div>
            </div>
        </div>
    );
}
