import {
  useType,
  useNewComponent,
  Vector,
  useDraw,
  Image,
} from "@hex-engine/2d";

import smeltarune from "./smeltarune.png";

export default function Logo(position: Vector) {
  useType(Logo);

  const image = useNewComponent(() => Image({ url: smeltarune }));

  useDraw((context) => {
    image.draw(context, { x: position.x, y: position.y });
  });
}
