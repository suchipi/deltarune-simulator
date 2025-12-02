import {
  useType,
  useNewComponent,
  Polygon,
  Vector,
  Shape,
  useChild,
} from "@hex-engine/2d";
import PlayerBody from "./PlayerBody";
import PlayerControls from "./PlayerControls";
import PlayerRenderer from "./PlayerRenderer";

export default function Player(
  position: Vector,
  asepriteData: AsepriteLoader.Data,
  originOffset: Vector = new Vector(0, 0),
  shape: Shape = Polygon.rectangle(16, 16)
) {
  useType(Player);

  const { movementVector } = useNewComponent(() => PlayerControls(0.15));
  useNewComponent(() => PlayerBody(position, movementVector, shape));
  useChild(() => PlayerRenderer(asepriteData, movementVector, originOffset));
}
