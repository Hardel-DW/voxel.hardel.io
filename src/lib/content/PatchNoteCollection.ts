import { ContentCollection } from "@/lib/content/ContentCollection";

export interface PatchNoteData extends Record<string, unknown> {
    draft: boolean;
    publishDate: Date;
    version: string;
    title: string;
    type: string;
    description?: string;
    imageSrc?: string;
}

class PatchNoteCollection extends ContentCollection<PatchNoteData> {
    protected readonly basePath = "update";
    protected readonly type = "markdown" as const;

    byLang(lang: string, name: string) {
        const now = new Date();

        return this.filter((entry) => {
            const [, entryLang, entryTimeline] = entry.slug.split("/");
            if (entryLang !== lang || entryTimeline !== name) return false;
            return !entry.data.draft && entry.data.publishDate <= now;
        }).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
    }
}

export const patchnote = new PatchNoteCollection();
