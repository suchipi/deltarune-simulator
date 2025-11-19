import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
} from "@hex-engine/2d";

export default function Wall(position: Vector, size: Vector) {
  useType(Wall);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position,
    })
  );

  const body = useNewComponent(() =>
    Physics.Body(geometry, {
      isStatic: true,
    })
  );
}
