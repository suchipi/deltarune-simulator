import {
  ReadOnlyVector,
  useCanvasSize,
  useRawDraw,
  useType,
} from "@hex-engine/2d";

export function Camera(position: ReadOnlyVector) {
  useType(Camera);

  const { canvasSize } = useCanvasSize();

  useRawDraw((context) => {
    context.translate(-position.x, -position.y);
    context.translate(canvasSize.x / 2, canvasSize.y / 2);
  });

  return {
    position,
  };
}
