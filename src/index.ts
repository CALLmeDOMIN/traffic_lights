import { exit } from "process";
import { Intersection } from "./core/intersection.js";
import { InputParser } from "./io/inputParser.js";

const io = new InputParser("input.json");

const input = io.parse();
if (!input) {
    console.error("Error parsing input file");
    exit(1);
}

const intersection = new Intersection();
io.processCommands(input.commands, intersection);

intersection.display();
