export type EnchantViewer = {
    id: string;
    name: string;
    item: string;
    description: string;
    image: string;
    thumbnail?: string;
    video?: string;
};

export type SectionViewer = {
    id: string;
    name: string;
    short: string;
    image: string;
    enchants: EnchantViewer[];
};
