import { describe, expect, it } from "vitest";
import { searchRelevantElements } from "@/lib/searchElements";
import { TEMPLATE_ENCHANTMENT } from "test/template/neoenchant";

describe("searchRelevantElements", () => {
    it("Get fury enchantment with common prompt", () => {
        const results = searchRelevantElements(TEMPLATE_ENCHANTMENT, "Hello, i want get the fury enchantment");
        expect(results.length).toBeGreaterThan(0);
        expect(results.map((element) => element.identifier.toString())).toContain("enchantplus:armor/fury");
    });

    it("Get accuracy shot enchantment with common prompt", () => {
        const results = searchRelevantElements(
            TEMPLATE_ENCHANTMENT,
            "I want modify the accuracy shot enchantment and set the max level to 2"
        );
        expect(results.length).toBeGreaterThan(0);
        expect(results.map((element) => element.identifier.toString())).toContain("enchantplus:bow/accuracy_shot");
    });

    it("Get fury enchantment with common prompt in french", () => {
        const results = searchRelevantElements(TEMPLATE_ENCHANTMENT, "Bonjour, je voudrais obtenir l'enchantement fury");
        expect(results.length).toBeGreaterThan(0);
        expect(results.map((element) => element.identifier.toString())).toContain("enchantplus:armor/fury");
    });

    it("Get accuracy shot enchantment with common prompt in french", () => {
        const results = searchRelevantElements(
            TEMPLATE_ENCHANTMENT,
            "Je veux modifier l'enchantement accuracy shot et mettre le niveau maximum à 2"
        );
        expect(results.length).toBeGreaterThan(0);
        expect(results.map((element) => element.identifier.toString())).toContain("enchantplus:bow/accuracy_shot");
    });

    it("Get accuracy shot enchantment with common prompt in french", () => {
        const results = searchRelevantElements(
            TEMPLATE_ENCHANTMENT,
            "Je veux modifier l'enchantement accuracy shot et mettre le niveau maximum à 2"
        );
        expect(results.length).toBeGreaterThan(0);
        expect(results.map((element) => element.identifier.toString())).toContain("enchantplus:bow/accuracy_shot");
    });

    it("Another test for search element in french", () => {
        const results = searchRelevantElements(TEMPLATE_ENCHANTMENT, "Met l'enchantment fury au niveau 2");
        expect(results.length).toBeGreaterThan(0);
        expect(
            results.map((element) => element.identifier.toString()),
            `The result should contain the fury enchantment, actually it contains: ${results.map((element) => element.identifier.toString())}`
        ).toContain("enchantplus:armor/fury");
    });

    it("Get multiple element by search terms", () => {
        const results = searchRelevantElements(TEMPLATE_ENCHANTMENT, "I want get the storm arrow enchantment and the lifeplus enchantment");
        expect(results.map((element) => element.identifier.toString())).toEqual(
            expect.arrayContaining(["enchantplus:bow/storm_arrow", "enchantplus:armor/lifeplus"])
        );
    });
});
