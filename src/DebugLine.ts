import {
  useDebugOverlayDrawTime,
  useDraw,
  useType,
  Vector,
} from "@hex-engine/2d";

export function DebugLine(startPosition: Vector, endPosition: Vector) {
  useType(DebugLine);

  useDebugOverlayDrawTime();
  useDraw((context) => {
    context.strokeStyle = "magenta";
    context.beginPath();
    context.moveTo(startPosition.x, startPosition.y);
    context.lineTo(endPosition.x, endPosition.y);
    context.stroke();
    context.closePath();
  });

  return {
    startPosition,
    endPosition,
  };
}
