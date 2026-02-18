import { Entity, useNewComponent, useType } from "@hex-engine/2d";

export function Depth(depth: number) {
  useType(Depth);
  return { depth };
}

export function useDepth(depth: number) {
  useNewComponent(() => Depth(depth));
}

export function setDepth(entity: Entity, depth: number) {
  const zIndexComponent = entity.getComponent(Depth);
  if (zIndexComponent) {
    zIndexComponent.depth = depth;
  } else {
    entity.addComponent(() => Depth(depth));
  }
}
