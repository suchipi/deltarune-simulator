import {
  useType,
  useNewComponent,
  Vector,
  useDraw,
  Image,
} from "@hex-engine/2d";
import bgUrl from "./bg.png";
import fgUrl from "./fg.png";
import { makeWallBuilder } from "../../Wall";
import { PlayerSpawn } from "../../PlayerSpawn";

export default function RoomKrisRoom() {
  useType(RoomKrisRoom);

  const bgImage = useNewComponent(() => Image({ url: bgUrl }));
  const fgImage = useNewComponent(() => Image({ url: fgUrl }));

  const bounds = new Vector(320, 240);

  const zeroVector = new Vector(0, 0);
  useDraw((context) => {
    bgImage.draw(context, zeroVector);
    // TODO players go here
    fgImage.draw(context, zeroVector);
  });

  const wallBuilder = makeWallBuilder(zeroVector);

  wallBuilder.makeWall(20, 20, 299, 39);
  wallBuilder.makeWall(20, 39, 39, 219);
  wallBuilder.makeWall(40, 80, 89, 149);
  wallBuilder.makeWall(42, 182, 91, 201);
  wallBuilder.makeWall(46, 200, 144, 219);
  wallBuilder.makeWall(126, 220, 145, 239);
  wallBuilder.makeWall(40, 80, 279, 99);
  wallBuilder.makeWall(95, 100, 134, 119);
  wallBuilder.makeWall(190, 100, 229, 119);
  wallBuilder.makeWall(185, 219, 204, 238);
  wallBuilder.makeWall(185, 200, 284, 219);
  wallBuilder.makeWall(280, 40, 299, 219);

  // TODO: this bed collider needs to be on sometimes and off other times
  wallBuilder.makeWall(232, 101, 281, 150);

  const playerSpawn = useNewComponent(() => PlayerSpawn(new Vector(255, 130)));

  return {
    bounds,
    playerSpawn,
  };
}
