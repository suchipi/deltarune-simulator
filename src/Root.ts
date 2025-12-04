import {
  useType,
  useNewComponent,
  Canvas,
  Vector,
  Physics,
  useChild,
} from "@hex-engine/2d";
import Player from "./Player";
// import DramaticSound from "./DramaticSound";

import krisLightWorld from "./characters/kris-lightworld.aseprite";
import RoomKrisHallway from "./rooms/krishallway/RoomKrisHallway";
import { Camera } from "./Camera";
import { DebugLine } from "./DebugLine";
import { DebugPoint } from "./DebugPoint";
import RoomKrisRoom from "./rooms/krisroom/RoomKrisRoom";
import { RoomRouter } from "./rooms/RoomRouter";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "black" }));
  canvas.fullscreen({ pixelZoom: 2 });
  canvas.setPixelated(true);

  useNewComponent(() =>
    Physics.Engine({
      debugDraw: true,
      enableSleeping: true,
      gravity: new Vector(0, 0),
    })
  );

  const canvasCenter = new Vector(
    canvas.element.width / 2,
    canvas.element.height / 2
  ).roundDownMutate();

  // World origin indicator for debugging
  // useChild(() => DebugLine(new Vector(-20, 0), new Vector(20, 0)));
  // useChild(() => DebugLine(new Vector(0, -20), new Vector(0, 20)));
  // useChild(() => DebugPoint(new Vector(0, 0)));

  const camera = useNewComponent(() => Camera(canvasCenter));
  // camera.position.subtractMutate(room.rootComponent.bounds.divide(2));

  // useNewComponent(() => DramaticSound());

  const playerPosition = new Vector(0, 0);

  const router = useNewComponent(() => RoomRouter(playerPosition));

  const player = useChild(() =>
    Player(playerPosition, krisLightWorld, new Vector(-1, -10))
  );

  router.api.goTo(RoomKrisHallway);

  return {
    canvasCenter,
  };
}
