import type { CollectionEntry } from "astro:content";
import GuideTree from "@/components/pages/guide/content/GuideTree.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs.tsx";
import NavigationTree from "@/components/pages/guide/content/NavigationTree.tsx";

export type Guides = {
    slug: string;
    locked: boolean;
    image: {
        src: string;
        alt: string;
    };
};

interface Props {
    schema: CollectionEntry<"guide">;
    guides: Guides[];
    slug: { lang: string; guide: string; section: string; article: string };
}

export default function Navigation({ schema, guides, slug }: Props) {
    return (
        <div className="flex flex-col overflow-hidden my-4 -mr-2 pr-2" style={{ flex: 1 }}>
            <Tabs defaultValue="chapter" asChild>
                <div className="size-full px-2">
                    {/* Switch between chapter and guide */}
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

                    {/* Display the content of the selected tab */}
                    <TabsContent
                        value="chapter"
                        className="overflow-y-auto overflow-x-hidden pr-2 -mr-2"
                        style={{ flex: 1, height: "calc(100% - 64px)" }}>
                        <div className="space-y-2">
                            {schema.data.sections.map((element, index) => (
                                <NavigationTree
                                    key={element.slug}
                                    index={index}
                                    title={element.title}
                                    selected={element.slug === slug.section}
                                    elements={element.article.map((guide) => ({
                                        href: `/${slug.lang}/guides/${[slug.guide, element.slug, guide.redirect].join("/")}`,
                                        information: guide.time,
                                        selected: guide.redirect === slug.article,
                                        checked: false,
                                        title: guide.title
                                    }))}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="guide" className="overflow-y-auto h-[inherit] pr-2 -mr-2" style={{ flex: 1 }}>
                        <div className="space-y-2">
                            {guides.map((element, index) => (
                                <GuideTree
                                    key={element.slug}
                                    index={index}
                                    image={element.image}
                                    locked={element.locked}
                                    slug={`/${slug.lang}/guides/${element.slug}`}
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
