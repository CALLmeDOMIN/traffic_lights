import { useState } from "react";
import { Container, Graphics, Stage } from "@pixi/react";

import { Intersection } from "@/backend/core/intersection";
import { Direction } from "@/backend/types/traffic";
import { Vehicle } from "@/backend/core/vehicle";
import { IntersectionController } from "@/backend/controllers/intersectionController";

import Nav from "@/components/Nav";
import Road from "@/components/pixi/Road";
import VehicleComponent from "@/components/pixi/Vehicle";

const width = 500;
const height = 500;

function App() {
  const [intersection, setIntersection] = useState<Intersection>(
    new Intersection(),
  );
  const intersectionController = new IntersectionController();
  const [stepCount, setStepCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [movingVehicles, setMovingVehicles] = useState<string[]>([]);
  const [animatingVehicles, setAnimatingVehicles] = useState<
    Array<{ id: string; from: Direction; to: Direction }>
  >([]);

  const handleNextStep = () => {
    const newIntersection = new Intersection();
    Object.assign(newIntersection, intersection);

    const movedVehicles =
      intersectionController.handleVehicleMovement(newIntersection);

    setAnimatingVehicles((prev) => [
      ...prev,
      ...movedVehicles.map((v) => ({
        id: v.vehicleId,
        from: v.movement.from,
        to: v.movement.to,
      })),
    ]);
    setMovingVehicles(movedVehicles.map((vehicle) => vehicle.vehicleId));

    if (stepCount % 2 === 1) newIntersection.change();

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

  const handleAnimationComplete = (vehicleId: string) => {
    setAnimatingVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
  };

  return (
    <div className="dark flex h-screen w-screen flex-col items-center justify-center space-y-4 bg-background text-foreground">
      <div className="overflow-hidden rounded-xl">
        <IntersectionComponent
          intersection={intersection}
          movingVehicles={movingVehicles}
          animatingVehicles={animatingVehicles}
          onAnimationComplete={handleAnimationComplete}
        />
      </div>
      <Nav
        className="absolute bottom-5 right-5"
        onNextStep={handleNextStep}
        onAddVehicle={handleAddVehicle}
      />
      <div className="absolute bottom-5 left-5">
        <span>Step: {stepCount}</span>
      </div>
    </div>
  );
}

export default App;

interface AnimatingVehicle {
  id: string;
  from: Direction;
  to: Direction;
}

const VehiclesLayer = ({
  intersection,
  movingVehicles,
  animatingVehicles,
  onAnimationComplete,
}: {
  intersection: Intersection;
  movingVehicles: string[];
  animatingVehicles: AnimatingVehicle[];
  onAnimationComplete: (id: string) => void;
}) => (
  <>
    {Object.keys(intersection.roads).flatMap((direction) =>
      intersection.roads[direction as Direction].vehicles
        .toArray()
        .map((vehicle) => (
          <VehicleComponent
            key={vehicle.vehicleId}
            from={vehicle.movement.from}
            to={vehicle.movement.to}
            queuePosition={intersection.roads[
              direction as Direction
            ].getVehiclePosition(vehicle.vehicleId)}
            shouldMove={movingVehicles.includes(vehicle.vehicleId)}
            onAnimationComplete={() => onAnimationComplete(vehicle.vehicleId)}
          />
        )),
    )}
    {animatingVehicles.map((vehicle) => (
      <VehicleComponent
        key={vehicle.id}
        from={vehicle.from}
        to={vehicle.to}
        queuePosition={0}
        shouldMove={true}
        onAnimationComplete={() => onAnimationComplete(vehicle.id)}
      />
    ))}
  </>
);

const IntersectionComponent = ({
  intersection,
  movingVehicles,
  animatingVehicles,
  onAnimationComplete,
}: {
  intersection: Intersection;
  movingVehicles: string[];
  animatingVehicles: AnimatingVehicle[];
  onAnimationComplete: (id: string) => void;
}) => (
  <div style={{ width, height }} className="dark">
    <Stage
      width={width}
      height={height}
      options={{ backgroundColor: 0x22c55e }}
    >
      <Container>
        <Graphics
          draw={(g) => {
            g.clear();
            g.beginFill(0x475569);
            g.drawRect(200, 200, 100, 100);
            g.endFill();
          }}
        />
        {Object.keys(intersection.roads).map((direction) => (
          <Road
            key={direction}
            direction={direction as Direction}
            trafficLightState={
              intersection.roads[direction as Direction].trafficLight.state.main
            }
          />
        ))}
        <VehiclesLayer
          intersection={intersection}
          movingVehicles={movingVehicles}
          animatingVehicles={animatingVehicles}
          onAnimationComplete={onAnimationComplete}
        />
      </Container>
    </Stage>
  </div>
);
