import {
  useType,
  useNewComponent,
  Polygon,
  Vector,
  Shape,
  useChild,
  ReadOnlyVector,
} from "@hex-engine/2d";
import PlayerBody from "./PlayerBody";
import PlayerControls from "./PlayerControls";
import PlayerRenderer from "./PlayerRenderer";
import { useDepth } from "./useDepth";

export default function Player(
  position: Vector,
  asepriteData: AsepriteLoader.Data,
  originOffset: ReadOnlyVector = Vector.ZERO,
  shape: Shape = Polygon.rectangle(16, 16),
) {
  useType(Player);

  useDepth(0);

  const { movementVector } = useNewComponent(() => PlayerControls(0.15));
  const playerBody = useNewComponent(() =>
    PlayerBody(position, movementVector, shape),
  );
  useChild(() => PlayerRenderer(asepriteData, movementVector, originOffset));

  return {
    position: position as ReadOnlyVector,
    setPosition(newPosition: Vector) {
      playerBody.body.setPosition(newPosition);
    },
  };
}
