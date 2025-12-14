import { createFileRoute } from "@tanstack/react-router";
import CompoundLayout from "@/components/layout/CompoundLayout";
import { Button } from "@/components/ui/Button";
import Markdown from "@/components/ui/markdown";
import { blog } from "@/lib/content/BlogCollection";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/blog/$slug")({
    component: BlogDetailPage
});

const AUTHOR_NAME = "Hardel";
const AUTHOR_GITHUB = "Hardel-DW";
const AUTHOR_IMAGE = "/images/avatar/hardel.webp";

function BlogDetailPage() {
    const { lang, slug } = Route.useParams();
    const translate = t(lang);
    const entry = blog.bySlug(slug);

    if (!entry) {
        return (
            <CompoundLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">{translate("blog.not_found")}</h1>
                        <Button to="/$lang/blog" params={{ lang }} variant="default">
                            {translate("blog.back")}
                        </Button>
                    </div>
                </div>
            </CompoundLayout>
        );
    }

    return (
        <CompoundLayout>
            <section className="w-full md:w-3/4 max-w-4xl mx-auto px-8 mt-24 md:mt-40">
                <div className="mt-4 flex items-center justify-between gap-y-4">
                    <div className="flex-1">
                        <h1 className="text-xl lg:tracking-tight font-semibold mt-4 lg:leading-tight">{entry.data.title}</h1>

                        <div className="flex items-center text-zinc-500 gap-2">
                            <span className="tracking-wider font-medium text-xs md:text-sm">{entry.data.category}</span>
                            {" - "}
                            <small className="text-xs md:text-sm">
                                {Intl.DateTimeFormat(lang, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                }).format(entry.data.publishDate)}
                            </small>
                        </div>
                    </div>
                    <a href={`https://github.com/${AUTHOR_GITHUB.replace("@", "")}`} className="items-center gap-4 hidden md:flex">
                        <img src={AUTHOR_IMAGE} width="40" height="40" className="rounded-full" alt={AUTHOR_NAME} />
                        <div>
                            <p className="text-sm text-zinc-400 font-bold">{AUTHOR_NAME}</p>
                            <p className="text-sm text-zinc-400">{AUTHOR_GITHUB}</p>
                        </div>
                    </a>
                </div>

                <div className="h-1 w-full bg-zinc-700 rounded-full mt-2" />
            </section>

            <section className="mx-auto w-11/12 md:w-3/4 max-w-4xl rounded-3xl">
                <div className="relative mt-20">
                    <div className="absolute -z-10 size-full inset-0 bg-linear-to-r from-pink-900 to-blue-900 opacity-50 rounded-full blur-[10rem]" />
                    <div className="before:beam-blue-500 before:absolute before:top-0 before:w-full before:h-px before:z-10 after:beam-red-500 after:absolute after:bottom-0 after:w-full after:h-px after:z-10" />

                    {entry.data.video ? (
                        <iframe
                            className="w-full aspect-video rounded-3xl"
                            src={entry.data.video}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    ) : (
                        <img
                            src={entry.data.imageSrc}
                            alt={entry.data.imageAlt}
                            width="1280"
                            height="800"
                            className="h-full w-full object-contain rounded-3xl"
                        />
                    )}
                </div>
            </section>

            <section className="mx-auto px-8 mt-8 prose prose-img:rounded-3xl prose-invert max-w-4xl prose-headings:mb-2 prose-headings:font-medium prose-headings:text-zinc-200 prose-h1:mt-16 prose-h1:font-bold prose-h1:text-white prose-h2:text-white prose-h3:text-zinc-100">
                <Markdown content={entry.content} />
            </section>

            <section className="text-center mb-40 mt-12">
                <Button to="/$lang/blog" params={{ lang }} size="lg" variant="default">
                    {translate("blog.back")}
                </Button>
            </section>
        </CompoundLayout>
    );
}
