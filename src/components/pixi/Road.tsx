import { Graphics } from "@pixi/react";

import { type Direction } from "@/backend/types/traffic";

const Road = ({
  direction,
  trafficLightState,
}: {
  direction: Direction;
  trafficLightState: string;
}) => {
  const directionToCoordinates: Record<
    Direction,
    [number, number, number, number]
  > = {
    north: [200, 0, 100, 200],
    east: [300, 200, 200, 100],
    west: [0, 200, 200, 100],
    south: [200, 300, 100, 200],
  };

  const lightCoordinates: Record<Direction, [number, number, number, number]> =
    {
      north: [220, 200, 20, 20],
      east: [280, 220, 20, 20],
      west: [200, 260, 20, 20],
      south: [260, 280, 20, 20],
    };

  const lightOffsetMultiplier: Record<
    Direction,
    [number, number, number, number]
  > = {
    north: [0, 5, 0, -5],
    east: [0, 0, -5, 0],
    west: [5, 0, -5, 0],
    south: [0, 0, 0, -5],
  };

  const getCoordinates = () => {
    const [x, y, width, height] = lightCoordinates[direction];
    const [offsetX, offsetY, offsetWidth, offsetHeight] =
      lightOffsetMultiplier[direction];
    return [
      x + offsetX,
      y + offsetY,
      width + offsetWidth,
      height + offsetHeight,
    ] as [number, number, number, number];
  };

  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.beginFill(0x475569);
        g.drawRect(...directionToCoordinates[direction]);
        g.endFill();
        g.beginFill(trafficLightState === "green" ? 0x16a34a : 0xdc2626);
        g.drawRect(
          lightCoordinates[direction][0],
          lightCoordinates[direction][1],
          20,
          20,
        );
        g.endFill();
        g.beginFill(0x000000);
        g.drawRect(...getCoordinates());
        g.endFill();
      }}
    />
  );
};

export default Road;
