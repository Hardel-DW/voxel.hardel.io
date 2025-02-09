import { JSONBuilder } from "../src/lib/utils/json";
import { expect, describe, it } from "vitest";

describe("JSONBuilder", () => {
    describe("append", () => {
        it("should accumulate content", () => {
            const builder = new JSONBuilder();
            builder.append("{name:");
            builder.append('"John"');
            expect(builder.build()).toEqual({ name: "John" });
        });

        it("should handle empty content", () => {
            const builder = new JSONBuilder();
            builder.append("");
            expect(builder.build()).toEqual({});
        });

        it("should return builder instance for chaining", () => {
            const builder = new JSONBuilder();
            expect(builder.append("{")).toBe(builder);
        });
    });

    describe("build", () => {
        it("should return empty object on invalid JSON", () => {
            const builder = new JSONBuilder();
            expect(builder.build()).toEqual({});
        });

        it("should parse valid JSON", () => {
            const builder = new JSONBuilder();
            builder.append('{name: "John"}');
            expect(builder.build()).toEqual({ name: "John" });
        });

        it("should handle empty buffer", () => {
            const builder = new JSONBuilder();
            expect(builder.build()).toEqual({});
        });

        it("should handle deeply nested objects", () => {
            const builder = new JSONBuilder();
            builder.append('{user: {profile: {name: "John", age: 30}, settings: {theme: "dark"}}}');
            expect(builder.build()).toEqual({
                user: {
                    profile: { name: "John", age: 30 },
                    settings: { theme: "dark" }
                }
            });
        });

        it("should handle complex arrays", () => {
            const builder = new JSONBuilder();
            builder.append('{users: [{name: "John"}, {name: "Jane"}], active: true}');
            expect(builder.build()).toEqual({
                users: [{ name: "John" }, { name: "Jane" }],
                active: true
            });
        });

        it("should handle incomplete nested structures", () => {
            const builder = new JSONBuilder();
            builder.append('{data: {users: [{name: "John"}, {name:');
            expect(builder.build()).toEqual({
                data: {
                    users: [{ name: "John" }, { name: null }]
                }
            });
        });

        describe("build with escaped characters", () => {
            it("should handle escaped quotes in strings", () => {
                const builder = new JSONBuilder();
                builder.append('{text: "Hello \\"World\\""}');
                expect(builder.build()).toEqual({ text: 'Hello "World"' });
            });

            it("should handle backslashes in strings", () => {
                const builder = new JSONBuilder();
                builder.append('{path: "C:\\\\Program Files\\\\App"}');
                expect(builder.build()).toEqual({ path: "C:\\Program Files\\App" });
            });

            it("should handle unicode escape sequences", () => {
                const builder = new JSONBuilder();
                builder.append('{symbol: "\\u0041"}');
                expect(builder.build()).toEqual({ symbol: "A" });
            });

            it("should handle incomplete unicode sequences", () => {
                const builder = new JSONBuilder();
                builder.append('{symbol: "\\u"}');
                expect(builder.build()).toEqual({ symbol: null });
            });
        });

        describe("build with malformed input", () => {
            it("should handle unterminated strings", () => {
                const builder = new JSONBuilder();
                builder.append('{name: "John');
                expect(builder.build()).toEqual({ name: "John" });
            });

            it("should handle multiple unterminated strings", () => {
                const builder = new JSONBuilder();
                builder.append('{first: "John", last: "Doe}');
                expect(builder.build()).toEqual({
                    first: "John",
                    last: "Doe"
                });
            });

            it("should handle escaped characters in unterminated strings", () => {
                const builder = new JSONBuilder();
                builder.append('{text: "Hello \\"World}');
                expect(builder.build()).toEqual({ text: 'Hello "World' });
            });
        });
    });

    describe("splitIntoParts", () => {
        const builder = new JSONBuilder().asTestable();

        it("should split simple key-value pairs", () => {
            const result = builder.splitIntoParts('name: "John", age: 30');
            expect(result).toEqual(['name: "John"', "age: 30"]);
        });

        it("should handle nested objects", () => {
            const result = builder.splitIntoParts('user: {name: "John"}, age: 30');
            expect(result).toEqual(['user: {name: "John"}', "age: 30"]);
        });

        it("should handle arrays", () => {
            const result = builder.splitIntoParts('items: ["a", "b"], count: 2');
            expect(result).toEqual(['items: ["a", "b"]', "count: 2"]);
        });

        it("should handle escaped quotes", () => {
            const result = builder.splitIntoParts('name: "Jo\\"hn", age: 30');
            expect(result).toEqual(['name: "Jo\\"hn"', "age: 30"]);
        });

        it("should handle nested arrays with objects", () => {
            const result = builder.splitIntoParts("items: [{id: 1}, {id: 2}], count: 2");
            expect(result).toEqual(["items: [{id: 1}, {id: 2}]", "count: 2"]);
        });

        it("should handle empty arrays and objects", () => {
            const result = builder.splitIntoParts("empty: [], obj: {}, valid: true");
            expect(result).toEqual(["empty: []", "obj: {}", "valid: true"]);
        });
    });

    describe("completePart", () => {
        const builder = new JSONBuilder().asTestable();

        it("should complete missing value", () => {
            const result = builder.completePart("name");
            expect(result).toBe('"name": null');
        });

        it("should handle complete key-value", () => {
            const result = builder.completePart('name: "John"');
            expect(result).toBe('"name": "John"');
        });

        it("should handle empty input", () => {
            const result = builder.completePart("");
            expect(result).toBe("");
        });

        it("should handle numeric values", () => {
            const result = builder.completePart("age: 42");
            expect(result).toBe('"age": 42');
        });

        it("should handle boolean values", () => {
            const result = builder.completePart("active: true");
            expect(result).toBe('"active": true');
        });

        it("should handle nested structures", () => {
            const result = builder.completePart('user: {name: "John", active: true}');
            expect(result).toBe('"user": {name: "John", active: true}');
        });
    });

    describe("normalizeValue", () => {
        const builder = new JSONBuilder().asTestable();

        it("should handle undefined value", () => {
            const result = builder.normalizeValue("undefined");
            expect(result).toBe("null");
        });

        it("should complete unclosed string", () => {
            const result = builder.normalizeValue('"hello');
            expect(result).toBe('"hello"');
        });

        it("should complete unclosed object", () => {
            const result = builder.normalizeValue('{name: "John"');
            expect(result).toBe('{name: "John"}');
        });

        it("should handle numbers", () => {
            const result = builder.normalizeValue("42");
            expect(result).toBe("42");
        });

        it("should handle boolean values", () => {
            expect(builder.normalizeValue("true")).toBe("true");
            expect(builder.normalizeValue("false")).toBe("false");
        });

        it("should handle null value", () => {
            const result = builder.normalizeValue("null");
            expect(result).toBe("null");
        });

        it("should preserve original object format", () => {
            const result = builder.normalizeValue('{name: "John"}');
            expect(result).toBe('{name: "John"}');
        });

        it("should handle nested object normalization", () => {
            const result = builder.normalizeValue('{user: {name: "John"}}');
            expect(result).toBe('{user: {name: "John"}}');
        });

        it("should show object normalization steps", () => {
            const input = '{name: "John"';
            const result = builder.normalizeValue(input);
            expect(result).toBe('{name: "John"}');
        });

        it("should handle escaped quotes", () => {
            expect(builder.normalizeValue('"Hello \\"World\\""')).toBe('"Hello \\"World\\""');
        });

        it("should handle unclosed strings with escapes", () => {
            expect(builder.normalizeValue('"Hello \\"World')).toBe('"Hello \\"World"');
        });

        it("should handle backslashes", () => {
            expect(builder.normalizeValue('"C:\\\\Path"')).toBe('"C:\\\\Path"');
        });

        it("should handle incomplete unicode sequences", () => {
            expect(builder.normalizeValue('"\\u"')).toBe("null");
            expect(builder.normalizeValue('"\\u00"')).toBe("null");
        });

        it("should preserve valid unicode sequences", () => {
            expect(builder.normalizeValue('"\\u0041"')).toBe('"\\u0041"');
        });
    });

    describe("extractKey", () => {
        const builder = new JSONBuilder().asTestable();

        it("should remove quotes from key", () => {
            const result = builder.extractKey('"name"');
            expect(result).toBe("name");
        });

        it("should trim whitespace", () => {
            const result = builder.extractKey("  name  ");
            expect(result).toBe("name");
        });

        it("should handle single quotes", () => {
            const result = builder.extractKey("'name'");
            expect(result).toBe("name");
        });
    });

    describe("isValidJSON", () => {
        const builder = new JSONBuilder().asTestable();

        it("should validate correct JSON object with quotes", () => {
            const result = builder.isValidJSON('{"name": "John"}');
            expect(result).toBe(true);
        });

        it("should validate JSON object without quotes around property name", () => {
            const result = builder.isValidJSON('{name: "John"}');
            expect(result).toBe(false);
        });

        it("should reject non-object JSON", () => {
            const result = builder.isValidJSON('"hello"');
            expect(result).toBe(false);
        });
    });

    describe("append", () => {
        it("should handle multiple incomplete parts", () => {
            const builder = new JSONBuilder();
            builder.append("{user: {name:").append('"John"').append(", age:").append("30}}");
            expect(builder.build()).toEqual({
                user: { name: "John", age: 30 }
            });
        });

        it("should handle whitespace in chunks", () => {
            const builder = new JSONBuilder();
            builder.append("{ name :").append('  "John"  ').append("  ,  ").append("age  :  42 }");
            expect(builder.build()).toEqual({
                name: "John",
                age: 42
            });
        });
    });

    describe("isUnescapedQuote", () => {
        const builder = new JSONBuilder().asTestable();

        it("should identify unescaped quote", () => {
            const result = builder.isUnescapedQuote('"', "a");
            expect(result).toBe(true);
        });

        it("should reject escaped quote", () => {
            const result = builder.isUnescapedQuote('"', "\\");
            expect(result).toBe(false);
        });

        it("should handle non-quote character", () => {
            const result = builder.isUnescapedQuote("a", "b");
            expect(result).toBe(false);
        });
    });

    describe("updateDepth", () => {
        const builder = new JSONBuilder().asTestable();

        it("should increment depth for opening brackets", () => {
            expect(builder.updateDepth("{", 0)).toBe(1);
            expect(builder.updateDepth("[", 1)).toBe(2);
        });

        it("should decrement depth for closing brackets", () => {
            expect(builder.updateDepth("}", 2)).toBe(1);
            expect(builder.updateDepth("]", 1)).toBe(0);
        });

        it("should maintain depth for other characters", () => {
            expect(builder.updateDepth("a", 1)).toBe(1);
        });
    });

    describe("isPartSeparator", () => {
        const builder = new JSONBuilder().asTestable();

        it("should identify valid separator", () => {
            const result = builder.isPartSeparator(",", 0, false);
            expect(result).toBe(true);
        });

        it("should reject separator in string", () => {
            const result = builder.isPartSeparator(",", 0, true);
            expect(result).toBe(false);
        });

        it("should reject separator in nested structure", () => {
            const result = builder.isPartSeparator(",", 1, false);
            expect(result).toBe(false);
        });
    });

    describe("addPartIfNotEmpty", () => {
        const builder = new JSONBuilder().asTestable();

        it("should add non-empty part", () => {
            const parts: string[] = [];
            builder.addPartIfNotEmpty(parts, "test");
            expect(parts).toEqual(["test"]);
        });

        it("should skip empty part", () => {
            const parts: string[] = [];
            builder.addPartIfNotEmpty(parts, "");
            expect(parts).toEqual([]);
        });

        it("should trim and add part", () => {
            const parts: string[] = [];
            builder.addPartIfNotEmpty(parts, "  test  ");
            expect(parts).toEqual(["test"]);
        });
    });

    describe("isEmptyOrUndefined", () => {
        const builder = new JSONBuilder().asTestable();

        it("should identify undefined", () => {
            expect(builder.isEmptyOrUndefined("undefined")).toBe(true);
        });

        it("should identify empty string", () => {
            expect(builder.isEmptyOrUndefined("")).toBe(true);
        });

        it("should reject other values", () => {
            expect(builder.isEmptyOrUndefined("test")).toBe(false);
        });
    });

    describe("isObject", () => {
        const builder = new JSONBuilder().asTestable();

        it("should identify object", () => {
            expect(builder.isObject("{test: 1}")).toBe(true);
        });

        it("should reject non-object", () => {
            expect(builder.isObject("test")).toBe(false);
        });
    });

    describe("isArray", () => {
        const builder = new JSONBuilder().asTestable();

        it("should identify array", () => {
            expect(builder.isArray("[1,2]")).toBe(true);
        });

        it("should reject non-array", () => {
            expect(builder.isArray("test")).toBe(false);
        });
    });

    describe("isUnclosedString", () => {
        const builder = new JSONBuilder().asTestable();

        it("should detect simple unclosed string", () => {
            expect(builder.isUnclosedString('"hello')).toBe(true);
        });

        it("should handle properly closed string", () => {
            expect(builder.isUnclosedString('"hello"')).toBe(false);
        });

        it("should handle escaped quotes", () => {
            expect(builder.isUnclosedString('"hello \\"world"')).toBe(false);
            expect(builder.isUnclosedString('"hello \\"world')).toBe(true);
        });

        it("should handle multiple escaped characters", () => {
            expect(builder.isUnclosedString('"C:\\\\Program Files\\"')).toBe(true);
            expect(builder.isUnclosedString('"C:\\\\Program Files\\')).toBe(true);
        });

        it("should handle empty strings", () => {
            expect(builder.isUnclosedString('""')).toBe(false);
            expect(builder.isUnclosedString('"')).toBe(true);
        });
    });

    describe("extractArrayContent", () => {
        const builder = new JSONBuilder().asTestable();

        it("should extract content from complete array", () => {
            expect(builder.extractArrayContent("[1,2]")).toBe("1,2");
        });

        it("should handle unclosed array", () => {
            expect(builder.extractArrayContent("[1,2")).toBe("1,2");
        });

        it("should handle empty array", () => {
            expect(builder.extractArrayContent("[]")).toBe("");
        });
    });

    describe("normalizeObject", () => {
        const builder = new JSONBuilder().asTestable();

        it("should normalize simple object", () => {
            const result = builder.normalizeObject('{name: "John"}');
            expect(result).toBe('{"name": "John"}');
        });

        it("should handle nested object", () => {
            const result = builder.normalizeObject('{user: {name: "John"}}');
            expect(result).toBe('{"user": {"name": "John"}}');
        });

        it("should handle incomplete object", () => {
            const result = builder.normalizeObject('{name: "John"');
            expect(result).toBe('{"name": "John"}');
        });
    });

    describe("normalizeArray", () => {
        const builder = new JSONBuilder().asTestable();

        it("should normalize simple array", () => {
            const result = builder.normalizeArray("[1, 2, 3]");
            expect(result).toBe("[1,2,3]");
        });

        it("should handle array with objects", () => {
            const result = builder.normalizeArray('[{name: "John"}, {name: "Jane"}]');
            expect(result).toBe('[{"name": "John"},{"name": "Jane"}]');
        });

        it("should handle incomplete array", () => {
            const result = builder.normalizeArray("[1, 2");
            expect(result).toBe("[1,2]");
        });
    });

    describe("completeObject", () => {
        const builder = new JSONBuilder().asTestable();

        it("should complete unclosed object", () => {
            expect(builder.completeObject('{name: "John"')).toBe('{name: "John"}');
        });

        it("should preserve complete object", () => {
            expect(builder.completeObject('{name: "John"}')).toBe('{name: "John"}');
        });
    });

    describe("normalizeArrayContent", () => {
        const builder = new JSONBuilder().asTestable();

        it("should normalize simple content", () => {
            expect(builder.normalizeArrayContent("1, 2, 3")).toBe("1,2,3");
        });

        it("should handle objects in array", () => {
            expect(builder.normalizeArrayContent('{name: "John"}, {name: "Jane"}')).toBe('{name: "John"},{name: "Jane"}');
        });
    });

    describe("normalizeArrayItem", () => {
        const builder = new JSONBuilder().asTestable();

        it("should handle simple value", () => {
            expect(builder.normalizeArrayItem("42")).toBe("42");
        });

        it("should handle object", () => {
            expect(builder.normalizeArrayItem('{name: "John"')).toBe('{name: "John"}');
        });

        it("should trim whitespace", () => {
            expect(builder.normalizeArrayItem("  42  ")).toBe("42");
        });
    });

    describe("wrapArray", () => {
        const builder = new JSONBuilder().asTestable();

        it("should wrap content in brackets", () => {
            expect(builder.wrapArray("1,2,3")).toBe("[1,2,3]");
        });

        it("should handle empty content", () => {
            expect(builder.wrapArray("")).toBe("[]");
        });
    });
});
