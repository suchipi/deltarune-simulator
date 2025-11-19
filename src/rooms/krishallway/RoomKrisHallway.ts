import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  useDraw,
  Image,
  useChild,
} from "@hex-engine/2d";
import mainUrl from "./main.png";
import mirrorUrl from "./mirror.png";
import Wall from "../../Wall";

export default function RoomKrisHallway(
  position: Vector,
  childCallback: () => void
) {
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
    mainImage.draw(context, zeroVector);
  });

  const roomTopLeftOffset = new Vector(
    -geometry.shape.width / 2,
    -geometry.shape.height / 2
  );

  function makeWall(x: number, y: number, width: number, height: number) {
    useChild(() =>
      Wall(roomTopLeftOffset.addX(x).addYMutate(y), new Vector(width, height))
    );
  }

  makeWall(49, 140, 20, 69);

  childCallback();
}
