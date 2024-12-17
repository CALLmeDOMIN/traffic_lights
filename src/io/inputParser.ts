import { readFileSync } from "fs";
import { Command } from "./commandProcessor.js";

export interface JsonData {
    commands: Command[];
}

export class InputParser {
    jsonFile: string;

    constructor(jsonFile: string) {
        this.jsonFile = jsonFile;
    }

    parse(): JsonData | null {
        try {
            const data = readFileSync(this.jsonFile, "utf8");
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading file: ${error}`);
            return null;
        }
    }
}
