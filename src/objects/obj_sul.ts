import {
  Geometry,
  Physics,
  Polygon,
  useNewComponent,
  useType,
  Vector,
} from "@hex-engine/2d";
import { RoomInstanceJson } from "../rooms/RoomJson";

// 20x20 is the size of the game object sprite at
// src/gamedata/chapter1/sprites/obj_sul.png
const SIZE = new Vector(20, 20);

export function obj_sul(instance: RoomInstanceJson) {
  useType(obj_sul);

  const size = SIZE.multiplyX(instance.scaleX).multiplyYMutate(instance.scaleY);

  const points = [
    new Vector(size.x, size.y),
    new Vector(size.x, 0),
    new Vector(0, size.y),
  ];

  // Need to counteract centroid offset from Polygon constructor (which is
  // necessary for physics engine)
  const centroid = points
    .reduce((prev, curr) => prev.addMutate(curr), new Vector(0, 0))
    .divideMutate(points.length);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: new Polygon(points),
      position: new Vector(instance.x, instance.y).addMutate(
        centroid.divide(2),
      ),
      rotation: instance.rotation,
    }),
  );

  const body = useNewComponent(() =>
    Physics.Body(geometry, {
      isStatic: true,
    }),
  );

  return {
    size,
    geometry,
    body,
    centroid,
  };
}
