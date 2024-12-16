export type ToggleField = {
    type: "get_toggle_field";
    group: string;
};

export type ToggleName = {
    type: "get_toggle_name";
    group: string;
};

export type Field = string | ToggleField | ToggleName;

/**
 * Parcours l'objet en paramètre et remplace string par Field
 */
export type Unresolved<T> = {
    [K in keyof T]: T[K] extends string ? Field : Unresolved<T[K]>;
};

export type Resolved<T> = {
    [K in keyof T]: T[K] extends Field ? string : Resolved<T[K]>;
};
