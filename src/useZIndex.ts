import { useNewComponent, useType } from "@hex-engine/2d";

export function ZIndex(zIndex: number) {
  useType(ZIndex);
  return { zIndex };
}

export function useZIndex(zIndex: number) {
  useNewComponent(() => ZIndex(zIndex));
}
