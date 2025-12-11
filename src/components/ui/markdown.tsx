import RawMarkdown from "@lib/md/render";
import { Balancing } from "@/components/markdown/Balancing";
import { Changelog } from "@/components/markdown/Changelog";
import { NewEnchant } from "@/components/markdown/NewEnchant";
import { Video } from "@/components/ui/Video";
import Gallery from "@/components/markdown/Gallery";

export default function Markdown({ content }: { content?: string }) {
    if (!content) return null;

    return (
        <div
            className="prose prose-invert max-w-none wrap-break-word
    prose-headings:font-rubik prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
    prose-p:text-zinc-400 prose-p:leading-7 md:prose-p:leading-8 prose-p:font-rubik prose-p:text-base md:prose-p:text-lg
    prose-strong:text-white prose-strong:font-semibold
    prose-ul:my-6 md:prose-ul:my-8 prose-ul:list-none prose-ul:pl-0
    prose-li:pl-6 md:prose-li:pl-8 prose-li:relative prose-li:my-2 md:prose-li:my-3 prose-li:text-zinc-300 prose-li:text-base md:prose-li:text-lg
    prose-li:before:absolute prose-li:before:left-2 prose-li:before:top-3.5 prose-li:before:size-1.5 prose-li:before:rounded-full prose-li:before:bg-zinc-600
    prose-img:w-full prose-img:rounded-xl prose-img:border prose-img:border-white/5 prose-img:bg-zinc-900/50 prose-img:shadow-2xl prose-img:my-8
    prose-hr:border-white/5 prose-hr:my-12">
            <RawMarkdown
                content={content}
                directives={{
                    video: Video,
                    gallery: Gallery,
                    "enchant.changelog": Changelog,
                    "enchant.balancing": Balancing,
                    "enchant.newenchant": NewEnchant
                }}
            />
        </div>
    );
}
