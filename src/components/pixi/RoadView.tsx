import { Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";

import { type Direction } from "@/backend/types/traffic";
import { type TrafficLight } from "@/backend/core/trafficLight";

const ROAD_COORDINATES: Record<Direction, [number, number, number, number]> = {
  north: [200, 0, 100, 200],
  east: [300, 200, 200, 100],
  west: [0, 200, 200, 100],
  south: [200, 300, 100, 200],
};

const LIGHT_COORDINATES: Record<Direction, [number, number, number, number]> = {
  north: [220, 200, 20, 20],
  east: [280, 220, 20, 20],
  west: [200, 260, 20, 20],
  south: [260, 280, 20, 20],
};

const LIGHT_OFFSET: Record<Direction, [number, number, number, number]> = {
  north: [0, 10, 0, -10],
  east: [0, 0, -10, 0],
  west: [10, 0, -10, 0],
  south: [0, 0, 0, -10],
};

const CONDITIONAL_OFFSET: Record<Direction, [number, number]> = {
  north: [18, 15],
  east: [5, 18],
  west: [15, 2],
  south: [2, 5],
};

const ARROW_ANGLES: Record<Direction, number> = {
  north: Math.PI,
  east: -Math.PI / 2,
  west: Math.PI / 2,
  south: -2 * Math.PI,
};

interface ArrowProps {
  g: PIXI.Graphics;
  x: number;
  y: number;
  angle: number;
  color?: number;
}

const drawArrow = ({ g, x, y, angle, color = 0x16a34a }: ArrowProps) => {
  const arrowLength = 15;
  const arrowHead = arrowLength * 0.4;
  const arrowHeadAngle = Math.PI / 6;

  g.lineStyle(2, color);

  const endX = x + arrowLength * Math.cos(angle);
  const endY = y + arrowLength * Math.sin(angle);

  g.moveTo(x, y);
  g.lineTo(endX, endY);

  g.moveTo(
    endX - arrowHead * Math.cos(angle - arrowHeadAngle),
    endY - arrowHead * Math.sin(angle - arrowHeadAngle),
  );
  g.lineTo(endX, endY);
  g.lineTo(
    endX - arrowHead * Math.cos(angle + arrowHeadAngle),
    endY - arrowHead * Math.sin(angle + arrowHeadAngle),
  );
};

const getCoordinates = (direction: Direction) => {
  const [x, y, width, height] = LIGHT_COORDINATES[direction];
  const [offsetX, offsetY, offsetWidth, offsetHeight] = LIGHT_OFFSET[direction];
  return [
    x + offsetX,
    y + offsetY,
    width + offsetWidth,
    height + offsetHeight,
  ] as [number, number, number, number];
};

const RoadView = ({
  direction,
  trafficLightState,
}: {
  direction: Direction;
  trafficLightState: TrafficLight;
}) => (
  <>
    <Graphics
      draw={(g) => {
        g.clear();
        g.beginFill(0x475569);
        g.drawRect(...ROAD_COORDINATES[direction]);
        g.endFill();
      }}
      zIndex={1}
    />
    <Graphics
      draw={(g) => {
        g.clear();
        const [baseX, baseY] = LIGHT_COORDINATES[direction];

        g.beginFill(
          trafficLightState.state.main === "green" ? 0x16a34a : 0xdc2626,
        );
        g.drawCircle(baseX + 10, baseY + 10, 5);
        g.endFill();

        g.beginFill(0x000000);
        g.drawRect(...getCoordinates(direction));
        g.endFill();

        if (trafficLightState.state.arrow === "on") {
          drawArrow({
            g,
            x: baseX + CONDITIONAL_OFFSET[direction][0],
            y: baseY + CONDITIONAL_OFFSET[direction][1],
            angle: ARROW_ANGLES[direction],
          });
        }
      }}
      zIndex={3}
    />
  </>
);

export default RoadView;
