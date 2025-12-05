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

  const camera = useNewComponent(() => Camera(Vector.ZERO.clone()));

  // useNewComponent(() => DramaticSound());

  const player = useChild(() =>
    Player(new Vector(0, 0), krisLightWorld, new Vector(-1, -10))
  );

  const router = useNewComponent(() =>
    RoomRouter(player.rootComponent.setPosition)
  );
  router.goTo(RoomKrisHallway);

  useUpdate(() => {
    camera.position.mutateInto(player.rootComponent.position);
  });
}
