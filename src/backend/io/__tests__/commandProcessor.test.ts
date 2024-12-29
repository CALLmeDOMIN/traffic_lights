import { describe, it, expect, vi, beforeEach } from "vitest";

import { CommandProcessor } from "../commandProcessor";
import { TrafficController } from "@/backend/controllers/trafficController";
import { IntersectionController } from "@/backend/controllers/intersectionController";
import { Vehicle } from "@/backend/core/vehicle";

import { type Intersection } from "../../core/intersection";

describe("CommandProcessor", () => {
  let mockIntersection: Intersection;
  let processor: CommandProcessor;
  let mockTrafficController: TrafficController;
  let mockIntersectionController: {
    handleVehicleMovement: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockIntersection = {
      roads: {},
    } as unknown as Intersection;

    mockTrafficController = {
      handleTrafficLightChange: vi.fn(),
    } as unknown as TrafficController;

    mockIntersectionController = {
      handleVehicleMovement: vi
        .fn()
        .mockReturnValue([
          new Vehicle("car1", "north", "south"),
          new Vehicle("car2", "east", "west"),
        ]),
    };

    vi.spyOn(
      IntersectionController.prototype,
      "handleVehicleMovement",
    ).mockImplementation(mockIntersectionController.handleVehicleMovement);

    processor = new CommandProcessor(mockTrafficController);
  });

  it("should process complete step with vehicle movement and light changes", () => {
    const result = processor.handleStep(mockIntersection);

    expect(
      mockIntersectionController.handleVehicleMovement,
    ).toHaveBeenCalledWith(mockIntersection);
    expect(mockTrafficController.handleTrafficLightChange).toHaveBeenCalledWith(
      mockIntersection,
    );
    expect(result.leftVehicles).toEqual(["car1", "car2"]);
  });

  it("should process step and return moved vehicles", () => {
    const result = processor.handleStep(mockIntersection);

    expect(
      mockIntersectionController.handleVehicleMovement,
    ).toHaveBeenCalledWith(mockIntersection);
    expect(mockTrafficController.handleTrafficLightChange).toHaveBeenCalledWith(
      mockIntersection,
    );
    expect(result.leftVehicles).toEqual(["car1", "car2"]);
  });

  it("should handle step with no vehicles", () => {
    mockIntersectionController.handleVehicleMovement.mockReturnValue([]);

    const result = processor.handleStep(mockIntersection);

    expect(result.leftVehicles).toEqual([]);
  });
});
