import {
  Component,
  Entity,
  useCallbackAsCurrent,
  useChild,
  useRootEntity,
  useType,
  Vector,
} from "@hex-engine/2d";
import { RoomComponent } from "./RoomComponent";

export type RoomRouterApi = {
  goTo<Room extends RoomComponent>(
    room: Room,
    pointOfInterest?: null | keyof ReturnType<Room>["pointsOfInterest"]
  ): void;
  currentRoom: (Entity & { rootComponent: ReturnType<RoomComponent> }) | null;
};

export function RoomRouter(
  playerPosition: Vector
  // cameraPosition: Vector,
) {
  useType(RoomRouter);

  let currentRoom:
    | (Entity & { rootComponent: ReturnType<RoomComponent> })
    | null = null;

  const api: RoomRouterApi = {
    goTo(room, pointOfInterest) {
      if (currentRoom != null) {
        currentRoom.destroy();
      }

      currentRoom = useChild(room);
      const poisMap = currentRoom.rootComponent.pointsOfInterest;

      let poiPos: Vector | null = null;
      if (pointOfInterest == null) {
        poiPos = currentRoom.rootComponent.playerSpawn.position;
      } else if (Object.hasOwn(poisMap, pointOfInterest)) {
        // @ts-ignore
        poiPos = poisMap[pointOfInterest];
      }

      if (poiPos == null) {
        throw new Error(
          `Room ${JSON.stringify(
            room.name
          )} has no point of interest ${JSON.stringify(pointOfInterest)}!`
        );
      }
      playerPosition.mutateInto(poiPos);

      // const camera = useNewComponent(() => Camera(canvasCenter));
      // camera.position.subtractMutate(room.rootComponent.bounds.divide(2));
    },
  };

  return {
    api,
    get currentRoom() {
      return currentRoom;
    },
  };
}

export function useRoomRouter(): RoomRouterApi {
  const roomRouter = useRootEntity().getComponent(RoomRouter);
  if (roomRouter == null) {
    throw new Error(
      "No RoomRouter component was present on the root entity! Please add one"
    );
  }

  return {
    goTo: useCallbackAsCurrent(roomRouter.api.goTo),
    get currentRoom() {
      return roomRouter.currentRoom;
    },
  };
}
