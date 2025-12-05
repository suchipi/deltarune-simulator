import {
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
    pointOfInterest: keyof ReturnType<Room>["pointsOfInterest"]
  ): void;
  currentRoom: (Entity & { rootComponent: ReturnType<RoomComponent> }) | null;
};

export function RoomRouter(
  setPlayerPosition: (newPosition: Vector) => void
  // camera: Entity & { rootComponent: Component & ReturnType<typeof Camera> }
) {
  useType(RoomRouter);

  let currentRoom:
    | (Entity & { rootComponent: ReturnType<RoomComponent> })
    | null = null;

  function goTo(room, pointOfInterest) {
    if (currentRoom != null) {
      currentRoom.destroy();
    }

    currentRoom = useChild(room);
    const poisMap = currentRoom.rootComponent.pointsOfInterest;

    let poiPos: Vector | null = null;
    if (Object.hasOwn(poisMap, pointOfInterest)) {
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
    setPlayerPosition(poiPos);
  }

  const api: RoomRouterApi = {
    goTo: useCallbackAsCurrent(goTo),
    get currentRoom() {
      return currentRoom;
    },
  };

  return api;
}

export function useRoomRouter(): RoomRouterApi {
  const roomRouter = useRootEntity().getComponent(RoomRouter);
  if (roomRouter == null) {
    throw new Error(
      "No RoomRouter component was present on the root entity! Please add one"
    );
  }

  return {
    goTo: roomRouter.goTo,
    get currentRoom() {
      return roomRouter.currentRoom;
    },
  };
}
