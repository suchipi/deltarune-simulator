import {
  Geometry,
  Polygon,
  useNewComponent,
  useType,
  Vector,
} from "@hex-engine/2d";
import { RoomInstanceJson } from "../rooms/RoomJson";

// TODO: get dimensions from game object sprite
const SIZE = new Vector(5, 5);

export function DefaultGameObject(instance: RoomInstanceJson) {
  useType(DefaultGameObject);

  const size = SIZE.multiplyX(instance.scaleX).multiplyYMutate(instance.scaleY);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position: new Vector(instance.x, instance.y),
      rotation: instance.rotation,
    }),
  );

  return {
    size,
    geometry,
  };
}
