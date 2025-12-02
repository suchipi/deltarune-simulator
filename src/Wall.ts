import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
  useChild,
} from "@hex-engine/2d";

export default function Wall(position: Vector, size: Vector) {
  useType(Wall);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position: position.add(size.divide(2)),
    })
  );

  const body = useNewComponent(() =>
    Physics.Body(geometry, {
      isStatic: true,
    })
  );
}

export function makeWallBuilder(roomTopLeftOffset: Vector) {
  return {
    makeWall(
      topLeftX: number,
      topLeftY: number,
      bottomRightX: number,
      bottomRightY: number
    ) {
      useChild(() =>
        Wall(
          roomTopLeftOffset.addX(topLeftX).addYMutate(topLeftY),
          new Vector(bottomRightX - topLeftX, bottomRightY - topLeftY)
        )
      );
    },
  };
}
