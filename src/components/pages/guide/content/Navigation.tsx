import type { CollectionEntry } from "astro:content";
import GuideTree from "@/components/pages/guide/content/GuideTree.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationTree from "./NavigationTree.tsx";

export type Guides = {
    slug: string;
    image: {
        src: string;
        alt: string;
    };
};

interface Props {
    schema: CollectionEntry<"guide">;
    guides: Guides[];
    slug: { guide: string; section: string; article: string };
}

export default function Navigation({ schema, guides, slug }: Props) {
    return (
        <div className="flex-grow h-full relative">
            <Tabs defaultValue="chapter" asChild>
                <div className="size-full px-2 mt-4">
                    <TabsList className="mb-4 grid grid-cols-2 bg-transparent relative overflow-hidden">
                        <div className="absolute inset-0 -z-10 hue-rotate-45 brightness-20">
                            <img src="/images/shine.avif" alt="Shine" />
                        </div>

                        <TabsTrigger className="data-[state=active]:bg-zinc-700/40" value="chapter">
                            Chapitre
                        </TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-zinc-700/40" value="guide">
                            Guides
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="chapter" className="h-full overflow-y-auto pr-2 -mr-2">
                        <div className="flex flex-col gap-y-2">
                            {schema.data.sections.map((element, index) => (
                                <NavigationTree
                                    key={element.slug}
                                    index={index}
                                    title={element.title}
                                    selected={element.slug === slug.section}
                                    elements={element.article.map((guide) => ({
                                        href: `/guides/${[slug.guide, element.slug, guide.redirect].join("/")}`,
                                        information: guide.time,
                                        selected: guide.redirect === slug.article,
                                        checked: false,
                                        title: guide.title
                                    }))}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="guide">
                        <div className="flex flex-col gap-y-2">
                            {guides.map((element, index) => (
                                <GuideTree
                                    key={element.slug}
                                    index={index}
                                    image={element.image}
                                    slug={`/guides/${element.slug}`}
                                    selected={element.slug === slug.guide}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
