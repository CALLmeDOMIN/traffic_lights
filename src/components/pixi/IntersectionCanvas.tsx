import { Container, Graphics, Stage } from "@pixi/react";

import Road from "./Road";
import VehicleComponent from "./Vehicle";

import { type AnimatingVehicle } from "@/lib/types";
import { type Intersection } from "@/backend/core/intersection";
import { type Direction } from "@/backend/types/traffic";

const WIDTH = 500;
const HEIGHT = 500;

interface IntersectionCanvasProps {
  intersection: Intersection;
  movingVehicles: string[];
  animatingVehicles: AnimatingVehicle[];
  onAnimationComplete: (id: string) => void;
}

export default function IntersectionCanvas({
  intersection,
  movingVehicles,
  animatingVehicles,
  onAnimationComplete,
}: IntersectionCanvasProps) {
  return (
    <div style={{ width: WIDTH, height: HEIGHT }} className="dark">
      <Stage
        width={WIDTH}
        height={HEIGHT}
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
