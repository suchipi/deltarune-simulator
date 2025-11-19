import {
  useType,
  useNewComponent,
  Polygon,
  Vector,
  useChild,
  Shape,
} from "@hex-engine/2d";
import PlayerBody from "./PlayerBody";
import PlayerControls from "./PlayerControls";
import PlayerRenderer from "./PlayerRenderer";

export default function Player(
  initialPosition: Vector,
  asepriteData: AsepriteLoader.Data,
  shape: Shape = Polygon.rectangle(16, 16),
  originOffset: Vector = new Vector(0, 0)
) {
  useType(Player);

  const { movementVector } = useNewComponent(() => PlayerControls(0.15));
  useNewComponent(() => PlayerBody(initialPosition, movementVector, shape));
  useChild(() => PlayerRenderer(asepriteData, movementVector, originOffset));
}
