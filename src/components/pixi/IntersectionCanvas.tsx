import { Container, Graphics, Stage } from "@pixi/react";

import RoadView from "./RoadView";
import VehicleView from "./VehicleView";

import { type Intersection } from "@/backend/core/intersection";
import { type Direction } from "@/backend/types/traffic";
import { type Vehicle } from "@/backend/core/vehicle";

const WIDTH = 500;
const HEIGHT = 500;

interface IntersectionCanvasProps {
  intersection: Intersection;
  movingVehicles: string[];
  animatingVehicles: Vehicle[];
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
            <RoadView
              key={direction}
              direction={direction as Direction}
              trafficLightState={
                intersection.roads[direction as Direction].trafficLight
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
  animatingVehicles: Vehicle[];
  onAnimationComplete: (id: string) => void;
}) => (
  <>
    {Object.keys(intersection.roads).flatMap((direction) =>
      intersection.roads[direction as Direction].vehicles
        .toArray()
        .map((vehicle) => (
          <VehicleView
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
      <VehicleView
        key={vehicle.vehicleId}
        from={vehicle.movement.from}
        to={vehicle.movement.to}
        queuePosition={0}
        shouldMove={true}
        onAnimationComplete={() => onAnimationComplete(vehicle.vehicleId)}
      />
    ))}
  </>
);
