import { useState } from "react";
import { Container, Graphics, Stage } from "@pixi/react";

import { Intersection } from "@/backend/core/intersection";
import { Direction } from "@/backend/types/traffic";
import { Vehicle } from "@/backend/core/vehicle";
import { IntersectionController } from "@/backend/controllers/intersectionController";

import Nav from "@/components/Nav";
import Road from "@/components/pixi/Road";
import VehicleComponent from "@/components/pixi/Vehicle";

function App() {
  const [intersection, setIntersection] = useState<Intersection>(
    new Intersection(),
  );
  const intersectionController = new IntersectionController();
  const [stepCount, setStepCount] = useState(0);

  const handleNextStep = () => {
    const newIntersection = new Intersection();
    Object.assign(newIntersection, intersection);

    intersectionController.handleVehicleMovement(newIntersection);

    if (stepCount % 2 === 1) newIntersection.change();

    setIntersection(newIntersection);
    setStepCount((prev) => prev + 1);
  };

  const handleAddVehicle = (from: Direction, to: Direction) => {
    const newIntersection = new Intersection();
    Object.assign(newIntersection, intersection);

    const vehicleId = `vehicle${stepCount}`;
    const newVehicle = new Vehicle(vehicleId, from, to);
    newIntersection.roads[from].addVehicle(newVehicle);

    setIntersection(newIntersection);
  };

  return (
    <div className="dark flex h-screen w-screen flex-col items-center justify-center space-y-4 bg-background text-foreground">
      <div className="overflow-hidden rounded-xl">
        <IntersectionComponent intersection={intersection} />
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

const width = 500;
const height = 500;

const IntersectionComponent = ({
  intersection,
}: {
  intersection: Intersection;
}) => {
  return (
    <div style={{ width: width, height: height }} className="dark">
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
                intersection.roads[direction as Direction].trafficLight.state
                  .main
              }
            />
          ))}

          {Object.keys(intersection.roads).flatMap((direction) =>
            intersection.roads[direction as Direction].vehicles
              .toArray()
              .map((vehicle) => (
                <VehicleComponent
                  key={vehicle.vehicleId}
                  from={vehicle.movement.from}
                  queuePosition={intersection.roads[
                    direction as Direction
                  ].getVehiclePosition(vehicle.vehicleId)}
                />
              )),
          )}
        </Container>
      </Stage>
    </div>
  );
};
