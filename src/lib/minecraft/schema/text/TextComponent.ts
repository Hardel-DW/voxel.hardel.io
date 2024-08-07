type TextComponent = string | TextComponentObject | TextComponent[];

type TextComponentPlainText = {
    text: string;
};

type TextComponentTranslate = {
    translate: string;
    fallback?: string;
    with?: TextComponent[];
};

type TextComponentScore = {
    score: {
        name: string;
        objective: string;
        value?: string;
    };
};

type TextComponentSelector = {
    selector: string;
};

type TextComponentKeybind = {
    keybind: string;
};

type TextComponentNbt = {
    nbt?: string;
    interpret?: boolean;
    block?: string;
    entity?: string;
    storage?: string;
    separator?: TextComponent;
};

type TextComponentObject = {
    color?: string;
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    insertion?: string;
    extra?: TextComponent[];
    clickEvent?: {
        action: "open_url" | "open_file" | "run_command" | "suggest_command" | "change_page";
        value: string;
    };
    hoverEvent?: {
        action: "show_text" | "show_item" | "show_entity";
        value:
            | string
            | TextComponent
            | {
                  name: string;
                  type: string;
                  id: string;
              };
    };
} & (
    | TextComponentPlainText
    | TextComponentTranslate
    | TextComponentScore
    | TextComponentSelector
    | TextComponentKeybind
    | TextComponentNbt
);
