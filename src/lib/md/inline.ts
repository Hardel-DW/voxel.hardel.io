import { parseDirectiveProps } from "./lexer";
import type { InlineToken } from "./types";

type Pattern = {
    match: (text: string, pos: number) => { length: number; token: InlineToken } | null;
};

const patterns: Pattern[] = [
    // Hard line break: backslash + newline
    {
        match: (text, pos) => {
            if (text[pos] === "\\" && text[pos + 1] === "\n") {
                return { length: 2, token: { type: "br" } };
            }
            return null;
        },
    },
    // Hard line break: two+ spaces + newline
    {
        match: (text, pos) => {
            if (text[pos] !== " ") return null;
            let spaces = 0;
            while (text[pos + spaces] === " ") spaces++;
            if (spaces >= 2 && text[pos + spaces] === "\n") {
                return { length: spaces + 1, token: { type: "br" } };
            }
            return null;
        },
    },
    // Soft line break: single newline becomes space
    {
        match: (text, pos) => {
            if (text[pos] === "\n") {
                return { length: 1, token: { type: "text", content: " " } };
            }
            return null;
        },
    },
    // Inline directive ::name{props}
    {
        match: (text, pos) => {
            if (text[pos] !== ":" || text[pos + 1] !== ":") return null;
            const rest = text.slice(pos + 2);
            const match = rest.match(/^([\w.-]+)(?:\{([^}]*)\})?/);
            if (!match) return null;
            return {
                length: 2 + match[0].length,
                token: { type: "directive", name: match[1], props: match[2] ? parseDirectiveProps(match[2]) : {} },
            };
        },
    },
    // Image ![alt](src)
    {
        match: (text, pos) => {
            if (text[pos] !== "!" || text[pos + 1] !== "[") return null;
            const altEnd = text.indexOf("]", pos + 2);
            if (altEnd === -1 || text[altEnd + 1] !== "(") return null;
            const srcEnd = text.indexOf(")", altEnd + 2);
            if (srcEnd === -1) return null;
            return {
                length: srcEnd - pos + 1,
                token: { type: "image", alt: text.slice(pos + 2, altEnd), src: text.slice(altEnd + 2, srcEnd) },
            };
        },
    },
    // Link [text](href)
    {
        match: (text, pos) => {
            if (text[pos] !== "[") return null;
            const textEnd = text.indexOf("]", pos + 1);
            if (textEnd === -1 || text[textEnd + 1] !== "(") return null;
            const hrefEnd = text.indexOf(")", textEnd + 2);
            if (hrefEnd === -1) return null;
            return {
                length: hrefEnd - pos + 1,
                token: { type: "link", href: text.slice(textEnd + 2, hrefEnd), children: parseInline(text.slice(pos + 1, textEnd)) },
            };
        },
    },
    // Bold **text**
    {
        match: (text, pos) => {
            if (text[pos] !== "*" || text[pos + 1] !== "*") return null;
            const end = text.indexOf("**", pos + 2);
            if (end === -1) return null;
            return {
                length: end - pos + 2,
                token: { type: "bold", children: parseInline(text.slice(pos + 2, end)) },
            };
        },
    },
    // Strikethrough ~~text~~
    {
        match: (text, pos) => {
            if (text[pos] !== "~" || text[pos + 1] !== "~") return null;
            const end = text.indexOf("~~", pos + 2);
            if (end === -1) return null;
            return {
                length: end - pos + 2,
                token: { type: "strike", children: parseInline(text.slice(pos + 2, end)) },
            };
        },
    },
    // Italic *text*
    {
        match: (text, pos) => {
            if (text[pos] !== "*") return null;
            const end = text.indexOf("*", pos + 1);
            if (end === -1) return null;
            return {
                length: end - pos + 1,
                token: { type: "italic", children: parseInline(text.slice(pos + 1, end)) },
            };
        },
    },
    // Inline code `code`
    {
        match: (text, pos) => {
            if (text[pos] !== "`") return null;
            const end = text.indexOf("`", pos + 1);
            if (end === -1) return null;
            return {
                length: end - pos + 1,
                token: { type: "code", content: text.slice(pos + 1, end) },
            };
        },
    },
];

export function parseInline(text: string): InlineToken[] {
    const tokens: InlineToken[] = [];
    let pos = 0;
    let buffer = "";

    const flushBuffer = () => {
        if (buffer) {
            tokens.push({ type: "text", content: buffer });
            buffer = "";
        }
    };

    while (pos < text.length) {
        let matched = false;
        for (const pattern of patterns) {
            const result = pattern.match(text, pos);
            if (result) {
                flushBuffer();
                tokens.push(result.token);
                pos += result.length;
                matched = true;
                break;
            }
        }
        if (!matched) {
            buffer += text[pos];
            pos++;
        }
    }

    flushBuffer();
    return tokens;
}

