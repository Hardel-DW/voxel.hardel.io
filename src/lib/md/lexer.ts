import { parseInline } from "./inline";
import type { DirectiveProps, Document, ListItem } from "./types";

const MAX_ITERATIONS = 100_000;
const HR_REGEX = /^-{3,}$/;
const ORDERED_LIST_REGEX = /^\d+\.\s/;

function parseProps(raw: string): DirectiveProps {
    const props: DirectiveProps = {};
    let pos = 0;
    while (pos < raw.length) {
        while (pos < raw.length && (raw[pos] === " " || raw[pos] === ",")) pos++;
        if (pos >= raw.length) break;

        const keyStart = pos;
        while (pos < raw.length && raw[pos] !== "=") pos++;
        const key = raw.slice(keyStart, pos).trim();
        if (!key || pos >= raw.length) break;

        pos++;
        const quote = raw[pos];
        if (quote === '"' || quote === "'") {
            pos++;
            const valueStart = pos;
            while (pos < raw.length && raw[pos] !== quote) pos++;
            props[key] = raw.slice(valueStart, pos);
            pos++;
        } else {
            const valueStart = pos;
            while (pos < raw.length && raw[pos] !== " " && raw[pos] !== ",") pos++;
            props[key] = raw.slice(valueStart, pos);
        }
    }
    return props;
}

function parseDirectiveHeader(line: string): { type: "leaf" | "container"; name: string; props: DirectiveProps } | null {
    if (line.startsWith(":::")) {
        const rest = line.slice(3);
        const braceStart = rest.indexOf("{");
        if (braceStart === -1) return { type: "container", name: rest.trim(), props: {} };
        const braceEnd = rest.lastIndexOf("}");
        if (braceEnd === -1) return null;
        return { type: "container", name: rest.slice(0, braceStart).trim(), props: parseProps(rest.slice(braceStart + 1, braceEnd)) };
    }
    if (line.startsWith("::")) {
        const rest = line.slice(2);
        const braceStart = rest.indexOf("{");
        if (braceStart === -1) return { type: "leaf", name: rest.trim(), props: {} };
        const braceEnd = rest.lastIndexOf("}");
        if (braceEnd === -1) return null;
        return { type: "leaf", name: rest.slice(0, braceStart).trim(), props: parseProps(rest.slice(braceStart + 1, braceEnd)) };
    }
    return null;
}

function parseHeading(line: string): { level: 1 | 2 | 3 | 4 | 5 | 6; content: string } | null {
    if (line[0] !== "#") return null;
    let level = 0;
    while (level < line.length && line[level] === "#") level++;
    if (level < 1 || level > 6 || line[level] !== " ") return null;
    return { level: level as 1 | 2 | 3 | 4 | 5 | 6, content: line.slice(level + 1) };
}

function isBlockStart(line: string): boolean {
    const c = line[0];
    return (
        line.startsWith("::") ||
        HR_REGEX.test(line.trim()) ||
        c === "#" ||
        line.startsWith("-# ") ||
        c === ">" ||
        line.startsWith("```") ||
        c === "|" ||
        ORDERED_LIST_REGEX.test(line) ||
        ((c === "-" || c === "*") && line[1] === " ")
    );
}

export function tokenize(markdown: string): Document {
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    const tokens: Document = [];
    let i = 0;
    let iterations = 0;

    while (i < lines.length) {
        if (++iterations > MAX_ITERATIONS) throw new Error("Lexer limit exceeded");

        const line = lines[i];
        if (!line.trim()) {
            i++;
            continue;
        }

        // Directives: ::leaf{props} or :::container{props}...:::
        const directive = parseDirectiveHeader(line);
        if (directive) {
            i++;
            if (directive.type === "leaf") {
                tokens.push({ type: "directive_leaf", name: directive.name, props: directive.props });
            } else {
                const childLines: string[] = [];
                while (i < lines.length && lines[i] !== ":::") {
                    childLines.push(lines[i]);
                    i++;
                }
                tokens.push({ type: "directive_container", name: directive.name, props: directive.props, children: tokenize(childLines.join("\n")) });
                if (i < lines.length) i++; // Skip closing :::
            }
            continue;
        }

        // Code block ```
        if (line.startsWith("```")) {
            const lang = line.slice(3).trim() || undefined;
            const content: string[] = [];
            i++;
            while (i < lines.length && !lines[i].startsWith("```")) {
                content.push(lines[i]);
                i++;
            }
            tokens.push({ type: "code_block", lang, content: content.join("\n") });
            i++;
            continue;
        }

        // Heading
        const heading = parseHeading(line);
        if (heading) {
            tokens.push({ type: "heading", level: heading.level, children: parseInline(heading.content) });
            i++;
            continue;
        }

        // Horizontal rule
        if (HR_REGEX.test(line.trim())) {
            tokens.push({ type: "hr" });
            i++;
            continue;
        }

        // Small text -#
        if (line.startsWith("-# ")) {
            tokens.push({ type: "small_text", children: parseInline(line.slice(3)) });
            i++;
            continue;
        }

        // Blockquote
        if (line[0] === ">") {
            const quoteLines: string[] = [];
            while (i < lines.length && lines[i][0] === ">") {
                quoteLines.push(lines[i].slice(1).trimStart());
                i++;
            }
            tokens.push({ type: "blockquote", children: tokenize(quoteLines.join("\n")) });
            continue;
        }

        // Table
        if (line[0] === "|" && lines[i + 1]?.includes("---")) {
            const headers = line.split("|").slice(1, -1).map((c) => parseInline(c.trim()));
            i += 2;
            const rows: ReturnType<typeof parseInline>[][] = [];
            while (i < lines.length && lines[i][0] === "|") {
                rows.push(lines[i].split("|").slice(1, -1).map((c) => parseInline(c.trim())));
                i++;
            }
            tokens.push({ type: "table", headers, rows });
            continue;
        }

        // Ordered list
        if (ORDERED_LIST_REGEX.test(line)) {
            const items: ListItem[] = [];
            while (i < lines.length && ORDERED_LIST_REGEX.test(lines[i])) {
                items.push({ children: parseInline(lines[i].replace(ORDERED_LIST_REGEX, "")) });
                i++;
            }
            tokens.push({ type: "list", ordered: true, items });
            continue;
        }

        // Unordered list
        if ((line[0] === "-" || line[0] === "*") && line[1] === " ") {
            const items: ListItem[] = [];
            while (i < lines.length && (lines[i][0] === "-" || lines[i][0] === "*") && lines[i][1] === " ") {
                items.push({ children: parseInline(lines[i].slice(2)) });
                i++;
            }
            tokens.push({ type: "list", ordered: false, items });
            continue;
        }

        // Paragraph
        const paragraphLines: string[] = [];
        while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
            paragraphLines.push(lines[i]);
            i++;
        }
        if (paragraphLines.length > 0) {
            tokens.push({ type: "paragraph", children: parseInline(paragraphLines.join("\n")) });
        }
    }

    return tokens;
}
