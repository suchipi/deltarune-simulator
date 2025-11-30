import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  useDraw,
  Aseprite,
  useUpdate,
  useEntityTransforms,
} from "@hex-engine/2d";
import { roundToEven } from "./utils/round-to-even";

export default function PlayerRenderer(
  asepriteData: AsepriteLoader.Data,
  movementVector: Vector,
  position: Vector,
  originOffset: Vector = new Vector(0, 0)
) {
  useType(PlayerRenderer);

  const sprite = useNewComponent(() => Aseprite(asepriteData));

  const animations = {
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
    up: {
      idle: sprite.animations["up-idle"] || sprite.currentAnim,
      walk: sprite.animations["up-walk"] || sprite.currentAnim,
    },
  };

  sprite.currentAnim = animations.down.idle;
  sprite.currentAnim.play();

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(
        new Vector(
          roundToEven(sprite.data.width),
          roundToEven(sprite.data.height)
        )
      ),
      position: position,
    })
  );

  useUpdate((delta) => {
    const animBefore = sprite.currentAnim;
    switch (true) {
      case movementVector.y < 0: {
        sprite.currentAnim = animations.up.walk;
        break;
      }
      case movementVector.y > 0: {
        sprite.currentAnim = animations.down.walk;
        break;
      }
      case movementVector.x < 0: {
        sprite.currentAnim = animations.left.walk;
        break;
      }
      case movementVector.x > 0: {
        sprite.currentAnim = animations.right.walk;
        break;
      }
      default: {
        switch (animBefore) {
          case animations.up.walk: {
            sprite.currentAnim = animations.up.idle;
            break;
          }
          case animations.down.walk: {
            sprite.currentAnim = animations.down.idle;
            break;
          }
          case animations.left.walk: {
            sprite.currentAnim = animations.left.idle;
            break;
          }
          case animations.right.walk: {
            sprite.currentAnim = animations.right.idle;
            break;
          }
        }
      }
    }

    if (sprite.currentAnim !== animBefore) {
      animBefore.pause();
      sprite.currentAnim.play();
    }
  });

  useDraw((context) => {
    context.translate(originOffset.x, originOffset.y);
    sprite.draw(context);
  });
}
