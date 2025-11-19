import {
  useType,
  useNewComponent,
  Vector,
  useUpdate,
  Keyboard,
} from "@hex-engine/2d";

export default function PlayerControls(speed: number) {
  useType(PlayerControls);

  const keyboard = useNewComponent(Keyboard);

  const movementVector = new Vector(0, 0);
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
    }
  });

  return {
    movementVector,
  };
}
