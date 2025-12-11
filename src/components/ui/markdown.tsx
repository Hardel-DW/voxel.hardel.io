import RawMarkdown from "@lib/md/render";
import { Video } from "./Video";
import { Changelog } from "@/components/Changelog";

export default function Markdown({ content }: { content?: string }) {
    if (!content) return null;

    return (
        <div
            className="prose prose-invert max-w-none wrap-break-word
    prose-headings:font-rubik prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
    prose-h1:text-3xl md:prose-h1:text-4xl
    prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-8 md:prose-h2:mt-12 prose-h2:mb-4 md:prose-h2:mb-6
    prose-h3:text-lg md:prose-h3:text-xl
    prose-p:text-zinc-400 prose-p:leading-7 md:prose-p:leading-8 prose-p:font-rubik prose-p:text-base md:prose-p:text-lg
    prose-a:text-white prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:text-pink-400 prose-a:transition-colors
    prose-strong:text-white prose-strong:font-semibold
    prose-ul:my-6 md:prose-ul:my-8 prose-ul:list-none prose-ul:pl-0
    prose-li:pl-6 md:prose-li:pl-8 prose-li:relative prose-li:my-2 md:prose-li:my-3 prose-li:text-zinc-300 prose-li:text-base md:prose-li:text-lg
    prose-li:before:absolute prose-li:before:left-2 prose-li:before:top-3.5 prose-li:before:size-1.5 prose-li:before:rounded-full prose-li:before:bg-zinc-600
    prose-code:text-sm prose-code:font-code prose-code:text-zinc-200 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-white/5
    prose-pre:bg-[#0c0c0e] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:shadow-2xl
    prose-img:w-full prose-img:rounded-xl prose-img:border prose-img:border-white/5 prose-img:bg-zinc-900/50 prose-img:shadow-2xl prose-img:my-8
    prose-hr:border-white/5 prose-hr:my-12">
            <RawMarkdown content={content} directives={{ "video": Video, "enchant.changelog": Changelog }} />
        </div>
    );
}
