import {
  Polygon,
  useCanvasSize,
  useInspectorHoverOutline,
  useRawDraw,
  useType,
  Vector,
} from "@hex-engine/2d";

export function Camera(position: Vector) {
  useType(Camera);

  const { canvasSize } = useCanvasSize();

  useRawDraw((context) => {
    context.translate(-position.x, -position.y);
    context.translate(canvasSize.x / 2, canvasSize.y / 2);
  });

  if (process.env.NODE_ENV !== "production") {
    // Polygon constructor changes point coords, so we have to enter them as
    // positive and then adjust them afterwards :\
    const debugShape = new Polygon([
      new Vector(0, 0),
      new Vector(160, 0),
      new Vector(0, 80),
      new Vector(160, 80),
      new Vector(0, 0),
      new Vector(0, 80),
      new Vector(160, 80),
      new Vector(160, 0),
    ]);

    for (const point of debugShape.points) {
      point.x -= 80;
      point.y -= 40;
    }

    useInspectorHoverOutline(() => debugShape);
  }

  return {
    position,
  };
}
