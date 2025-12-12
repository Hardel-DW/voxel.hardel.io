import type { ReactNode } from "react";
import { tokenize } from "./lexer";
import type { BlockToken, Document, InlineToken } from "./types";

export type DirectiveComponent = (props: Record<string, unknown>) => ReactNode;
export type Directives = Record<string, DirectiveComponent>;
type RenderContext = {
    components: Required<Components>;
    directives: Directives;
};

export type Components = {
    h1?: (props: { children: ReactNode }) => ReactNode;
    h2?: (props: { children: ReactNode }) => ReactNode;
    h3?: (props: { children: ReactNode }) => ReactNode;
    h4?: (props: { children: ReactNode }) => ReactNode;
    h5?: (props: { children: ReactNode }) => ReactNode;
    h6?: (props: { children: ReactNode }) => ReactNode;
    p?: (props: { children: ReactNode }) => ReactNode;
    small?: (props: { children: ReactNode }) => ReactNode;
    strong?: (props: { children: ReactNode }) => ReactNode;
    em?: (props: { children: ReactNode }) => ReactNode;
    del?: (props: { children: ReactNode }) => ReactNode;
    a?: (props: { href: string; children: ReactNode }) => ReactNode;
    img?: (props: { src: string; alt: string }) => ReactNode;
    linked_img?: (props: { src: string; alt: string; href: string }) => ReactNode;
    code?: (props: { children: ReactNode }) => ReactNode;
    pre?: (props: { lang?: string; children: ReactNode }) => ReactNode;
    blockquote?: (props: { children: ReactNode }) => ReactNode;
    ul?: (props: { children: ReactNode }) => ReactNode;
    ol?: (props: { children: ReactNode }) => ReactNode;
    li?: (props: { children: ReactNode }) => ReactNode;
    hr?: () => ReactNode;
    table?: (props: { children: ReactNode }) => ReactNode;
    thead?: (props: { children: ReactNode }) => ReactNode;
    tbody?: (props: { children: ReactNode }) => ReactNode;
    tr?: (props: { children: ReactNode }) => ReactNode;
    th?: (props: { children: ReactNode }) => ReactNode;
    td?: (props: { children: ReactNode }) => ReactNode;
    br?: () => ReactNode;
};

const defaults: Required<Components> = {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
    p: ({ children }) => <p>{children}</p>,
    small: ({ children }) => <small>{children}</small>,
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    del: ({ children }) => <del>{children}</del>,
    a: ({ href, children }) => <a href={href}>{children}</a>,
    img: ({ src, alt }) => <img src={src} alt={alt} />,
    linked_img: ({ src, alt, href }) => (
        <a href={href}>
            <img src={src} alt={alt} />
        </a>
    ),
    code: ({ children }) => <code>{children}</code>,
    pre: ({ children }) => <pre>{children}</pre>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    hr: () => <hr />,
    table: ({ children }) => <table>{children}</table>,
    thead: ({ children }) => <thead>{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => <th>{children}</th>,
    td: ({ children }) => <td>{children}</td>,
    br: () => <br />
};

function renderInlineToken(token: InlineToken, ctx: RenderContext, key: string): ReactNode {
    const { components, directives } = ctx;
    switch (token.type) {
        case "text":
            return token.content;
        case "bold":
            return <components.strong key={key}>{renderInline(token.children, ctx, key)}</components.strong>;
        case "italic":
            return <components.em key={key}>{renderInline(token.children, ctx, key)}</components.em>;
        case "strike":
            return <components.del key={key}>{renderInline(token.children, ctx, key)}</components.del>;
        case "code":
            return <components.code key={key}>{token.content}</components.code>;
        case "link":
            return (
                <components.a key={key} href={token.href}>
                    {renderInline(token.children, ctx, key)}
                </components.a>
            );
        case "image":
            return <components.img key={key} src={token.src} alt={token.alt} />;
        case "linked_image":
            return <components.linked_img key={key} src={token.src} alt={token.alt} href={token.href} />;
        case "directive": {
            const Component = directives[token.name];
            if (!Component) return null;
            return <Component key={key} {...token.props} />;
        }
        case "br":
            return <components.br key={key} />;
    }
}

function renderInline(tokens: InlineToken[], ctx: RenderContext, prefix: string): ReactNode {
    return tokens.map((token, i) => renderInlineToken(token, ctx, `${prefix}-i${i}`));
}

function renderBlock(token: BlockToken, ctx: RenderContext, prefix: string): ReactNode {
    const { components, directives } = ctx;

    switch (token.type) {
        case "directive": {
            const Component = directives[token.name];
            if (!Component) return null;
            const children = renderBlocks(token.children, ctx);
            return (
                <Component key={prefix} {...token.props}>
                    {children}
                </Component>
            );
        }
        case "directive_leaf": {
            const Component = directives[token.name];
            if (!Component) return null;
            return <Component key={prefix} {...token.props} />;
        }
        case "heading": {
            const Tag = components[`h${token.level}`];
            return <Tag key={prefix}>{renderInline(token.children, ctx, prefix)}</Tag>;
        }
        case "paragraph":
            return <components.p key={prefix}>{renderInline(token.children, ctx, prefix)}</components.p>;
        case "small_text":
            return <components.small key={prefix}>{renderInline(token.children, ctx, prefix)}</components.small>;
        case "blockquote":
            return <components.blockquote key={prefix}>{renderBlocks(token.children, ctx)}</components.blockquote>;
        case "hr":
            return <components.hr key={prefix} />;
        case "code_block":
            return (
                <components.pre key={prefix} lang={token.lang}>
                    <components.code>{token.content}</components.code>
                </components.pre>
            );
        case "list": {
            const Tag = token.ordered ? components.ol : components.ul;
            return (
                <Tag key={prefix}>
                    {token.items.map((item, i) => {
                        const liKey = `${prefix}-li${i}`;
                        return <components.li key={liKey}>{renderInline(item.children, ctx, liKey)}</components.li>;
                    })}
                </Tag>
            );
        }
        case "table":
            return (
                <components.table key={prefix}>
                    <components.thead>
                        <components.tr>
                            {token.headers.map((cell, i) => {
                                const thKey = `${prefix}-th${i}`;
                                return <components.th key={thKey}>{renderInline(cell, ctx, thKey)}</components.th>;
                            })}
                        </components.tr>
                    </components.thead>
                    <components.tbody>
                        {token.rows.map((row, ri) => {
                            const trKey = `${prefix}-tr${ri}`;
                            return (
                                <components.tr key={trKey}>
                                    {row.map((cell, ci) => {
                                        const tdKey = `${trKey}-td${ci}`;
                                        return <components.td key={tdKey}>{renderInline(cell, ctx, tdKey)}</components.td>;
                                    })}
                                </components.tr>
                            );
                        })}
                    </components.tbody>
                </components.table>
            );
    }
}

function renderBlocks(tokens: Document, ctx: RenderContext): ReactNode {
    return tokens.map((token, i) => renderBlock(token, ctx, `b${i}`));
}

export function render(tokens: Document, components: Components = {}, directives: Directives = {}): ReactNode {
    const ctx: RenderContext = {
        components: { ...defaults, ...components },
        directives
    };
    return renderBlocks(tokens, ctx);
}

export default function RawMarkdown({ content, directives }: { content?: string; directives?: Directives }) {
    if (!content) return null;
    const tokens = tokenize(content);
    return render(tokens, {}, directives);
}
