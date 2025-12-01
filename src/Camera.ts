import { useRawDraw, useType, Vector } from "@hex-engine/2d";

export function Camera(position: Vector) {
  useType(Camera);

  useRawDraw((context) => {
    context.translate(-position.x, -position.y);
  });

  return {
    position,
  };
}
