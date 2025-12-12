import { parseInline } from "./inline";
import type { DirectiveProps, Document, ListItem } from "./types";

export function parseDirectiveProps(raw: string): DirectiveProps {
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

function parseDirectiveLine(line: string): { name: string; props: DirectiveProps } | null {
    if (!line.startsWith("::")) return null;
    const rest = line.slice(2);
    if (rest.endsWith(".end")) return null;

    const braceStart = rest.indexOf("{");
    if (braceStart === -1) {
        return { name: rest.trim(), props: {} };
    }

    const braceEnd = rest.lastIndexOf("}");
    if (braceEnd === -1) return null;

    const name = rest.slice(0, braceStart).trim();
    const propsRaw = rest.slice(braceStart + 1, braceEnd);
    return { name, props: parseDirectiveProps(propsRaw) };
}

function isDirectiveEnd(line: string, name: string): boolean {
    return line === `::${name}.end`;
}

export function tokenize(markdown: string): Document {
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    const tokens: Document = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Empty line
        if (!line.trim()) {
            i++;
            continue;
        }

        // Directive ::name{props} - auto-close if no ::name.end found
        const directive = parseDirectiveLine(line);
        if (directive) {
            i++;
            const hasEnd = lines.slice(i).some((l) => isDirectiveEnd(l, directive.name));

            if (hasEnd) {
                const childLines: string[] = [];
                while (i < lines.length && !isDirectiveEnd(lines[i], directive.name)) {
                    childLines.push(lines[i]);
                    i++;
                }
                tokens.push({
                    type: "directive",
                    name: directive.name,
                    props: directive.props,
                    children: tokenize(childLines.join("\n"))
                });
                i++;
            } else {
                tokens.push({
                    type: "directive_leaf",
                    name: directive.name,
                    props: directive.props
                });
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

        // Heading # to ######
        const heading = parseHeading(line);
        if (heading) {
            tokens.push({ type: "heading", level: heading.level, children: parseInline(heading.content) });
            i++;
            continue;
        }

        // Horizontal rule ---
        if (isHorizontalRule(line)) {
            tokens.push({ type: "hr" });
            i++;
            continue;
        }

        // Small text -# (like Discord)
        if (line.startsWith("-# ")) {
            tokens.push({ type: "small_text", children: parseInline(line.slice(3)) });
            i++;
            continue;
        }

        // Blockquote >
        if (line.startsWith(">")) {
            const quoteLines: string[] = [];
            while (i < lines.length && lines[i].startsWith(">")) {
                quoteLines.push(lines[i].slice(1).trim());
                i++;
            }
            tokens.push({ type: "blockquote", children: tokenize(quoteLines.join("\n")) });
            continue;
        }

        // Table |
        if (line.startsWith("|") && lines[i + 1]?.includes("---")) {
            const headerCells = line
                .split("|")
                .slice(1, -1)
                .map((c) => parseInline(c.trim()));
            i += 2; // Skip header and separator

            const rows: ReturnType<typeof parseInline>[][] = [];
            while (i < lines.length && lines[i].startsWith("|")) {
                const row = lines[i]
                    .split("|")
                    .slice(1, -1)
                    .map((c) => parseInline(c.trim()));
                rows.push(row);
                i++;
            }
            tokens.push({ type: "table", headers: headerCells, rows });
            continue;
        }

        // Ordered list 1. 2. 3.
        if (isOrderedListItem(line)) {
            const items: ListItem[] = [];
            while (i < lines.length && isOrderedListItem(lines[i])) {
                items.push({ children: parseInline(stripOrderedListPrefix(lines[i])) });
                i++;
            }
            tokens.push({ type: "list", ordered: true, items });
            continue;
        }

        // Unordered list - or *
        if (isUnorderedListItem(line)) {
            const items: ListItem[] = [];
            while (i < lines.length && isUnorderedListItem(lines[i])) {
                items.push({ children: parseInline(lines[i].slice(2)) });
                i++;
            }
            tokens.push({ type: "list", ordered: false, items });
            continue;
        }

        // Paragraph (default)
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

function isBlockStart(line: string): boolean {
    if (line.startsWith("::")) return true;
    if (isHorizontalRule(line)) return true;
    if (line.startsWith("#")) return true;
    if (line.startsWith("-# ")) return true;
    if (line.startsWith(">")) return true;
    if (line.startsWith("```")) return true;
    if (line.startsWith("|")) return true;
    if (isOrderedListItem(line)) return true;
    if (isUnorderedListItem(line)) return true;
    return false;
}

function isHorizontalRule(line: string): boolean {
    const trimmed = line.trim();
    return trimmed.length >= 3 && [...trimmed].every((c) => c === "-");
}

function isOrderedListItem(line: string): boolean {
    let i = 0;
    while (i < line.length && line[i] >= "0" && line[i] <= "9") i++;
    return i > 0 && line[i] === "." && line[i + 1] === " ";
}

function isUnorderedListItem(line: string): boolean {
    return (line[0] === "-" || line[0] === "*") && line[1] === " ";
}

function stripOrderedListPrefix(line: string): string {
    let i = 0;
    while (i < line.length && line[i] >= "0" && line[i] <= "9") i++;
    return line.slice(i + 2);
}

function parseHeading(line: string): { level: 1 | 2 | 3 | 4 | 5 | 6; content: string } | null {
    if (line[0] !== "#") return null;

    let level = 0;
    while (level < line.length && line[level] === "#") level++;

    if (level < 1 || level > 6) return null;
    if (line[level] !== " ") return null;

    return { level: level as 1 | 2 | 3 | 4 | 5 | 6, content: line.slice(level + 1) };
}
