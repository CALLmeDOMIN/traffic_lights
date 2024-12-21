import { writeFileSync } from "fs";
import { type OutputData } from "../types/jsonData.js";

export class OutputFormatter {
  writeOutput(output: OutputData, filename: string): void {
    writeFileSync(filename, JSON.stringify(output, null, 2));
  }
}
