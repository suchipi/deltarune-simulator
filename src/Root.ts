import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Vector,
  Physics,
} from "@hex-engine/2d";
import Player from "./Player";
// import DramaticSound from "./DramaticSound";

import krisLightWorld from "./characters/kris-lightworld.aseprite";
import RoomKrisHallway from "./rooms/krishallway/RoomKrisHallway";

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

  // useNewComponent(() => DramaticSound());

  useChild(() =>
    RoomKrisHallway(canvasCenter, () => {
      useChild(() =>
        Player(new Vector(0, 0), krisLightWorld, new Vector(0, 20))
      );
    })
  );
}
