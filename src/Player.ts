import {
  useType,
  useNewComponent,
  Polygon,
  Vector,
  Shape,
} from "@hex-engine/2d";
import PlayerBody from "./PlayerBody";
import PlayerControls from "./PlayerControls";
import PlayerRenderer from "./PlayerRenderer";
import { useRootChild } from "./useRootChild";

export default function Player(
  position: Vector,
  asepriteData: AsepriteLoader.Data,
  originOffset: Vector = new Vector(0, 0),
  shape: Shape = Polygon.rectangle(16, 16)
) {
  useType(Player);

  const { movementVector } = useNewComponent(() => PlayerControls(0.15));
  useNewComponent(() => PlayerBody(position, movementVector, shape));
  useRootChild(() =>
    PlayerRenderer(asepriteData, movementVector, position, originOffset)
  );
}
