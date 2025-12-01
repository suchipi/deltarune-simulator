import {
  useType,
  useNewComponent,
  Canvas,
  Vector,
  Physics,
} from "@hex-engine/2d";
import Player from "./Player";
// import DramaticSound from "./DramaticSound";
import { useRootChild } from "./useRootChild";

import krisLightWorld from "./characters/kris-lightworld.aseprite";
import RoomKrisHallway from "./rooms/krishallway/RoomKrisHallway";
import { Camera } from "./Camera";

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

  useNewComponent(() => Camera(canvasCenter.multiply(-1)));

  // useNewComponent(() => DramaticSound());

  useRootChild(() => RoomKrisHallway(new Vector(0, 0)));
  useRootChild(() =>
    Player(new Vector(0, 0), krisLightWorld, new Vector(-1, -10))
  );

  return {
    canvasCenter,
  };
}
