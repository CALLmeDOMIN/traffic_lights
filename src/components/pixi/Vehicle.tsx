import { Graphics } from "@pixi/react";

import { type Direction } from "@/backend/types/traffic";

const VehicleComponent = ({
  from,
  queuePosition = 0,
}: {
  from: Direction;
  queuePosition: number;
}) => {
  const directionToCoordinates: Record<Direction, [number, number]> = {
    north: [220, 160],
    east: [320, 220],
    west: [160, 260],
    south: [260, 320],
  };

  const offsetMultiplier: Record<Direction, [number, number]> = {
    north: [0, -queuePosition * 25],
    east: [queuePosition * 25, 0],
    west: [-queuePosition * 25, 0],
    south: [0, queuePosition * 25],
  };

  const getCoordinates = () => {
    const [x, y] = directionToCoordinates[from];
    const [offsetX, offsetY] = offsetMultiplier[from];
    return [x + offsetX, y + offsetY] as [number, number];
  };

  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.beginFill(0x2563eb);
        g.drawRect(...getCoordinates(), 20, 20);
        g.endFill();
      }}
    />
  );
};

export default VehicleComponent;
