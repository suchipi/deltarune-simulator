import { useEntityName, useNewComponent, useType } from "@hex-engine/2d";
import { RoomInstanceJson } from "../rooms/RoomJson";
import { DefaultGameObject } from "./DefaultGameObject";

const requireObject = require.context(".", false, /obj_[^.]+\.ts$/);

const objectNames = new Set(
  requireObject
    .keys()
    .map((relativePath) => relativePath.match(/.\/([^.]+)\.ts$/)![1]),
);

export function GameObject(instance: RoomInstanceJson) {
  useType(GameObject);

  useEntityName(instance.objectName);

  if (!objectNames.has(instance.objectName)) {
    return {
      instance,
      gameObject: useNewComponent(() => DefaultGameObject(instance)),
    };
  } else {
    const GameObjectComponent = requireObject(`./${instance.objectName}.ts`)[
      instance.objectName
    ];

    return {
      instance,
      gameObject: useNewComponent(() => GameObjectComponent(instance)),
    };
  }
}
