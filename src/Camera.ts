import {
  Component,
  Polygon,
  useCallbackAsCurrent,
  useNewComponent,
  useRawDraw,
  useType,
  useUpdate,
  Vector,
} from "@hex-engine/2d";

export function CameraFollow(
  cameraPosition: Vector,
  initialFollowTarget: Vector,
  initialAxisAlignedBoundingBox: Polygon
) {
  useType(CameraFollow);

  let followTarget = initialFollowTarget;
  function setFollowTarget(target: Vector) {
    followTarget = target;
  }

  let axisAlignedBoundingBox = initialAxisAlignedBoundingBox;
  let halfWidth = axisAlignedBoundingBox.width / 2;
  let halfHeight = axisAlignedBoundingBox.height / 2;
  function setAxisAlignedBoundingBox(aabb: Polygon) {
    axisAlignedBoundingBox = aabb;
    halfWidth = aabb.width / 2;
    halfHeight = aabb.height / 2;
  }

  useUpdate(() => {
    const leftEdge = followTarget.x - halfWidth;
    const rightEdge = followTarget.x + halfWidth;
    const topEdge = followTarget.y - halfHeight;
    const bottomEdge = followTarget.y + halfHeight;

    if (cameraPosition.x < leftEdge) {
      cameraPosition.x--;
    } else if (cameraPosition.x > rightEdge) {
      cameraPosition.x++;
    }
    if (cameraPosition.y < topEdge) {
      cameraPosition.y--;
    } else if (cameraPosition.y > bottomEdge) {
      cameraPosition.y++;
    }
  });

  return {
    setFollowTarget,
    setAxisAlignedBoundingBox,
  };
}

export function Camera(position: Vector) {
  useType(Camera);

  useRawDraw((context) => {
    context.translate(position.x, position.y);
  });

  let follow: (Component & ReturnType<typeof CameraFollow>) | null = null;
  const defaultAABB = Polygon.rectangle(200, 200);
  function setFollowTarget(
    target: Vector | null,
    axisAlignedBoundingBox: Polygon = defaultAABB
  ) {
    if (target == null) {
      if (follow != null) {
        follow.disable();
      }
    } else {
      if (follow == null) {
        follow = useNewComponent(() =>
          CameraFollow(position, target, axisAlignedBoundingBox)
        );
      } else {
        follow.setFollowTarget(target);
        follow.setAxisAlignedBoundingBox(axisAlignedBoundingBox);
      }
    }
  }

  return {
    position,
    setFollowTarget: useCallbackAsCurrent(setFollowTarget),
  };
}
