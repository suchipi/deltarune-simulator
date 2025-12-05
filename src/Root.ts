import {
  useType,
  useNewComponent,
  Canvas,
  Vector,
  Physics,
  useChild,
  useUpdate,
} from "@hex-engine/2d";
import Player from "./Player";
// import DramaticSound from "./DramaticSound";
import RoomKrisHallway from "./rooms/krishallway/RoomKrisHallway";
import { Camera } from "./Camera";
import { RoomRouter } from "./rooms/RoomRouter";

import krisLightWorld from "./characters/kris-lightworld.aseprite";
import DrawOrder, {
  useCanvasDrawOrderSort,
} from "@hex-engine/2d/src/Canvas/DrawOrder";
import { drawOrderSort } from "./drawOrderSort";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "black" }));
  canvas.fullscreen({ pixelZoom: 2 });
  canvas.setPixelated(true);

  useNewComponent(() => Canvas.DrawOrder(drawOrderSort));

  useNewComponent(() =>
    Physics.Engine({
      debugDraw: true,
      enableSleeping: true,
      gravity: new Vector(0, 0),
    })
  );

  // useNewComponent(() => DramaticSound());

  const player = useChild(() =>
    Player(new Vector(0, 0), krisLightWorld, new Vector(-1, -10))
  );

  const camera = useNewComponent(() => Camera(player.rootComponent.position));
  // useUpdate(() => {
  //   camera.position.mutateInto(player.rootComponent.position);
  // });

  const router = useNewComponent(() =>
    RoomRouter(player.rootComponent.setPosition)
  );
  router.goTo(RoomKrisHallway, "playerSpawn");
}
