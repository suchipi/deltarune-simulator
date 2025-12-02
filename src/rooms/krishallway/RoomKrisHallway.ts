import {
  useType,
  useNewComponent,
  Vector,
  useDraw,
  Image,
} from "@hex-engine/2d";
import mainUrl from "./main.png";
import mirrorUrl from "./mirror.png";
import { makeWallBuilder } from "../../Wall";
import { PlayerSpawn } from "../../PlayerSpawn";

export default function RoomKrisHallway() {
  useType(RoomKrisHallway);

  const mainImage = useNewComponent(() => Image({ url: mainUrl }));
  const mirrorImage = useNewComponent(() => Image({ url: mirrorUrl }));

  const bounds = new Vector(540, 240);

  const zeroVector = new Vector(0, 0);
  useDraw((context) => {
    mirrorImage.draw(context, zeroVector);
    // TODO player reflections go here
    mainImage.draw(context, zeroVector);
  });

  const wallBuilder = makeWallBuilder(zeroVector);

  wallBuilder.makeWall(40, 108, 60, 177);
  wallBuilder.makeWall(57, 166, 479, 184);
  wallBuilder.makeWall(479, 123, 504, 167);
  wallBuilder.makeWall(457, 108, 476, 127);
  wallBuilder.makeWall(61, 109, 281, 126);
  wallBuilder.makeWall(172, 114, 223, 134);
  wallBuilder.makeWall(239, 113, 257, 131);
  wallBuilder.makeWall(314, 107, 418, 127);
  wallBuilder.makeWall(344, 110, 385, 132);

  const playerSpawn = useNewComponent(() => PlayerSpawn(new Vector(251, 161)));

  return {
    bounds,
    playerSpawn,
  };
}
