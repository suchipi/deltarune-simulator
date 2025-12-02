import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  useDraw,
  Image,
  useEntityTransforms,
} from "@hex-engine/2d";
import mainUrl from "./main.png";
import mirrorUrl from "./mirror.png";
import { makeWallBuilder } from "../../Wall";
import { PlayerSpawn } from "../../PlayerSpawn";

export default function RoomKrisHallway(position: Vector) {
  useType(RoomKrisHallway);

  const mainImage = useNewComponent(() => Image({ url: mainUrl }));
  const mirrorImage = useNewComponent(() => Image({ url: mirrorUrl }));

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(new Vector(540, 240)),
      position,
    })
  );

  const zeroVector = new Vector(0, 0);
  useDraw((context) => {
    mirrorImage.draw(context, zeroVector);
    // TODO player reflections go here
    mainImage.draw(context, zeroVector);
  });

  const roomTopLeftOffset = useEntityTransforms()
    .matrixForDrawPosition(false)
    .transformPoint(new Vector(0, 0));

  const wallBuilder = makeWallBuilder(roomTopLeftOffset);

  wallBuilder.makeWall(40, 108, 60, 177);
  wallBuilder.makeWall(57, 166, 479, 184);
  wallBuilder.makeWall(479, 123, 504, 167);
  wallBuilder.makeWall(457, 108, 476, 127);
  wallBuilder.makeWall(61, 109, 281, 126);
  wallBuilder.makeWall(172, 114, 223, 134);
  wallBuilder.makeWall(239, 113, 257, 131);
  wallBuilder.makeWall(314, 107, 418, 127);
  wallBuilder.makeWall(344, 110, 385, 132);

  const playerSpawn = useNewComponent(() =>
    PlayerSpawn(roomTopLeftOffset.addX(251).addYMutate(161))
  );

  return {
    playerSpawn,
  };
}
