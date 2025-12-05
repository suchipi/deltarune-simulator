import { useDraw, useNewComponent, useType } from "@hex-engine/2d";

export function BackgroundLayer(
  drawCallback: (context: CanvasRenderingContext2D) => void
) {
  useType(BackgroundLayer);

  useDraw(drawCallback);
}

export function useBackgroundDraw(
  drawCallback: (context: CanvasRenderingContext2D) => void
) {
  useNewComponent(() => BackgroundLayer(drawCallback));
}
