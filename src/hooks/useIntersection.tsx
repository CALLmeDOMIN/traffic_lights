import { useMemo, useState } from "react";

import { IntersectionController } from "@/backend/controllers/intersectionController";
import { FixedTimeController } from "@/backend/controllers/fixedTimeController";
import { AdaptiveController } from "@/backend/controllers/adaptiveController";
import { Intersection } from "@/backend/core/intersection";
import { Vehicle } from "@/backend/core/vehicle";

import { type Direction } from "@/backend/types/traffic";
import { type UploadFileData } from "@/lib/types";

export function useIntersection() {
  const [intersection, setIntersection] = useState<Intersection>(
    new Intersection(),
  );

  const [isAdaptive, setIsAdaptive] = useState(false);

  const trafficController = useMemo(
    () => (isAdaptive ? new AdaptiveController() : new FixedTimeController()),
    [isAdaptive],
  );
  const vehicleController = useMemo(() => new IntersectionController(), []);

  const [stepCount, setStepCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [movingVehicles, setMovingVehicles] = useState<string[]>([]);
  const [animatingVehicles, setAnimatingVehicles] = useState<Vehicle[]>([]);

  const handleNextStep = () => {
    const newIntersection = new Intersection();
    Object.assign(newIntersection, intersection);

    const movedVehicles =
      vehicleController.handleVehicleMovement(newIntersection);

    setAnimatingVehicles((prev) => [
      ...prev,
      ...movedVehicles.map(
        (v) => new Vehicle(v.vehicleId, v.movement.from, v.movement.to),
      ),
    ]);
    setMovingVehicles(movedVehicles.map((vehicle) => vehicle.vehicleId));

    trafficController.handleTrafficLightChange(newIntersection);

    setIntersection(newIntersection);
    setStepCount((prev) => prev + 1);
  };

  const handleAddVehicle = (from: Direction, to: Direction) => {
    const newIntersection = new Intersection();
    Object.assign(newIntersection, intersection);

    const vehicleId = `vehicle${vehicleCount}`;
    const newVehicle = new Vehicle(vehicleId, from, to);
    newIntersection.roads[from].addVehicle(newVehicle);

    setIntersection(newIntersection);
    setVehicleCount((prev) => prev + 1);
  };

  const handleClear = () => {
    setIntersection(new Intersection());
    setStepCount(0);
    setVehicleCount(0);
  };

  const handleFileUpload = (data: UploadFileData) => {
    const newIntersection = new Intersection();

    Object.entries(data.roads).forEach(([direction, road]) => {
      road.vehicles.forEach((vehicleData) => {
        const vehicle = new Vehicle(
          vehicleData.vehicleId,
          vehicleData.movement.from,
          vehicleData.movement.to,
        );
        newIntersection.roads[direction as Direction].addVehicle(vehicle);
      });
    });

    setIntersection(newIntersection);
    setVehicleCount(
      Math.max(
        ...Object.values(data.roads)
          .flatMap((road) => road.vehicles)
          .map((v) => parseInt(v.vehicleId.replace(/\D/g, ""), 10) || 0),
      ) + 1,
    );
  };

  const handleAnimationComplete = (vehicleId: string) => {
    setAnimatingVehicles((prev) =>
      prev.filter((v) => v.vehicleId !== vehicleId),
    );
  };

  return {
    intersection,
    stepCount,
    movingVehicles,
    animatingVehicles,
    isAdaptive,
    handleNextStep,
    handleAddVehicle,
    handleClear,
    handleFileUpload,
    handleAnimationComplete,
    toggleController: () => setIsAdaptive((prev) => !prev),
  };
}
