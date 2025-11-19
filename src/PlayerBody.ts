import {
  useType,
  useNewComponent,
  Geometry,
  Vector,
  useUpdate,
  Physics,
  Shape,
  useEntityTransforms,
} from "@hex-engine/2d";
import { roundToEven } from "./utils/round-to-even";

export default function PlayerBody(
  initialPosition: Vector,
  movementVector: Vector,
  shape: Shape
) {
  useType(PlayerBody);

  const position = initialPosition.clone();

  // Convert relative position to world position, for physics engine
  useEntityTransforms().matrixForWorldPosition().transformPointMutate(position);

  // Keep pixel-aligned
  position.x = roundToEven(position.x);
  position.y = roundToEven(position.y);

  const geometry = useNewComponent(() =>
    Geometry({
      shape,
      position,
    })
  );

  const body = useNewComponent(() => Physics.Body(geometry));

  useUpdate((delta) => {
    body.setVelocity(movementVector);
    body.setAngularVelocity(0);
  });
}
