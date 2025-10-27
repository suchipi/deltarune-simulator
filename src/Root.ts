import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Vector,
} from "@hex-engine/2d";
import Player from "./Player";
import Logo from "./Logo";
import DramaticSound from "./DramaticSound";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "black" }));
  canvas.fullscreen({ pixelZoom: 4 });
  canvas.setPixelated(true);

  const canvasCenter = new Vector(
    canvas.element.width / 2,
    canvas.element.height / 2
  ).roundDownMutate();

  useNewComponent(() => DramaticSound());

  useChild(() => Logo(new Vector(0, 0)));
  useChild(() => Player(canvasCenter));
}
