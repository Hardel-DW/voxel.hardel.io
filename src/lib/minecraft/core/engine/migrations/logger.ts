import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser";
import type { Action, ActionValue } from "@/lib/minecraft/core/engine/actions";
import { createDifferenceFromAction } from "@/lib/minecraft/core/engine/migrations/logValidation";
import type { DatapackInfo, FileLog, FileLogUpdated, Log, LogDifference, LogValue } from "@/lib/minecraft/core/engine/migrations/types";

export class Logger {
    private readonly log: Log;

    public static fromLog(log: Log): Logger {
        return new Logger(log.id, log.date, log.version, log.isModded, log.datapack, log);
    }

    constructor(id: string, date: string, version: number, isModded: boolean, datapack: DatapackInfo, existingLog?: Log) {
        if (existingLog) {
            this.log = existingLog;
        } else {
            this.log = {
                id,
                date,
                version,
                isModded,
                datapack,
                isMinified: true,
                logs: []
            };
        }
    }

    // Trouve ou crée un FileLog pour un identifiant donné
    private findOrCreateFileLog(identifier: string, registry: string): FileLog {
        let fileLog = this.log.logs.find((log) => log.identifier === identifier);

        if (!fileLog) {
            fileLog = {
                identifier,
                registry,
                type: "updated",
                differences: []
            };
            this.log.logs.push(fileLog);
        }

        return fileLog;
    }

    // Ajoute ou met à jour une différence
    public logDifference(identifier: string, registry: string, difference: LogDifference | LogDifference[]) {
        const fileLog = this.findOrCreateFileLog(identifier, registry);

        if (fileLog.type !== "updated") {
            return;
        }

        // Si c'est un tableau de différences, on les traite une par une
        if (Array.isArray(difference)) {
            for (const diff of difference) {
                this.handleSingleDifference(fileLog as FileLogUpdated, diff);
            }
        } else {
            this.handleSingleDifference(fileLog as FileLogUpdated, difference);
        }
    }

    private handleSingleDifference(fileLog: FileLogUpdated, difference: LogDifference) {
        const existingDiffIndex = fileLog.differences.findIndex((diff: LogDifference) => diff.path === difference.path);

        if (existingDiffIndex !== -1) {
            if (difference.type === "remove") {
                fileLog.differences.splice(existingDiffIndex, 1);
            } else {
                fileLog.differences[existingDiffIndex] = difference;
            }
        } else if (difference.type !== "remove") {
            fileLog.differences.push(difference);
        }
    }

    // Marque un fichier comme supprimé
    public logDeletion(identifier: string, registry: string) {
        const index = this.log.logs.findIndex((log) => log.identifier === identifier);

        if (index !== -1) {
            this.log.logs[index] = {
                identifier,
                registry,
                type: "deleted"
            };
        } else {
            this.log.logs.push({
                identifier,
                registry,
                type: "deleted"
            });
        }
    }

    // Marque un fichier comme ajouté
    public logAddition(identifier: string, registry: string, value: LogValue) {
        const index = this.log.logs.findIndex((log) => log.identifier === identifier);

        if (index !== -1) {
            this.log.logs[index] = {
                identifier,
                registry,
                type: "added",
                value
            };
        } else {
            this.log.logs.push({
                identifier,
                registry,
                type: "added",
                value
            });
        }
    }

    // Récupère les logs
    public getLogs(): Log {
        return this.log;
    }

    // Ajouter une nouvelle méthode pour récupérer la valeur originale
    public getOriginalValue(identifier: string, field: string): LogValue | undefined {
        const fileLog = this.log.logs.find((log) => log.identifier === identifier);
        if (fileLog && fileLog.type === "updated") {
            const difference = fileLog.differences.find((diff) => diff.path === field);
            return difference?.type === "set" ? difference.origin_value : undefined;
        }
        return undefined;
    }

    public handleActionDifference<T extends keyof Analysers>(
        action: Action,
        element: GetAnalyserVoxel<T>,
        version: number,
        tool: T,
        value?: ActionValue
    ): void {
        const difference = createDifferenceFromAction(action, element, version, tool, this, value);
        if (difference) {
            this.logDifference(String(element.identifier), element.identifier.registry || "unknown", difference);
        }
    }
}
