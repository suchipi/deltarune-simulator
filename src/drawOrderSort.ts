import { Component, Entity, useRootEntity } from "@hex-engine/2d";
import { Camera } from "./Camera";
import { BackgroundLayer } from "./useBackgroundDraw";
import { ForegroundLayer } from "./useForegroundDraw";

// Copied from hex-engine internals
function isDebugOverlay(
  component: Component,
  storage: { [key: PropertyKey]: any } | undefined
) {
  if (!storage) return false;

  return storage.componentsWithDebugOverlayDrawTime.has(component);
}

// Debug overlay parts based off of hex-engine internals
export function drawOrderSort(entities: Array<Entity>): Array<Component> {
  const cameras: Array<Component> = [];
  const backgrounds: Array<Component> = [];
  const objects: Array<Component> = [];
  const debugOverlays: Array<Component> = [];

  const storageForIsDebugOverlay = Array.from(useRootEntity().components).find(
    (comp) => comp.type?.name === "StorageForDebugOverlayDrawTime"
  );

  // Start sorted by id (so that later-created entities are drawn above
  // earlier-created entities)
  for (const ent of [...entities].sort((entA, entB) => entA.id - entB.id)) {
    for (const component of ent.components) {
      if (component.type === Camera) {
        cameras.push(component);
      } else if (component.type === BackgroundLayer) {
        backgrounds.push(component);
      } else if (component.type === ForegroundLayer) {
        backgrounds.push(component);
      } else if (isDebugOverlay(component, storageForIsDebugOverlay)) {
        debugOverlays.push(component);
      } else {
        objects.push(component);
      }
    }
  }

  return [...cameras, ...backgrounds, ...objects, ...debugOverlays];
}
