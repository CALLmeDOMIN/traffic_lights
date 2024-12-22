import { type Command } from "../types/command";

export class SimulationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SimulationError";
  }
}

export class InvalidCommandError extends SimulationError {
  constructor(command: Command) {
    super(`Invalid command type: ${command.type}`);
    this.name = "InvalidCommandError";
  }
}
