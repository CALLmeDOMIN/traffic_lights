import { Intersection } from "../../core/intersection";
import { SimulationEngine } from "../simulationEngine";
import { type Command } from "../../types/command";

type InvalidCommand = Omit<Command, "type"> & { type: string };

describe("SimulationEngine error handling", () => {
  let engine: SimulationEngine;

  beforeEach(() => {
    engine = new SimulationEngine(
      new Intersection(),
      { commands: [] },
      "fixed",
    );
  });

  test("should handle invalid commands", () => {
    const invalidCommand: InvalidCommand = { type: "invalidCommand" };
    engine.data.commands = [invalidCommand as Command];

    expect(() => {
      engine.run("output.json");
    }).not.toThrow();
  });

  test("should continue processing after invalid command", () => {
    const invalidCommand: InvalidCommand = { type: "invalidCommand" };
    const validCommand: Command = {
      type: "addVehicle",
      vehicleId: "car1",
      startRoad: "north",
      endRoad: "south",
    };

    engine.data.commands = [invalidCommand as Command, validCommand];

    engine.run("output.json");
    expect(engine.getStepStatuses().length).toBe(0);
  });
});
