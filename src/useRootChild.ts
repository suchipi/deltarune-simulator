import { useRootEntity, Entity, Component } from "@hex-engine/2d";

export function useRootChild<T>(componentFunction: () => T): Entity & {
  rootComponent: T extends {} ? T & Component : Component;
} {
  const rootEntity = useRootEntity();
  // HACK: using unexported Entity._create
  return (rootEntity.constructor as any)._create(componentFunction, rootEntity);
}
