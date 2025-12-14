import type { DirectiveProps, InlineToken } from "./types";

const MAX_ITERATIONS = 100_000;

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

function findClosing(text: string, start: number, open: string, close: string): number {
    let depth = 1;
    let pos = start;
    while (pos < text.length && depth > 0) {
        if (text.startsWith(open, pos)) depth++;
        else if (text.startsWith(close, pos)) depth--;
        if (depth > 0) pos++;
    }
    return depth === 0 ? pos : -1;
}

function tryParseHardBreak(text: string, pos: number): { length: number; token: InlineToken } | null {
    if (text[pos] !== " ") return null;
    let spaces = 0;
    while (text[pos + spaces] === " ") spaces++;
    if (spaces >= 2 && text[pos + spaces] === "\n") {
        return { length: spaces + 1, token: { type: "br" } };
    }
    return null;
}

function tryParseSoftBreak(text: string, pos: number): { length: number; token: InlineToken } | null {
    if (text[pos] === "\n") {
        return { length: 1, token: { type: "text", content: " " } };
    }
    return null;
}

function tryParseDirective(text: string, pos: number): { length: number; token: InlineToken } | null {
    if (text[pos] !== ":") return null;
    if (text[pos + 1] === ":") return null; // Block directive, not inline

    const nameMatch = text.slice(pos + 1).match(/^([\w.-]+)/);
    if (!nameMatch) return null;

    const name = nameMatch[1];
    let length = 1 + name.length;

    let props: DirectiveProps = {};
    if (text[pos + length] === "{") {
        const braceEnd = text.indexOf("}", pos + length);
        if (braceEnd !== -1) {
            props = parseProps(text.slice(pos + length + 1, braceEnd));
            length = braceEnd - pos + 1;
        }
    }

    return { length, token: { type: "directive", name, props } };
}

function tryParseImage(text: string, pos: number): { length: number; token: InlineToken } | null {
    if (text[pos] !== "!" || text[pos + 1] !== "[") return null;

    const altEnd = findClosing(text, pos + 2, "[", "]");
    if (altEnd === -1 || text[altEnd + 1] !== "(") return null;

    const srcEnd = text.indexOf(")", altEnd + 2);
    if (srcEnd === -1) return null;

    return {
        length: srcEnd - pos + 1,
        token: { type: "image", alt: text.slice(pos + 2, altEnd), src: text.slice(altEnd + 2, srcEnd) }
    };
}

function tryParseLink(text: string, pos: number): { length: number; token: InlineToken } | null {
    if (text[pos] !== "[") return null;

    const textEnd = findClosing(text, pos + 1, "[", "]");
    if (textEnd === -1 || text[textEnd + 1] !== "(") return null;

    const hrefEnd = text.indexOf(")", textEnd + 2);
    if (hrefEnd === -1) return null;

    return {
        length: hrefEnd - pos + 1,
        token: { type: "link", href: text.slice(textEnd + 2, hrefEnd), children: parseInline(text.slice(pos + 1, textEnd)) }
    };
}

function tryParseBold(text: string, pos: number): { length: number; token: InlineToken } | null {
    if (text[pos] !== "*" || text[pos + 1] !== "*") return null;
    const end = text.indexOf("**", pos + 2);
    if (end === -1) return null;
    return { length: end - pos + 2, token: { type: "bold", children: parseInline(text.slice(pos + 2, end)) } };
}

function tryParseItalic(text: string, pos: number): { length: number; token: InlineToken } | null {
    if (text[pos] !== "*") return null;
    if (text[pos + 1] === "*") return null; // Bold, not italic
    const end = text.indexOf("*", pos + 1);
    if (end === -1) return null;
    return { length: end - pos + 1, token: { type: "italic", children: parseInline(text.slice(pos + 1, end)) } };
}

function tryParseStrike(text: string, pos: number): { length: number; token: InlineToken } | null {
    if (text[pos] !== "~" || text[pos + 1] !== "~") return null;
    const end = text.indexOf("~~", pos + 2);
    if (end === -1) return null;
    return { length: end - pos + 2, token: { type: "strike", children: parseInline(text.slice(pos + 2, end)) } };
}

function tryParseCode(text: string, pos: number): { length: number; token: InlineToken } | null {
    if (text[pos] !== "`") return null;
    const end = text.indexOf("`", pos + 1);
    if (end === -1) return null;
    return { length: end - pos + 1, token: { type: "code", content: text.slice(pos + 1, end) } };
}

export function parseInline(text: string): InlineToken[] {
    const tokens: InlineToken[] = [];
    let pos = 0;
    let buffer = "";
    let iterations = 0;

    while (pos < text.length) {
        if (++iterations > MAX_ITERATIONS) throw new Error("Inline parser limit exceeded");

        let result: { length: number; token: InlineToken } | null = null;
        const char = text[pos];

        switch (char) {
            case " ":
                result = tryParseHardBreak(text, pos);
                break;
            case "\n":
                result = tryParseSoftBreak(text, pos);
                break;
            case ":":
                result = tryParseDirective(text, pos);
                break;
            case "!":
                result = tryParseImage(text, pos);
                break;
            case "[":
                result = tryParseLink(text, pos);
                break;
            case "*":
                result = tryParseBold(text, pos) ?? tryParseItalic(text, pos);
                break;
            case "~":
                result = tryParseStrike(text, pos);
                break;
            case "`":
                result = tryParseCode(text, pos);
                break;
        }

        if (result) {
            if (buffer) {
                tokens.push({ type: "text", content: buffer });
                buffer = "";
            }
            tokens.push(result.token);
            pos += result.length;
        } else {
            buffer += text[pos];
            pos++;
        }
    }

    if (buffer) tokens.push({ type: "text", content: buffer });
    return tokens;
}
