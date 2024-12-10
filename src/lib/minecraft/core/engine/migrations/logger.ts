import type { DatapackInfo, FileLog, Log, LogDifference, LogValue } from "./types";

export class Logger {
    private readonly log: Log;

    constructor(version: number, isModded: boolean, datapack: DatapackInfo, existingLog?: Log) {
        if (existingLog) {
            this.log = existingLog;
        } else {
            this.log = {
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
    public logDifference(identifier: string, registry: string, difference: LogDifference) {
        const fileLog = this.findOrCreateFileLog(identifier, registry);

        if (fileLog.type !== "updated") {
            return;
        }

        const existingDiffIndex = fileLog.differences.findIndex((diff) => diff.path === difference.path);

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
}
