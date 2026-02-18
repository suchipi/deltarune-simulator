import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
} from "@hex-engine/2d";

export type SensorCallbacks = {
  onStart?: (info: Physics.CollisionEventInfo) => void;
  onEnd?: (info: Physics.CollisionEventInfo) => void;
};

export default function Sensor(
  position: Vector,
  size: Vector,
  callbacks: SensorCallbacks,
) {
  useType(Sensor);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position: position.add(size.divide(2)),
    }),
  );

  const body = useNewComponent(() =>
    Physics.Body(geometry, {
      isStatic: true,
      isSensor: true,
    }),
  );

  if (callbacks.onStart || callbacks.onEnd) {
    body.onCollision((info) => {
      if (callbacks.onStart && info.kind === "start") {
        callbacks.onStart.call(null, info);
      } else if (callbacks.onEnd && info.kind === "end") {
        callbacks.onEnd.call(null, info);
      }
    });
  }
}
