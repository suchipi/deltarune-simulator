import { Component, Entity, useRootEntity } from "@hex-engine/2d";
import { Camera } from "./Camera";
import { getDepth } from "./useDepth";

// Copied from hex-engine internals
function isDebugOverlay(
  component: Component,
  storage: { [key: PropertyKey]: any } | undefined,
) {
  if (!storage) return false;

  return storage.componentsWithDebugOverlayDrawTime.has(component);
}

// Debug overlay parts based off of hex-engine internals
export function drawOrderSort(entities: Array<Entity>): Array<Component> {
  const cameras: Array<Component> = [];
  const objects: Array<[Component, number | null]> = [];
  const debugOverlays: Array<Component> = [];

  const storageForIsDebugOverlay = Array.from(useRootEntity().components).find(
    (comp) => comp.type?.name === "StorageForDebugOverlayDrawTime",
  );

  // Start sorted by id (so that later-created entities are drawn above
  // earlier-created entities)
  const entsSortedById = entities.toSorted((entA, entB) => entA.id - entB.id);

  for (const ent of entsSortedById) {
    const depth = getDepth(ent);

    for (const component of ent.components) {
      if (component.type === Camera) {
        cameras.push(component);
      } else if (isDebugOverlay(component, storageForIsDebugOverlay)) {
        debugOverlays.push(component);
      } else {
        objects.push([component, depth]);
      }
    }
  }

  const objectsSortedByDepth = objects
    .toSorted((a, b) => Math.abs(a[1] ?? 0) - Math.abs(b[1] ?? 0))
    .map((x) => x[0]);

  return [...cameras, ...objectsSortedByDepth, ...debugOverlays];
}
