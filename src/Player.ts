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

export default function Player(initialPosition: Vector) {
  useType(Player);

  const position = initialPosition.clone();

  const aseprite = useNewComponent(() => Aseprite(placeholder));

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(
        new Vector(aseprite.data.width, aseprite.data.height)
      ),
      position,
    })
  );

  const keyboard = useNewComponent(Keyboard);

  const speed = 0.3;

  let movementVector = new Vector(0, 0);
  useUpdate((delta) => {
    movementVector.x = 0;
    movementVector.y = 0;

    if (keyboard.pressed.has("ArrowDown")) {
      position.addYMutate(1);
    }
    if (keyboard.pressed.has("ArrowUp")) {
      position.subtractYMutate(1);
    }
    if (keyboard.pressed.has("ArrowLeft")) {
      position.subtractXMutate(1);
    }
    if (keyboard.pressed.has("ArrowRight")) {
      position.addXMutate(1);
    }

    if (movementVector.x !== 0 || movementVector.y !== 0) {
      const magnitude = Math.floor(speed * delta);
      movementVector.normalizeMutate().multiplyMutate(magnitude);
      position.addMutate(movementVector);

      // keep pixel-aligned
      position.roundDownMutate();
    }
  });

  useDraw((context) => {
    aseprite.draw(context);
  });

  return {
    movementVector,
  };
}
