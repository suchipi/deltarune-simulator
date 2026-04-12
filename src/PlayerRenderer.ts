import {
  useType,
  useNewComponent,
  Vector,
  useDraw,
  Aseprite,
  useUpdate,
  ReadOnlyVector,
} from "@hex-engine/2d";
import { roundToEven } from "./utils/roundToEven";

export type PlayerFacingDirection = "up" | "down" | "left" | "right";

export default function PlayerRenderer(
  asepriteData: AsepriteLoader.Data,
  movementVector: Vector,
  originOffset: ReadOnlyVector = Vector.ZERO,
) {
  useType(PlayerRenderer);

  const sprite = useNewComponent(() => Aseprite(asepriteData));

  let facingDirection: PlayerFacingDirection | null = null;
  let isWalking = false;

  const animations = {
    up: {
      idle: sprite.animations["up-idle"] || sprite.currentAnim,
      walk: sprite.animations["up-walk"] || sprite.currentAnim,
    },
    down: {
      idle: sprite.animations["down-idle"] || sprite.currentAnim,
      walk: sprite.animations["down-walk"] || sprite.currentAnim,
    },
    left: {
      idle: sprite.animations["left-idle"] || sprite.currentAnim,
      walk: sprite.animations["left-walk"] || sprite.currentAnim,
    },
    right: {
      idle: sprite.animations["right-idle"] || sprite.currentAnim,
      walk: sprite.animations["right-walk"] || sprite.currentAnim,
    },
  };

  sprite.currentAnim = animations.down.idle;
  sprite.currentAnim.play();

  // avoiding using Geometry component as it puts this transform into the
  // hierarchy. I want parent/child hierarchy without transform hierarchy, for
  // physics engine reasons. I need to make this better in hex-engine.
  const bounds = new Vector(
    roundToEven(sprite.data.width),
    roundToEven(sprite.data.height),
  );

  useUpdate((delta) => {
    switch (true) {
      case movementVector.y < 0: {
        facingDirection = "up";
        isWalking = true;
        break;
      }
      case movementVector.y > 0: {
        facingDirection = "down";
        isWalking = true;
        break;
      }
      case movementVector.x < 0: {
        facingDirection = "left";
        isWalking = true;
        break;
      }
      case movementVector.x > 0: {
        facingDirection = "right";
        isWalking = true;
        break;
      }
      default: {
        isWalking = false;
      }
    }

    const animBefore = sprite.currentAnim;
    sprite.currentAnim =
      animations[facingDirection || "down"][isWalking ? "walk" : "idle"] ??
      animBefore;

    if (sprite.currentAnim !== animBefore) {
      animBefore.pause();
      sprite.currentAnim.play();
    }
  });

  useDraw(
    (context) => {
      context.translate(-bounds.x / 2, -bounds.y / 2);
      context.translate(originOffset.x, originOffset.y);
      sprite.draw(context);
    },
    { roundToNearestPixel: true },
  );

  return {
    get facingDirection() {
      return facingDirection;
    },
    get isWalking() {
      return isWalking;
    },
    setFacingDirection: (direction: PlayerFacingDirection) => {
      facingDirection = direction;
    },
  };
}
