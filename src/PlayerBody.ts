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
  position: Vector,
  movementVector: Vector,
  shape: Shape
) {
  useType(PlayerBody);

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
