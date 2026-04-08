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
import { setDepth } from "../useDepth";
import { fromGameObjectPath, GameObjectPath } from "./connections";

export type RoomRouterApi = {
  goTo(gameObjectPath: GameObjectPath): void;
  goTo(roomName: RoomName, position: Vector): void;
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

  const goTo: RoomRouterApi["goTo"] = function goTo(...args: any) {
    console.log("goTo", ...args);

    let roomName: RoomName;
    let position: Vector | null = null;
    let gameObjectPath: GameObjectPath | null = null;
    if (args.length === 2) {
      [roomName, position] = args;
    } else {
      [gameObjectPath] = args;
      ({ roomName } = fromGameObjectPath(gameObjectPath!));
    }

    // just for fun
    location.hash =
      gameObjectPath ?? `/${roomName}/${position?.x},${position?.y}`;

    playerEntity.parent?.removeChild(playerEntity);

    if (currentRoom != null) {
      currentRoom.destroy();
    }

    currentRoom = useChild(() => RoomComponent(roomName));

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

    if (position != null) {
      setPlayerPosition(position);
    } else if (gameObjectPath != null) {
      const { gameObjectName } = fromGameObjectPath(gameObjectPath);
      for (const layer of Object.values(currentRoom.rootComponent.layers)) {
        if (layer.rootComponent.data.type === "Instances") {
          for (const instance of layer.rootComponent.data.instances) {
            if (instance.objectName === gameObjectName) {
              setPlayerPosition(new Vector(instance.x, instance.y));
              setDepth(playerEntity, layer.rootComponent.data.depth);
              return;
            }
          }
        }
      }

      throw new Error(
        `Could not find game object named ${JSON.stringify(gameObjectName)} in room ${JSON.stringify(roomName)}.`,
      );
    } else {
      throw new Error(
        `RoomRouterApi.goTo didn't have either position or gameObjectPath`,
      );
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
