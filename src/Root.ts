import {
  useType,
  useNewComponent,
  Canvas,
  Vector,
  Physics,
  useChild,
} from "@hex-engine/2d";
import Player from "./Player";
import krisLightWorld from "./characters/kris-lightworld.aseprite";
// import DramaticSound from "./DramaticSound";
import { Camera } from "./Camera";
import { RoomRouter } from "./rooms/RoomRouter";
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
    }),
  );

  // useNewComponent(() => DramaticSound());

  const player = useChild(() =>
    // initial player position matches playerSpawn position in first room so
    // player doesn't teleport on first frame
    Player(new Vector(255, 130), krisLightWorld, new Vector(-1, -10)),
  );

  const camera = useNewComponent(() => Camera(player.rootComponent.position));
  // useUpdate(() => {
  //   camera.position.mutateInto(player.rootComponent.position);
  // });

  const router = useNewComponent(() =>
    RoomRouter(player, player.rootComponent.setPosition),
  );

  if (location.hash) {
    const roomUrlFromHash = location.hash.slice(1); /* remove leading # */
    try {
      router.goTo(roomUrlFromHash as any);
    } catch (err) {
      console.warn(
        `Invalid room url from location hash: ${roomUrlFromHash}`,
        err,
      );
      router.goTo("/room_krisroom/obj_markerB");
    }
  } else {
    router.goTo("/room_krisroom/obj_markerB");
  }
}
