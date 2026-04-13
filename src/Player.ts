import {
  useType,
  useNewComponent,
  Polygon,
  Vector,
  Shape,
  useChild,
  ReadOnlyVector,
  Entity,
} from "@hex-engine/2d";
import PlayerBody from "./PlayerBody";
import PlayerControls from "./PlayerControls";
import PlayerRenderer, { PlayerFacingDirection } from "./PlayerRenderer";
import { useDepth } from "./useDepth";

export default function Player(
  position: Vector,
  asepriteData: AsepriteLoader.Data,
  originOffset: ReadOnlyVector = Vector.ZERO,
  shape: Shape = Polygon.rectangle(16, 16),
) {
  useType(Player);

  useDepth(0);

  const { movementVector, forceClearHeldKey } = useNewComponent(() =>
    PlayerControls(0.15),
  );
  const playerBody = useNewComponent(() =>
    PlayerBody(position, movementVector, shape),
  );
  const playerRenderer = useChild(() =>
    PlayerRenderer(asepriteData, movementVector, originOffset),
  );

  return {
    position: position as ReadOnlyVector,
    setPosition: playerBody.body.setPosition.bind(playerBody.body),
    getFacingDirection: () => playerRenderer.rootComponent.facingDirection,
    setFacingDirection: playerRenderer.rootComponent.setFacingDirection,
    forceClearHeldKey,
  };
}

export function isPlayer(entity: Entity) {
  return (
    "rootComponent" in entity &&
    typeof entity.rootComponent === "object" &&
    entity.rootComponent != null &&
    "type" in entity.rootComponent &&
    entity.rootComponent.type === Player
  );
}
