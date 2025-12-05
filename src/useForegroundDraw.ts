import { useDraw, useNewComponent, useType } from "@hex-engine/2d";

export function ForegroundLayer(
  drawCallback: (context: CanvasRenderingContext2D) => void
) {
  useType(ForegroundLayer);

  useDraw(drawCallback);
}

export function useForegroundDraw(
  drawCallback: (context: CanvasRenderingContext2D) => void
) {
  useNewComponent(() => ForegroundLayer(drawCallback));
}
