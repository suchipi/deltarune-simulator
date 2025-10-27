import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  useDraw,
  Aseprite,
  useUpdate,
  Keyboard,
} from "@hex-engine/2d";

import placeholder from "./characters/placeholder.aseprite";
import krisLightWorld from "./characters/kris-lightworld.aseprite";

export default function Player(initialPosition: Vector) {
  useType(Player);

  const position = initialPosition.clone();

  const sprite = useNewComponent(() => Aseprite(krisLightWorld));
  sprite.currentAnim = sprite.animations["down-idle"];
  sprite.currentAnim.play();

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(
        new Vector(sprite.data.width, sprite.data.height)
      ),
      position,
    })
  );

  const keyboard = useNewComponent(Keyboard);

  const speed = 0.15;

  let movementVector = new Vector(0, 0);
  useUpdate((delta) => {
    movementVector.x = 0;
    movementVector.y = 0;

    if (keyboard.pressed.has("ArrowDown")) {
      movementVector.addYMutate(1);
    }
    if (keyboard.pressed.has("ArrowUp")) {
      movementVector.subtractYMutate(1);
    }
    if (keyboard.pressed.has("ArrowLeft")) {
      movementVector.subtractXMutate(1);
    }
    if (keyboard.pressed.has("ArrowRight")) {
      movementVector.addXMutate(1);
    }

    if (movementVector.x !== 0 || movementVector.y !== 0) {
      const magnitude = Math.floor(speed * delta);
      movementVector.multiplyMutate(magnitude);
      position.addMutate(movementVector);

      // keep pixel-aligned
      position.roundDownMutate();
    }

    const animBefore = sprite.currentAnim;
    switch (true) {
      case movementVector.y < 0: {
        sprite.currentAnim = sprite.animations["up-walk"];
        break;
      }
      case movementVector.y > 0: {
        sprite.currentAnim = sprite.animations["down-walk"];
        break;
      }
      case movementVector.x < 0: {
        sprite.currentAnim = sprite.animations["left-walk"];
        break;
      }
      case movementVector.x > 0: {
        sprite.currentAnim = sprite.animations["right-walk"];
        break;
      }
      default: {
        switch (animBefore) {
          case sprite.animations["up-walk"]: {
            sprite.currentAnim = sprite.animations["up-idle"];
            break;
          }
          case sprite.animations["down-walk"]: {
            sprite.currentAnim = sprite.animations["down-idle"];
            break;
          }
          case sprite.animations["left-walk"]: {
            sprite.currentAnim = sprite.animations["left-idle"];
            break;
          }
          case sprite.animations["right-walk"]: {
            sprite.currentAnim = sprite.animations["right-idle"];
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
    sprite.draw(context);
  });

  return {
    movementVector,
  };
}
