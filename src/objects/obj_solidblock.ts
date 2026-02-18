import {
  Geometry,
  Physics,
  Polygon,
  useNewComponent,
  useType,
  Vector,
} from "@hex-engine/2d";
import { RoomInstanceJson } from "../rooms/RoomJson";

const SIZE = new Vector(20, 20);

export function obj_solidblock(instance: RoomInstanceJson) {
  useType(obj_solidblock);

  const size = SIZE.multiplyX(instance.scaleX).multiplyYMutate(instance.scaleY);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position: new Vector(instance.x, instance.y).addMutate(size.divide(2)),
      rotation: instance.rotation,
    }),
  );

  const body = useNewComponent(() =>
    Physics.Body(geometry, {
      isStatic: true,
    }),
  );
}
