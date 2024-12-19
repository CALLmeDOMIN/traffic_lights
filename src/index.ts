import { exit } from "process";

import { Intersection } from "./core/intersection.js";
import { InputParser } from "./io/inputParser.js";
import { SimulationEngine } from "./simulation/simulationEngine.js";

const intersection = new Intersection();

const parser = new InputParser("input.json");
const commands = parser.parse();

if (!commands) {
  console.error("Error parsing commands");
  exit(1);
}

const simulation = new SimulationEngine(intersection, commands);

simulation.run();
