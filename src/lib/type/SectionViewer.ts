export type EnchantViewer = {
    id: string;
    name: string;
    level: number;
    addons?: boolean;
    description: string;
    image: string;
    thumbnail?: string;
    video?: string;
};

export type SectionViewer = {
    id: string;
    short: string;
    image: string;
    enchants: EnchantViewer[];
};
