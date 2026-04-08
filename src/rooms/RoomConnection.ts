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
import { GameObjectPath } from "./connections";
import { isPlayer } from "../Player";
import { useRoomRouter } from "./RoomRouter";

// TODO this should vary depending on the game object
const SIZE = new Vector(20, 20);

export function RoomConnection(
  instance: RoomInstanceJson,
  destination: GameObjectPath,
) {
  useType(RoomConnection);

  useEntityName(instance.objectName);

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
