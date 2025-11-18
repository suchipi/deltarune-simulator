import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  useDraw,
  Image,
  useCallbackAsCurrent,
  Component,
} from "@hex-engine/2d";
import mainUrl from "./main.png";
import mirrorUrl from "./mirror.png";

export default function RoomKrisHallway(
  position: Vector,
  childCallback: () => void
) {
  useType(RoomKrisHallway);

  const mainImage = useNewComponent(() => Image({ url: mainUrl }));
  const mirrorImage = useNewComponent(() => Image({ url: mirrorUrl }));

  let geometry: ReturnType<typeof Geometry> & Component;
  mainImage.load().then(
    useCallbackAsCurrent(() => {
      geometry = useNewComponent(() =>
        Geometry({
          shape: Polygon.rectangle(
            new Vector(mainImage.data!.width, mainImage.data!.height)
          ),
          position,
        })
      );
    })
  );

  const zeroVector = new Vector(0, 0);
  useDraw((context) => {
    mirrorImage.draw(context, zeroVector);
    mainImage.draw(context, zeroVector);
  });

  childCallback();
}
