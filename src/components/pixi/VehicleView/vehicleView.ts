import { type Direction } from "@/backend/types/traffic";

export const calculateMovement = (
  current: [number, number],
  target: [number, number],
  speed: number,
): [number, number] => {
  const [dx, dy] = [target[0] - current[0], target[1] - current[1]];
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < speed) {
    return target;
  }

  return [
    current[0] + (dx / distance) * speed,
    current[1] + (dy / distance) * speed,
  ];
};

export const calculatePosition = (
  from: Direction,
  base: [number, number],
  queuePos: number,
): [number, number] => {
  const offsets: Record<Direction, [number, number]> = {
    north: [0, -25],
    east: [25, 0],
    west: [-25, 0],
    south: [0, 25],
  };

  return [
    base[0] + offsets[from][0] * queuePos,
    base[1] + offsets[from][1] * queuePos,
  ];
};

export const startPositions: Record<Direction, [number, number]> = {
  north: [230, 180],
  east: [320, 230],
  west: [180, 270],
  south: [270, 320],
};

export const getIntermediatePosition = (
  from: Direction,
  to: Direction,
): [number, number] | null => {
  if (from === to) {
    switch (from) {
      case "north":
        return [250, 250];
      case "south":
        return [250, 250];
      case "east":
        return [250, 250];
      case "west":
        return [250, 250];
    }
  }

  if (
    (from === "north" && to === "south") ||
    (from === "south" && to === "north") ||
    (from === "east" && to === "west") ||
    (from === "west" && to === "east")
  ) {
    return null;
  }

  if (from === "north" && to === "west") return [230, 230];
  if (from === "east" && to === "north") return [270, 230];
  if (from === "south" && to === "east") return [270, 270];
  if (from === "west" && to === "south") return [230, 270];

  return [250, 250];
};

export const getEndPosition = (
  from: Direction,
  to: Direction,
): [number, number] => {
  if (from === to) {
    switch (from) {
      case "north":
        return [startPositions["south"][0], 160];
      case "south":
        return [startPositions["north"][0], 320];
      case "east":
        return [320, startPositions["west"][1]];
      case "west":
        return [160, startPositions["east"][1]];
    }
  }

  if (
    (from === "north" && to === "south") ||
    (from === "south" && to === "north")
  ) {
    return [startPositions[from][0], from === "north" ? 320 : 160];
  }
  if (
    (from === "east" && to === "west") ||
    (from === "west" && to === "east")
  ) {
    return [from === "east" ? 160 : 320, startPositions[from][1]];
  }

  if (from === "north" && to === "west") return [160, 230];
  if (from === "east" && to === "north") return [270, 160];
  if (from === "south" && to === "east") return [320, 270];
  if (from === "west" && to === "south") return [250, 320];

  if (from === "north" && to === "east") return [320, 270];
  if (from === "east" && to === "south") return [230, 320];
  if (from === "south" && to === "west") return [160, 230];
  if (from === "west" && to === "north") return [270, 160];

  return startPositions[from];
};

export const getMovementAngle = (to: Direction): number => {
  const angleTo = {
    north: -Math.PI / 2,
    east: -2 * Math.PI,
    south: Math.PI / 2,
    west: Math.PI,
  };

  return angleTo[to];
};
