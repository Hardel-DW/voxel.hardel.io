import { createFileRoute } from "@tanstack/react-router";
import BlogCard from "@/components/BlogCard";
import CompoundLayout from "@/components/layout/CompoundLayout";
import { Button } from "@/components/ui/Button";
import { blog } from "@/lib/content/BlogCollection";
import { t } from "@/lib/i18n";

const PAGE_SIZE = 9;

export const Route = createFileRoute("/$lang/blog/")({
    validateSearch: (search: Record<string, unknown>) => ({
        page: Number(search.page) || 1
    }),
    component: BlogListPage
});

function BlogListPage() {
    const { lang } = Route.useParams();
    const { page } = Route.useSearch();
    const translate = t(lang);

    const allPosts = blog.byLang(lang);
    const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
    const currentPage = Math.max(1, Math.min(page, totalPages || 1));

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const posts = allPosts.slice(startIndex, endIndex);

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return (
        <CompoundLayout>
            <div>
                <section className="w-full md:w-3/4 max-w-(--breakpoint-xl) mx-auto px-8 mt-32 md:mt-40">
                    <h1 className="text-3xl lg:text-6xl lg:tracking-tight mt-1 lg:leading-tight">{translate("blog.latest")}</h1>

                    <div className="h-1 w-full bg-zinc-700 rounded-full mt-2" />
                </section>

                <section className="max-w-(--breakpoint-xl) mx-auto px-8 mt-16">
                    <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16">
                        {posts.map((post, index) => {
                            const slugParts = post.slug.split("/");
                            const postSlug = slugParts[slugParts.length - 1];

                            return (
                                <BlogCard
                                    key={post.slug}
                                    href={`/${lang}/blog/${postSlug}`}
                                    src={post.data.imageSrc}
                                    alt={post.data.imageAlt}
                                    date={post.data.publishDate}
                                    lang={lang}
                                    category={post.data.category}
                                    title={post.data.title}
                                    index={index}
                                />
                            );
                        })}
                    </ul>
                </section>

                <section className="max-w-(--breakpoint-xl) mx-auto px-8 my-16">
                    <div className="flex justify-center items-center mt-10 gap-4">
                        {hasPrev && (
                            <Button variant="primary" to="/$lang/blog" params={{ lang }} search={{ page: currentPage - 1 }}>
                                &larr; {translate("blog.previous")}
                            </Button>
                        )}
                        {hasNext && (
                            <Button variant="primary" to="/$lang/blog" params={{ lang }} search={{ page: currentPage + 1 }}>
                                {translate("blog.next")} &rarr;
                            </Button>
                        )}
                    </div>
                </section>
            </div>
        </CompoundLayout>
    );
}
