import { describe, it, expect } from "vitest";
import { Logger } from "@/lib/minecraft/core/engine/migrations/logger";
import type { DatapackInfo, LogDifference } from "@/lib/minecraft/core/engine/migrations/types";

describe("Logger System", () => {
    const mockDatapackInfo: DatapackInfo = {
        name: "Test Datapack",
        description: "A test datapack",
        namespaces: ["minecraft", "test"]
    };

    describe("Logger initialization", () => {
        it("should create a new logger with initial state", () => {
            const logger = new Logger("test-id", "2024-03-20", 12, false, mockDatapackInfo);
            const logs = logger.getLogs();

            expect(logs).toMatchObject({
                id: "test-id",
                date: "2024-03-20",
                version: 12,
                isModded: false,
                datapack: mockDatapackInfo,
                isMinified: true,
                logs: []
            });
        });

        it("should initialize from existing log", () => {
            const existingLog = {
                id: "existing-id",
                date: "2024-03-19",
                version: 11,
                isModded: true,
                datapack: mockDatapackInfo,
                isMinified: false,
                logs: []
            };

            const logger = new Logger("new-id", "2024-03-20", 12, false, mockDatapackInfo, existingLog);
            expect(logger.getLogs()).toEqual(existingLog);
        });
    });

    describe("Logging differences", () => {
        it("should log a new difference", () => {
            const logger = new Logger("test-id", "2024-03-20", 12, false, mockDatapackInfo);
            const difference: LogDifference = {
                type: "set",
                path: "effects.strength.level",
                value: 2,
                origin_value: 1
            };

            logger.logDifference("minecraft:strength", "enchantment", difference);

            const logs = logger.getLogs();
            expect(logs.logs).toHaveLength(1);
            expect(logs.logs[0]).toMatchObject({
                identifier: "minecraft:strength",
                registry: "enchantment",
                type: "updated",
                differences: [difference]
            });
        });

        it("should update existing difference", () => {
            const logger = new Logger("test-id", "2024-03-20", 12, false, mockDatapackInfo);
            const initialDifference: LogDifference = {
                type: "set",
                path: "effects.strength.level",
                value: 2,
                origin_value: 1
            };
            const updatedDifference: LogDifference = {
                type: "set",
                path: "effects.strength.level",
                value: 3,
                origin_value: 1
            };

            logger.logDifference("minecraft:strength", "enchantment", initialDifference);
            logger.logDifference("minecraft:strength", "enchantment", updatedDifference);

            const logs = logger.getLogs();
            const fileLog = logs.logs[0];
            expect(fileLog.type).toBe("updated");
            if (fileLog.type === "updated") {
                expect(fileLog.differences).toHaveLength(1);
                expect(fileLog.differences[0]).toEqual(updatedDifference);
            }
        });

        it("should remove difference when type is remove", () => {
            const logger = new Logger("test-id", "2024-03-20", 12, false, mockDatapackInfo);
            const initialDifference: LogDifference = {
                type: "set",
                path: "effects.strength.level",
                value: 2,
                origin_value: 1
            };
            const removeDifference: LogDifference = {
                type: "remove",
                path: "effects.strength.level"
            };

            logger.logDifference("minecraft:strength", "enchantment", initialDifference);
            logger.logDifference("minecraft:strength", "enchantment", removeDifference);

            const logs = logger.getLogs();
            const fileLog = logs.logs[0];
            expect(fileLog.type).toBe("updated");
            if (fileLog.type === "updated") {
                expect(fileLog.differences).toHaveLength(0);
            }
        });
    });

    describe("Logging file operations", () => {
        it("should log file deletion", () => {
            const logger = new Logger("test-id", "2024-03-20", 12, false, mockDatapackInfo);

            logger.logDeletion("minecraft:strength", "enchantment");

            const logs = logger.getLogs();
            expect(logs.logs).toHaveLength(1);
            expect(logs.logs[0]).toMatchObject({
                identifier: "minecraft:strength",
                registry: "enchantment",
                type: "deleted"
            });
        });

        it("should log file addition", () => {
            const logger = new Logger("test-id", "2024-03-20", 12, false, mockDatapackInfo);
            const newValue = {
                id: "minecraft:strength",
                max_level: 5,
                effects: { strength: { level: 1 } }
            };

            logger.logAddition("minecraft:strength", "enchantment", newValue);

            const logs = logger.getLogs();
            expect(logs.logs).toHaveLength(1);
            expect(logs.logs[0]).toMatchObject({
                identifier: "minecraft:strength",
                registry: "enchantment",
                type: "added",
                value: newValue
            });
        });

        it("should update existing file log when status changes", () => {
            const logger = new Logger("test-id", "2024-03-20", 12, false, mockDatapackInfo);

            // D'abord on ajoute un fichier
            logger.logAddition("minecraft:strength", "enchantment", { id: "minecraft:strength" });

            // Puis on le marque comme supprimé
            logger.logDeletion("minecraft:strength", "enchantment");

            const logs = logger.getLogs();
            expect(logs.logs).toHaveLength(1);
            expect(logs.logs[0]).toMatchObject({
                identifier: "minecraft:strength",
                registry: "enchantment",
                type: "deleted"
            });
        });
    });
});
