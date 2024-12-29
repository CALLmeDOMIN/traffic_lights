import { useEffect, useState } from "react";
import { Graphics, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";

import { type Direction } from "@/backend/types/traffic";
import {
  calculateMovement,
  calculatePosition,
  getEndPosition,
  getIntermediatePosition,
  getMovementAngle,
  startPositions,
} from "./vehicleView";

type MovementPhase = "idle" | "intermediate" | "final";

const drawArrow = (g: PIXI.Graphics, x: number, y: number, angle: number) => {
  const circleRadius = 10;
  const arrowLength = circleRadius * 1.2;
  const arrowHead = arrowLength * 0.5;
  const arrowHeadAngle = Math.PI / 8;

  const startX = x - (arrowLength / 2) * Math.cos(angle);
  const startY = y - (arrowLength / 2) * Math.sin(angle);
  const endX = startX + arrowLength * Math.cos(angle);
  const endY = startY + arrowLength * Math.sin(angle);

  g.moveTo(startX, startY);
  g.lineTo(endX, endY);

  g.moveTo(endX, endY);
  g.lineTo(
    endX - arrowHead * Math.cos(angle - arrowHeadAngle),
    endY - arrowHead * Math.sin(angle - arrowHeadAngle),
  );
  g.moveTo(endX, endY);
  g.lineTo(
    endX - arrowHead * Math.cos(angle + arrowHeadAngle),
    endY - arrowHead * Math.sin(angle + arrowHeadAngle),
  );
};

interface VehicleProps {
  from: Direction;
  to: Direction;
  queuePosition?: number;
  shouldMove?: boolean;
  onAnimationComplete?: () => void;
}

const VehicleView = ({
  from,
  to,
  queuePosition = 0,
  shouldMove = false,
  onAnimationComplete,
}: VehicleProps) => {
  const basePos = startPositions[from];
  const [position, setPosition] = useState(
    calculatePosition(from, basePos, queuePosition),
  );
  const [phase, setPhase] = useState<MovementPhase>("idle");

  const intermediatePos = getIntermediatePosition(from, to);
  const endPos = getEndPosition(from, to);
  const speed = 2;

  useTick(() => {
    if (phase === "idle") {
      const queuePos = calculatePosition(from, basePos, queuePosition);
      const newPos = calculateMovement(position, queuePos, speed);
      setPosition(newPos);
      return;
    }

    const target = phase === "intermediate" ? intermediatePos! : endPos;
    const newPos = calculateMovement(position, target, speed);

    if (newPos === target) {
      if (phase === "intermediate") {
        setPhase("final");
      } else {
        setPhase("idle");
        onAnimationComplete?.();
      }
    }

    setPosition(newPos);
  });

  useEffect(() => {
    if (shouldMove && phase === "idle") {
      setPhase(intermediatePos ? "intermediate" : "final");
    }
  }, [shouldMove, intermediatePos, phase]);

  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.beginFill(0x0000ff);
        g.drawCircle(position[0], position[1], 10);
        g.endFill();

        g.lineStyle(2, 0xffffff);
        const angle = getMovementAngle(to);
        drawArrow(g, position[0], position[1], angle);
      }}
      zIndex={2}
    />
  );
};

export default VehicleView;
