import {
  useType,
  useNewComponent,
  Geometry,
  Vector,
  useUpdate,
  Physics,
  Shape,
} from "@hex-engine/2d";

export default function PlayerBody(
  position: Vector,
  movementVector: Vector,
  shape: Shape
) {
  useType(PlayerBody);

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

  return {
    body,
  };
}
