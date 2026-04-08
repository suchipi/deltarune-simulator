import { GameObjectName } from "../objects/GameObjectName";
import { RoomName } from "./RoomName";

export type GameObjectPath = `/${RoomName}/${GameObjectName}`;

export function toGameObjectPath(
  roomName: RoomName,
  gameObjectName: GameObjectName,
): GameObjectPath {
  return `/${roomName}/${gameObjectName}`;
}

export function fromGameObjectPath(gameObjectPath: GameObjectPath): {
  roomName: RoomName;
  gameObjectName: string;
} {
  const matches = gameObjectPath.match(/^\/([^/]+)\/([^/]+)$/);
  if (matches && matches[1] && matches[2]) {
    return {
      roomName: matches[1] as RoomName,
      gameObjectName: matches[2],
    };
  } else {
    throw new Error(`Failed to parse game object path: ${gameObjectPath}`);
  }
}

export const connections: Partial<Record<GameObjectPath, GameObjectPath>> = {
  "/room_krisroom/obj_doorA": "/room_krishallway/obj_markerA",
  "/room_krishallway/obj_doorB": "/room_krisroom/obj_markerB",
};
