import { RoomName } from "./RoomName";
import { RoomGameObjects } from "./RoomGameObjects";

export type GameObjectPath = {
  [SomeRoomName in RoomName]: `/${SomeRoomName}/${RoomGameObjects[SomeRoomName]}`;
}[RoomName];

export function toGameObjectPath<SomeRoomName extends RoomName>(
  roomName: SomeRoomName,
  gameObjectName: RoomGameObjects[SomeRoomName],
): `/${SomeRoomName}/${RoomGameObjects[SomeRoomName]}` {
  return `/${roomName}/${gameObjectName}`;
}

export function fromGameObjectPath<SomeRoomName extends RoomName>(
  gameObjectPath: `/${SomeRoomName}/${RoomGameObjects[SomeRoomName]}`,
): {
  roomName: SomeRoomName;
  gameObjectName: RoomGameObjects[SomeRoomName];
} {
  const matches = gameObjectPath.match(/^\/([^/]+)\/([^/]+)$/);
  if (matches && matches[1] && matches[2]) {
    return {
      roomName: matches[1] as SomeRoomName,
      gameObjectName: matches[2] as RoomGameObjects[SomeRoomName],
    };
  } else {
    throw new Error(`Failed to parse game object path: ${gameObjectPath}`);
  }
}

export const connections: Partial<Record<GameObjectPath, GameObjectPath>> = {
  "/room_krisroom/obj_doorA": "/room_krishallway/obj_markerA",
  "/room_krishallway/obj_doorB": "/room_krisroom/obj_markerB",
};
