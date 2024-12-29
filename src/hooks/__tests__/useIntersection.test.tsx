import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

import { useIntersection } from "../useIntersection";
import { Vehicle } from "@/backend/core/vehicle";
import { type UploadFileData } from "@/lib/types";

vi.mock("@/backend/core/intersection", () => {
  return {
    Intersection: vi.fn().mockImplementation(() => ({
      roads: {
        north: {
          addVehicle: vi.fn(),
        },
        south: {
          addVehicle: vi.fn(),
        },
        east: {
          addVehicle: vi.fn(),
        },
        west: {
          addVehicle: vi.fn(),
        },
      },
    })),
  };
});

vi.mock("@/backend/controllers/intersectionController", () => {
  return {
    IntersectionController: vi.fn().mockImplementation(() => ({
      handleVehicleMovement: vi.fn(() => [
        {
          vehicleId: "vehicle1",
          movement: { from: "north", to: "south" },
        },
      ]),
    })),
  };
});

vi.mock("@/backend/core/vehicle");

describe("useIntersection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize correctly", () => {
    const { result } = renderHook(() => useIntersection());

    expect(result.current.intersection).toHaveProperty("roads");
    expect(result.current.intersection.roads).toHaveProperty("north");
    expect(result.current.intersection.roads).toHaveProperty("south");
    expect(result.current.intersection.roads).toHaveProperty("east");
    expect(result.current.intersection.roads).toHaveProperty("west");
    expect(result.current.stepCount).toBe(0);
    expect(result.current.movingVehicles).toEqual([]);
    expect(result.current.animatingVehicles).toEqual([]);
  });

  it("should handle the next step", () => {
    const { result } = renderHook(() => useIntersection());

    act(() => {
      result.current.handleNextStep();
    });

    expect(result.current.stepCount).toBe(1);
    expect(result.current.movingVehicles).toEqual(["vehicle1"]);
  });

  it("should add a vehicle", () => {
    const { result } = renderHook(() => useIntersection());

    act(() => {
      result.current.handleAddVehicle("north", "south");
    });

    expect(
      result.current.intersection.roads.north.addVehicle,
    ).toHaveBeenCalledWith(expect.any(Vehicle));
  });

  it("should clear the intersection", () => {
    const { result } = renderHook(() => useIntersection());

    act(() => {
      result.current.handleClear();
    });

    expect(result.current.intersection).toHaveProperty("roads");
    expect(result.current.stepCount).toBe(0);
    expect(result.current.movingVehicles).toEqual([]);
    expect(result.current.animatingVehicles).toEqual([]);
  });

  it("should handle file upload", () => {
    const { result } = renderHook(() => useIntersection());
    const mockFileData: UploadFileData = {
      roads: {
        north: {
          vehicles: [
            {
              vehicleId: "vehicle1",
              movement: { from: "north", to: "south" },
            },
          ],
        },
        south: { vehicles: [] },
        east: { vehicles: [] },
        west: { vehicles: [] },
      },
    };

    act(() => {
      result.current.handleFileUpload(mockFileData);
    });

    expect(
      result.current.intersection.roads.north.addVehicle,
    ).toHaveBeenCalledWith(expect.any(Vehicle));
  });

  it("should handle animation completion", () => {
    const { result } = renderHook(() => useIntersection());
    const mockVehicleId = "vehicle1";

    act(() => {
      result.current.handleAnimationComplete(mockVehicleId);
    });

    expect(result.current.animatingVehicles).not.toContainEqual(
      expect.objectContaining({ vehicleId: mockVehicleId }),
    );
  });
});
