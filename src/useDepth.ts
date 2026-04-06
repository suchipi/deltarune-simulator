import { Entity, useNewComponent, useType } from "@hex-engine/2d";

export function Depth(depth: number) {
  useType(Depth);
  return { depth };
}

export function useDepth(depth: number) {
  useNewComponent(() => Depth(depth));
}

const entityDepthCache = new WeakMap<Entity, number>();

export function setDepth(entity: Entity, depth: number) {
  const depthComponent = entity.getComponent(Depth);
  if (depthComponent) {
    depthComponent.depth = depth;
  } else {
    entity.addComponent(() => Depth(depth));
  }

  entityDepthCache.set(entity, depth);
}

export function getDepth(ent: Entity): number {
  const cachedDepth = entityDepthCache.get(ent);
  if (cachedDepth != null) {
    return cachedDepth;
  }

  const depthComponent = ent.getComponent(Depth);
  if (depthComponent != null) {
    entityDepthCache.set(ent, depthComponent.depth);
    return depthComponent.depth;
  }

  const ancestors = ent.ancestors();
  for (const ancestor of ancestors.toReversed()) {
    const ancestorDepthComponent = ancestor.getComponent(Depth);
    if (ancestorDepthComponent != null) {
      entityDepthCache.set(ent, ancestorDepthComponent.depth);
      return ancestorDepthComponent.depth;
    }
  }

  entityDepthCache.set(ent, 0);
  return 0;
}
