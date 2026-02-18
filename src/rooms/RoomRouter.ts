import {
  Entity,
  useCallbackAsCurrent,
  useChild,
  useRootEntity,
  useType,
  Vector,
} from "@hex-engine/2d";
import { RoomComponent } from "./RoomComponent";
import { RoomName } from "./RoomName";
import type Player from "../Player";

export type RoomRouterApi = {
  goTo(
    room: RoomName,
    position:
      | {
          type: "VECTOR";
          vector: Vector;
        }
      | {
          type: "POSITION_OF_GAME_OBJECT";
          gameObjectName: string;
        },
  ): void;
  currentRoom:
    | (Entity & { rootComponent: ReturnType<typeof RoomComponent> })
    | null;
};

export function RoomRouter(
  playerEntity: Entity & { rootComponent: ReturnType<typeof Player> },
  setPlayerPosition: (newPosition: Vector) => void,
) {
  useType(RoomRouter);

  let currentRoom:
    | (Entity & { rootComponent: ReturnType<typeof RoomComponent> })
    | null = null;

  const goTo: RoomRouterApi["goTo"] = function goTo(room, position) {
    playerEntity.parent?.removeChild(playerEntity);

    if (currentRoom != null) {
      currentRoom.destroy();
    }

    currentRoom = useChild(() => RoomComponent(room));

    const layerWithMainChara = Object.values(
      currentRoom.rootComponent.layers,
    ).find((layer) => {
      if (layer.rootComponent.data.type !== "Instances") {
        return false;
      }

      const mainChara = layer.rootComponent.data.instances.find(
        (instance) => instance.objectName === "obj_mainchara",
      );

      return mainChara != null;
    });

    if (layerWithMainChara != null) {
      layerWithMainChara.addChild(playerEntity);
    } else {
      console.warn(
        "Couldn't find a layer with obj_mainchara; setting player entity parent to Root entity",
      );
      useRootEntity().addChild(playerEntity);
    }

    switch (position.type) {
      case "VECTOR": {
        setPlayerPosition(position.vector);
        break;
      }
      case "POSITION_OF_GAME_OBJECT": {
        // find game object, etc
      }
    }
  };

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
      "No RoomRouter component was present on the root entity! Please add one",
    );
  }

  return {
    goTo: roomRouter.goTo,
    get currentRoom() {
      return roomRouter.currentRoom;
    },
  };
}
