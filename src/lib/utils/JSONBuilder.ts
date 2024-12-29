export class JSONBuilder {
    private buffer = "";

    constructor(content?: string) {
        if (content) {
            this.buffer = content;
        }
    }

    /**
     * Interface used for testing, do not use it in production
     */
    public asTestable(): TestableJSONBuilder {
        return this as unknown as TestableJSONBuilder;
    }

    /**
     * Appends partial JSON content to the buffer.
     * Allows building JSON objects incrementally.
     *
     * @example
     * builder.append('{name:')
     *        .append('"John"')
     *        .append(', age:')
     *        .append('30}');
     * // Result after build(): { "name": "John", "age": 30 }
     */
    public append(content: string): JSONBuilder {
        this.buffer += content;
        return this;
    }

    /**
     * Validates if a string is valid JSON.
     * Checks if the input can be parsed as a JSON object.
     *
     * @example
     * isValidJSON('{"name": "John"}') // returns true
     * isValidJSON('{name: "John"}')   // returns false (missing quotes)
     * isValidJSON('"hello"')          // returns false (not an object)
     */
    private isValidJSON(input: string): boolean {
        try {
            const json = JSON.parse(input);
            return json && typeof json === "object";
        } catch {
            return false;
        }
    }

    /**
     * Builds the final JSON object by completing any missing parts.
     * First tries to parse as valid JSON, then attempts normalization if needed.
     *
     * @example
     * // Valid JSON input
     * build('{"name": "John"}') // returns { name: "John" }
     *
     * // Incomplete JSON input
     * build('{name: "John"')   // returns { name: "John" }
     * build('{name:')          // returns { name: null }
     */
    public build<T>(): T {
        if (this.isValidJSON(this.buffer)) {
            return JSON.parse(this.buffer) as T;
        }
        if (this.isObject(this.buffer)) {
            return JSON.parse(this.normalizeObject(this.buffer)) as T;
        }
        if (this.isArray(this.buffer)) {
            return JSON.parse(this.normalizeArray(this.buffer)) as T;
        }
        return {} as T;
    }

    /**
     * Checks if a character is an unescaped quote.
     * Used for string boundary detection while parsing.
     *
     * @example
     * isUnescapedQuote('"', 'a')  // returns true
     * isUnescapedQuote('"', '\\') // returns false (escaped quote)
     */
    private isUnescapedQuote(char: string, lastChar: string): boolean {
        return char === '"' && lastChar !== "\\";
    }

    /**
     * Updates the nesting depth based on brackets and braces.
     * Used to track nested structures while parsing.
     *
     * @example
     * updateDepth("{", 0)  // returns 1  (entering object)
     * updateDepth("}", 1)  // returns 0  (exiting object)
     * updateDepth("[", 0)  // returns 1  (entering array)
     * updateDepth("]", 1)  // returns 0  (exiting array)
     */
    private updateDepth(char: string, currentDepth: number): number {
        if (char === "{" || char === "[") return currentDepth + 1;
        if (char === "}" || char === "]") return currentDepth - 1;
        return currentDepth;
    }

    /**
     * Checks if a character is a valid part separator.
     * A valid separator is a comma that's not inside a string or nested structure.
     *
     * @example
     * isPartSeparator(",", 0, false) // returns true  (top-level comma)
     * isPartSeparator(",", 1, false) // returns false (nested comma)
     * isPartSeparator(",", 0, true)  // returns false (comma in string)
     */
    private isPartSeparator(char: string, depth: number, inString: boolean): boolean {
        return char === "," && depth === 0 && !inString;
    }

    /**
     * Adds a part to the parts array if it's not empty.
     * Trims whitespace before adding.
     *
     * @example
     * parts = []
     * addPartIfNotEmpty(parts, "  test  ") // parts = ["test"]
     * addPartIfNotEmpty(parts, "")         // parts unchanged
     */
    private addPartIfNotEmpty(parts: string[], part: string): void {
        const trimmed = part.trim();
        if (trimmed) {
            parts.push(trimmed);
        }
    }

    /**
     * Splits JSON content into key-value pairs while respecting nested structures.
     * Handles nested objects, arrays, and quoted strings correctly.
     *
     * @example
     * Input: 'name: "John", age: 30'
     * Output: ['name: "John"', 'age: 30']
     *
     * Input: 'user: {name: "John"}, active: true'
     * Output: ['user: {name: "John"}', 'active: true']
     */
    private splitIntoParts(json: string): string[] {
        const parts: string[] = [];
        let currentPart = "";
        let depth = 0;
        let inString = false;
        let lastChar = "";

        for (const char of json) {
            if (this.isUnescapedQuote(char, lastChar)) {
                inString = !inString;
            }

            if (!inString) {
                depth = this.updateDepth(char, depth);
            }

            if (this.isPartSeparator(char, depth, inString)) {
                this.addPartIfNotEmpty(parts, currentPart);
                currentPart = "";
            } else {
                currentPart += char;
            }

            lastChar = char;
        }

        this.addPartIfNotEmpty(parts, currentPart);
        return parts;
    }

    /**
     * Completes a key-value pair into valid JSON format.
     * Handles missing values, adds quotes to keys, and normalizes values.
     *
     * @example
     * completePart('name: "John"')  // returns '"name": "John"'
     * completePart('age: 30')       // returns '"age": 30'
     * completePart('active')        // returns '"active": null'
     */
    private completePart(input: string): string {
        const part = input.trim();

        // Gestion des parties vides
        if (!part) return "";

        const colonIndex = part.indexOf(":");

        // Si pas de séparateur ":", on ajoute une valeur null
        if (colonIndex === -1) {
            const key = this.extractKey(part);
            return `"${key}": null`;
        }

        const key = this.extractKey(part.slice(0, colonIndex));
        const value = this.normalizeValue(part.slice(colonIndex + 1).trim());

        return `"${key}": ${value}`;
    }

    /**
     * Normalizes a value while preserving its original format.
     * Handles objects, arrays, strings, and special values.
     * Also handles incomplete Unicode sequences.
     *
     * @example
     * normalizeValue('undefined')      // returns "null"
     * normalizeValue('"hello')         // returns '"hello"'
     * normalizeValue('"\\u"')         // returns 'null'
     * normalizeValue('"\\u0041"')     // returns '"\\u0041"'
     */
    private normalizeValue(input: string): string {
        if (this.isEmptyOrUndefined(input)) return "null";
        if (this.hasIncompleteUnicode(input)) return "null";
        if (this.isObject(input)) return this.completeObject(input);
        if (this.isArray(input)) return this.completeArray(input);
        if (this.isUnclosedString(input)) return this.closeString(input);
        return input;
    }

    /**
     * Checks if a string contains incomplete Unicode escape sequences.
     * A complete Unicode sequence should be in the format \uXXXX where X are hex digits.
     *
     * @example
     * hasIncompleteUnicode('"\\u"')      // returns true
     * hasIncompleteUnicode('"\\u00"')    // returns true
     * hasIncompleteUnicode('"\\u0041"')  // returns false
     */
    private hasIncompleteUnicode(value: string): boolean {
        const unicodePattern = /\\u([0-9A-Fa-f]{4})/g;
        const incompleteUnicodePattern = /\\u(?![0-9A-Fa-f]{4})/;

        // Si la valeur contient \u mais pas suivi de 4 caractères hexadécimaux
        if (incompleteUnicodePattern.test(value)) {
            return true;
        }

        // Vérifie que toutes les séquences Unicode sont complètes
        const matches = value.match(unicodePattern) || [];
        const allUnicodeSequences = value.match(/\\u/g) || [];

        return matches.length !== allUnicodeSequences.length;
    }

    /**
     * Checks if a value is empty or undefined.
     * Used to convert invalid or missing values to null.
     *
     * @example
     * isEmptyOrUndefined("")         // returns true
     * isEmptyOrUndefined("undefined") // returns true
     * isEmptyOrUndefined("value")    // returns false
     */
    private isEmptyOrUndefined(value: string): boolean {
        return value === "undefined" || value === "";
    }

    /**
     * Checks if a value represents an object by looking for opening brace.
     * Trims whitespace before checking.
     *
     * @example
     * isObject("{name: 'John'}")  // returns true
     * isObject("  {test: 123}")   // returns true
     * isObject("[1,2,3]")         // returns false
     */
    private isObject(value: string): boolean {
        return value.trim().startsWith("{");
    }

    /**
     * Checks if a value represents an array by looking for opening bracket.
     * Trims whitespace before checking.
     *
     * @example
     * isArray("[1,2,3]")          // returns true
     * isArray("  [1,2,3]")        // returns true
     * isArray("{name: 'John'}")   // returns false
     */
    private isArray(value: string): boolean {
        return value.trim().startsWith("[");
    }

    /**
     * Checks if a string is unclosed (starts with quote but doesn't end with unescaped quote).
     * Handles escaped quotes and multiple backslashes properly.
     */
    private isUnclosedString(value: string): boolean {
        if (!value.startsWith('"')) return false;

        let isEscaped = false;
        for (let i = 1; i < value.length; i++) {
            if (value[i] === "\\") {
                isEscaped = !isEscaped;
                continue;
            }

            if (value[i] === '"' && !isEscaped && i === value.length - 1) {
                return false;
            }

            if (value[i] !== "\\") {
                isEscaped = false;
            }
        }

        return true;
    }

    /**
     * Closes an unclosed string by adding a quote at the end.
     * Used to complete partial string values.
     *
     * @example
     * closeString('"hello')  // returns '"hello"'
     */
    private closeString(value: string): string {
        return `${value}"`;
    }

    /**
     * Normalizes an object into valid JSON with quoted keys.
     * Handles nested objects and arrays recursively.
     *
     * @example
     * Input:  {name: "John", data: {age: 30}}
     * Output: {"name": "John", "data": {"age": 30}}
     *
     * Input:  {users: [{name: "John"}, {name: "Jane"}]}
     * Output: {"users": [{"name": "John"}, {"name": "Jane"}]}
     */
    private normalizeObject(input: string): string {
        const content = input
            .replace(/^{/, "") // Enlève l'accolade ouvrante
            .replace(/}$/, "") // Enlève l'accolade fermante
            .trim();

        const parts = this.splitIntoParts(content);
        const normalizedParts = parts.map((part) => {
            const colonIndex = part.indexOf(":");
            if (colonIndex === -1) return this.completePart(part);

            const key = this.extractKey(part.slice(0, colonIndex));
            const value = part.slice(colonIndex + 1).trim();

            if (this.isArray(value)) {
                return `"${key}": ${this.normalizeArray(value)}`;
            }
            if (this.isObject(value)) {
                return `"${key}": ${this.normalizeObject(value)}`;
            }
            return this.completePart(part);
        });
        return `{${normalizedParts.join(",")}}`;
    }

    /**
     * Normalise un tableau en JSON valide
     */
    private normalizeArray(input: string): string {
        const content = this.extractArrayContent(input);
        const parts = this.splitIntoParts(content);
        const normalizedParts = parts.map((part) => {
            const trimmed = part.trim();
            if (this.isObject(trimmed)) {
                return this.normalizeObject(trimmed);
            }
            return trimmed;
        });
        return `[${normalizedParts.join(",")}]`;
    }

    /**
     * Completes an object by adding a closing brace if missing.
     * Used to ensure valid JSON format.
     *
     * @example
     * completeObject('{name: "John"}')  // returns '{name: "John"}'
     * completeObject('{name:')          // returns '{name: null}'
     */
    private completeObject(input: string): string {
        return input.endsWith("}") ? input : `${input}}`;
    }

    /**
     * Wraps content in array brackets.
     * Used to create array structure around normalized content.
     */
    private completeArray(input: string): string {
        const content = this.extractArrayContent(input);
        return this.wrapArray(this.normalizeArrayContent(content));
    }

    /**
     * Wraps content in array brackets.
     * Used to create array structure around normalized content.
     *
     * @example
     * wrapArray('1,2,3')    // returns '[1,2,3]'
     * wrapArray('')         // returns '[]'
     */
    private wrapArray(content: string): string {
        return `[${content}]`;
    }

    /**
     * Extracts and normalizes array content.
     * Removes outer brackets and handles unclosed arrays.
     *
     * @example
     * extractArrayContent('[1,2,3]')  // returns '1,2,3'
     * extractArrayContent('[1,2')     // returns '1,2'
     * extractArrayContent('[]')       // returns ''
     */
    private extractArrayContent(value: string): string {
        const result = value.endsWith("]") ? value : `${value}]`;
        return result.slice(1, -1);
    }

    /**
     * Extracts and cleans a key by removing quotes and trimming whitespace.
     * Handles both single and double quotes.
     *
     * @example
     * extractKey('"name"')     // returns 'name'
     * extractKey("'age'")      // returns 'age'
     * extractKey('  active ')  // returns 'active'
     */
    private extractKey(key: string): string {
        return key.trim().replace(/['"]/g, "");
    }

    /**
     * Normalizes array content by handling each item appropriately.
     * Preserves the format of objects within the array.
     *
     * @example
     * Input: '1, 2, {name: "John"}'
     * Output: '1,2,{name: "John"}'
     */
    private normalizeArrayContent(content: string): string {
        const parts = this.splitIntoParts(content);
        return parts.map((part) => this.normalizeArrayItem(part)).join(",");
    }

    /**
     * Normalizes a single array item based on its type.
     * Objects are completed while preserving their format.
     *
     * @example
     * normalizeArrayItem('42')              // returns '42'
     * normalizeArrayItem('{name: "John"')   // returns '{name: "John"}'
     * normalizeArrayItem('  true  ')        // returns 'true'
     */
    private normalizeArrayItem(item: string): string {
        const trimmed = item.trim();
        if (this.isObject(trimmed)) {
            return this.completeObject(trimmed);
        }
        return trimmed;
    }
}

/**
 * Interface used for testing, do not use it in production
 */
export interface TestableJSONBuilder {
    splitIntoParts(json: string): string[];
    completePart(input: string): string;
    normalizeValue(input: string): string;
    isObject(value: string): boolean;
    normalizeObject(input: string): string;
    isValidJSON(input: string): boolean;
    extractKey(key: string): string;
    isUnescapedQuote(char: string, lastChar: string): boolean;
    updateDepth(char: string, currentDepth: number): number;
    isPartSeparator(char: string, depth: number, inString: boolean): boolean;
    addPartIfNotEmpty(parts: string[], part: string): void;
    isEmptyOrUndefined(value: string): boolean;
    isArray(value: string): boolean;
    isUnclosedString(value: string): boolean;
    extractArrayContent(value: string): string;
    normalizeArray(input: string): string;
    normalizeArrayContent(content: string): string;
    normalizeArrayItem(item: string): string;
    wrapArray(content: string): string;
    completeObject(input: string): string;
}
