import { Entity, useNewComponent, useType } from "@hex-engine/2d";

export function Depth(depth: number) {
  useType(Depth);
  return { depth };
}

export function useDepth(depth: number) {
  useNewComponent(() => Depth(depth));
}

export function setDepth(entity: Entity, depth: number) {
  const depthComponent = entity.getComponent(Depth);
  if (depthComponent) {
    depthComponent.depth = depth;
  } else {
    entity.addComponent(() => Depth(depth));
  }
}

export function getDepth(ent: Entity): number {
  const depthComponent = ent.getComponent(Depth);
  if (depthComponent != null) {
    return depthComponent.depth;
  }

  const ancestors = ent.ancestors();
  for (const ancestor of ancestors.toReversed()) {
    const ancestorDepthComponent = ancestor.getComponent(Depth);
    if (ancestorDepthComponent != null) {
      return ancestorDepthComponent.depth;
    }
  }

  return 0;
}
