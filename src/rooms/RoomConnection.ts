import {
  Geometry,
  Physics,
  Polygon,
  useEntityName,
  useNewComponent,
  useType,
  Vector,
} from "@hex-engine/2d";
import { RoomInstanceJson } from "./RoomJson";
import { Destination } from "./RoomUrl";
import { isPlayer } from "../Player";
import { useRoomRouter } from "./RoomRouter";
import { GameObjectDimensions } from "../objects/GameObjectDimensions";

const fallbackSize = new Vector(4, 4);

export function RoomConnection(
  instance: RoomInstanceJson,
  destination: Destination,
) {
  useType(RoomConnection);

  useEntityName(instance.objectName);

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

  const body = useNewComponent(() =>
    Physics.Body(geometry, {
      isSensor: true,
    }),
  );

  const roomRouter = useRoomRouter();

  body.onCollision((other) => {
    if (
      other.kind === "start" &&
      other.entity != null &&
      isPlayer(other.entity)
    ) {
      roomRouter.goTo(destination);
    }
  });

  return {
    size,
    geometry,
    body,
  };
}

export function ManualRoomConnection(
  position: Vector,
  destination: Destination,
) {
  useType(ManualRoomConnection);

  const size = new Vector(20, 20);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position: position,
    }),
  );

  const body = useNewComponent(() =>
    Physics.Body(geometry, {
      isSensor: true,
    }),
  );

  const roomRouter = useRoomRouter();

  body.onCollision((other) => {
    if (
      other.kind === "start" &&
      other.entity != null &&
      isPlayer(other.entity)
    ) {
      roomRouter.goTo(destination);
    }
  });

  return {
    size,
    geometry,
    body,
  };
}
