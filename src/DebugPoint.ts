import {
  useDebugOverlayDrawTime,
  useDraw,
  useType,
  Vector,
} from "@hex-engine/2d";

export function DebugPoint(position: Vector) {
  useType(DebugPoint);

  useDebugOverlayDrawTime();
  useDraw((context) => {
    context.strokeStyle = "green";
    context.strokeRect(position.x - 0.5, position.y - 0.5, 1, 1);
  });

  return {
    position,
  };
}
