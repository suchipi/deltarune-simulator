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

  const camera = useNewComponent(() => Camera(new Vector(0, 0)));

  // useNewComponent(() => DramaticSound());

  const room = useRootChild(() => RoomKrisHallway());

  // TODO why not centered? need a nice grid thing for debugging
  camera.position.mutateInto(room.rootComponent.bounds.divide(2));

  useRootChild(() =>
    Player(
      room.rootComponent.playerSpawn.position.clone(),
      krisLightWorld,
      new Vector(-1, -10)
    )
  );

  return {
    canvasCenter,
  };
}
