import { ContentCollection } from "@/lib/content/ContentCollection";

export interface UpdateData extends Record<string, unknown> {
    draft: boolean;
    publishDate: Date;
    version: string;
    type: string;
}

class UpdateCollection extends ContentCollection<UpdateData> {
    protected readonly basePath = "update";
    protected readonly type = "markdown" as const;

    byLangAndTimeline(lang: string, timeline: string) {
        const now = new Date();

        return this.filter((entry) => {
            const [, entryLang, entryTimeline] = entry.slug.split("/");
            if (entryLang !== lang || entryTimeline !== timeline) return false;
            return !entry.data.draft && entry.data.publishDate <= now;
        }).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
    }
}

export const updates = new UpdateCollection();
