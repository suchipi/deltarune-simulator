import { useNewComponent, useType } from "@hex-engine/2d";
import { RoomInstanceJson } from "../rooms/RoomJson";

const requireObject = require.context(".", false, /obj_[^.]+\.ts$/);

const objectNames = new Set(
  requireObject
    .keys()
    .map((relativePath) => relativePath.match(/.\/([^.]+)\.ts$/)![1]),
);

export function GameObject(instance: RoomInstanceJson) {
  useType(GameObject);

  if (!objectNames.has(instance.objectName)) {
    console.warn(`Unsupported GameObject: ${instance.objectName}`);
  } else {
    const GameObjectComponent = requireObject(`./${instance.objectName}.ts`)[
      instance.objectName
    ];

    return {
      gameObject: useNewComponent(() => GameObjectComponent(instance)),
    };
  }

  return {
    gameObject: null,
  };
}
