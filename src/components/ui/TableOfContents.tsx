import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
    id: string;
    text: string;
}

function extractHeadings(markdown: string): Heading[] {
    const headings: Heading[] = [];

    for (const line of markdown.replace(/\r/g, "").split("\n")) {
        const match = /^#\s+(.+)$/.exec(line);
        if (!match) continue;

        const text = match[1].trim();
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
        headings.push({ id, text });
    }

    return headings;
}

interface TableOfContentsProps {
    content?: string;
    containerRef: React.RefObject<HTMLElement | null>;
}

export default function TableOfContents({ content, containerRef }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState("");
    const observerRef = useRef<IntersectionObserver | null>(null);
    const headings = content ? extractHeadings(content) : [];

    useEffect(() => {
        const container = containerRef.current;
        if (!container || headings.length === 0) return;

        const h1Elements = container.querySelectorAll("h1");

        h1Elements.forEach((el, i) => {
            if (!el.id && headings[i]) el.id = headings[i].id;
        });

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((e) => e.isIntersecting);
                if (visible) setActiveId(visible.target.id);
            },
            { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
        );

        h1Elements.forEach((el) => {
            observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, [headings, containerRef]);

    if (headings.length === 0) return null;

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
    };

    return (
        <nav>
            <h3 className="text-zinc-500 font-medium text-sm tracking-wider uppercase mb-4">On this page</h3>
            <ul className="space-y-1 border-l-2 border-zinc-800">
                {headings.map((h) => (
                    <li key={h.id}>
                        <button
                            type="button"
                            onClick={() => scrollTo(h.id)}
                            className={cn(
                                "block w-full text-left py-1 text-sm transition-all duration-200 border-l-2 -ml-[2px] pl-3 cursor-pointer",
                                activeId === h.id
                                    ? "text-white border-white"
                                    : "text-zinc-500 border-transparent hover:text-zinc-300 hover:border-zinc-600"
                            )}>
                            {h.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
