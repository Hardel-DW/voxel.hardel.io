import { describe, it, expect } from "vitest";
import toRoman from "@/lib/minecraft/utils";

describe("toRoman", () => {
    // Test des chiffres de 1 à 10
    it("should convert numbers 1-10 to roman numerals", () => {
        expect(toRoman(1)).toBe("I");
        expect(toRoman(2)).toBe("II");
        expect(toRoman(3)).toBe("III");
        expect(toRoman(4)).toBe("IV");
        expect(toRoman(5)).toBe("V");
        expect(toRoman(6)).toBe("VI");
        expect(toRoman(7)).toBe("VII");
        expect(toRoman(8)).toBe("VIII");
        expect(toRoman(9)).toBe("IX");
        expect(toRoman(10)).toBe("X");
    });

    // Test des chiffres clés
    it("should convert key numbers to roman numerals", () => {
        expect(toRoman(40)).toBe("XL");
        expect(toRoman(50)).toBe("L");
        expect(toRoman(90)).toBe("XC");
        expect(toRoman(100)).toBe("C");
        expect(toRoman(400)).toBe("CD");
        expect(toRoman(500)).toBe("D");
        expect(toRoman(900)).toBe("CM");
        expect(toRoman(1000)).toBe("M");
    });

    // Test de quelques nombres composés
    it("should convert compound numbers to roman numerals", () => {
        expect(toRoman(14)).toBe("XIV");
        expect(toRoman(49)).toBe("XLIX");
        expect(toRoman(99)).toBe("XCIX");
        expect(toRoman(444)).toBe("CDXLIV");
        expect(toRoman(999)).toBe("CMXCIX");
    });

    // Test des grands nombres
    it("should convert large numbers to roman numerals", () => {
        expect(toRoman(2023)).toBe("MMXXIII");
        expect(toRoman(3999)).toBe("MMMCMXCIX");
    });
});
