import {
  Geometry,
  Polygon,
  useNewComponent,
  useType,
  Vector,
} from "@hex-engine/2d";
import { RoomInstanceJson } from "../rooms/RoomJson";
import { GameObjectDimensions } from "./GameObjectDimensions";

const fallbackSize = new Vector(4, 4);

export function DefaultGameObject(instance: RoomInstanceJson) {
  useType(DefaultGameObject);

  const baseSize = GameObjectDimensions[instance.objectName] ?? fallbackSize;
  const size = baseSize
    .multiplyX(instance.scaleX)
    .multiplyYMutate(instance.scaleY);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position: new Vector(instance.x, instance.y).addMutate(size.divide(2)),
      rotation: instance.rotation,
    }),
  );

  return {
    size,
    geometry,
  };
}
