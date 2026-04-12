import {
  Entity,
  useCallbackAsCurrent,
  useChild,
  useRootEntity,
  useType,
  Vector,
} from "@hex-engine/2d";
import { RoomComponent } from "./RoomComponent";
import type Player from "../Player";
import { setDepth } from "../useDepth";
import { parseRoomUrl, RoomUrl } from "./RoomUrl";
import { assertNever } from "../utils/assertNever";

export type RoomRouterApi = {
  goTo(roomUrl: RoomUrl): void;
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

  const goTo: RoomRouterApi["goTo"] = function goTo(roomUrl: RoomUrl) {
    console.log("goTo", roomUrl);

    const parsedUrl = parseRoomUrl(roomUrl);

    // just for fun
    location.hash = roomUrl;

    playerEntity.parent?.removeChild(playerEntity);

    if (currentRoom != null) {
      currentRoom.destroy();
    }

    currentRoom = useChild(() => RoomComponent(parsedUrl.roomName));

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
        "Couldn't find a layer with obj_mainchara; setting player entity parent to room instead of layer",
      );
      currentRoom.addChild(playerEntity);
    }

    switch (parsedUrl.type) {
      case "position": {
        setPlayerPosition(parsedUrl.position);
        break;
      }
      case "game-object": {
        for (const layer of Object.values(currentRoom.rootComponent.layers)) {
          if (layer.rootComponent.data.type === "Instances") {
            for (const instance of layer.rootComponent.data.instances) {
              if (instance.objectName === parsedUrl.gameObjectName) {
                setPlayerPosition(new Vector(instance.x, instance.y));
                setDepth(playerEntity, layer.rootComponent.data.depth);
                return;
              }
            }
          }
        }

        throw new Error(
          `Could not find game object named ${JSON.stringify(parsedUrl.gameObjectName)} in room ${JSON.stringify(parsedUrl.roomName)}.`,
        );
      }
      default: {
        assertNever(parsedUrl);
      }
    }
  };

  const api: RoomRouterApi = {
    goTo: useCallbackAsCurrent(goTo) as RoomRouterApi["goTo"],
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
