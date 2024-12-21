import { exit } from "process";

import { Intersection } from "./core/intersection.js";
import { InputParser } from "./io/inputParser.js";
import { SimulationEngine } from "./simulation/simulationEngine.js";

const [, , inputFile, outputFile] = process.argv;

if (!inputFile || !outputFile) {
  console.error("Usage: node src/index.js <inputFile> <outputFile>");
  exit(1);
}

const intersection = new Intersection();
const parser = new InputParser(inputFile);
const commands = parser.parse();

if (!commands) {
  console.error("Error parsing commands");
  exit(1);
}

const simulation = new SimulationEngine(intersection, commands);
simulation.run(outputFile);
