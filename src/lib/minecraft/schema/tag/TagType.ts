type TagType = {
    replace?: boolean;
    values: (string | OptionalTag)[];
};

type OptionalTag = {
    required: boolean;
    id: string;
};
