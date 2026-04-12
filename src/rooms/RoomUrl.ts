import { RoomName } from "./RoomName";
import { RoomGameObjects } from "./RoomGameObjects";
import { Vector } from "@hex-engine/2d";
import { PlayerFacingDirection } from "../PlayerRenderer";

export type RoomUrl = {
  [SomeRoomName in RoomName]:
    | `/${SomeRoomName}/${RoomGameObjects[SomeRoomName]}`
    | `/${SomeRoomName}/${number},${number}`;
}[RoomName];

export function makeRoomUrl<SomeRoomName extends RoomName>(
  roomName: SomeRoomName,
  gameObjectName: RoomGameObjects[SomeRoomName],
): `/${SomeRoomName}/${RoomGameObjects[SomeRoomName]}`;
export function makeRoomUrl<SomeRoomName extends RoomName>(
  roomName: SomeRoomName,
  position: Vector,
): `/${SomeRoomName}/${number},${number}`;
export function makeRoomUrl<SomeRoomName extends RoomName>(
  roomName: SomeRoomName,
  x: number,
  y: number,
): `/${SomeRoomName}/${number},${number}`;
export function makeRoomUrl<SomeRoomName extends RoomName>(
  roomName: SomeRoomName,
  ...args: any
): `/${SomeRoomName}/${RoomGameObjects[SomeRoomName]}` {
  if (args.length === 2) {
    return `/${roomName}/${args[0]},${args[1]}` as any;
  } else {
    if (args[0] instanceof Vector) {
      return `/${roomName}/${args[0].x},${args[0].y}` as any;
    } else {
      return `/${roomName}/${args[0]}`;
    }
  }
}

export type ParsedRoomUrl<SomeRoomName extends RoomName> =
  | {
      type: "game-object";
      roomName: SomeRoomName;
      gameObjectName: RoomGameObjects[SomeRoomName];
    }
  | {
      type: "position";
      roomName: SomeRoomName;
      position: Vector;
    };

export function parseRoomUrl<SomeRoomName extends RoomName>(
  roomUrl:
    | `/${SomeRoomName}/${RoomGameObjects[SomeRoomName]}`
    | `/${SomeRoomName}/${number},${number}`,
): ParsedRoomUrl<SomeRoomName> {
  const matches = roomUrl.match(/^\/([^/]+)\/([^/]+)$/);
  if (matches && matches[1] && matches[2]) {
    const coordMatches = matches[2].match(/^(\d+),(\d+)$/);
    if (coordMatches) {
      return {
        type: "position",
        roomName: matches[1] as SomeRoomName,
        position: new Vector(
          parseInt(coordMatches[1], 10),
          parseInt(coordMatches[2], 10),
        ),
      };
    } else {
      return {
        type: "game-object",
        roomName: matches[1] as SomeRoomName,
        gameObjectName: matches[2] as RoomGameObjects[SomeRoomName],
      };
    }
  } else {
    throw new Error(`Failed to parse game object path: ${roomUrl}`);
  }
}

export type Destination = {
  roomUrl: RoomUrl;
  facing: PlayerFacingDirection;
};
