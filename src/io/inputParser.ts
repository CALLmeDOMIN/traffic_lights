import { readFileSync } from "fs";
import { type JsonData } from "../types/jsonData.js";

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
