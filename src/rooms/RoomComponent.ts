import {
  useType,
  Image,
  useDraw,
  useNewComponent,
  useChild,
  Entity,
  Component,
} from "@hex-engine/2d";
import { RoomJson, RoomLayerJson } from "./RoomJson";

const roomJsonContext = require.context(
  "../gamedata/chapter1/rooms",
  true,
  /room\.json$/,
);

const roomLayerContext = require.context(
  "../gamedata/chapter1/rooms",
  true,
  /layers\/.+\.png$/,
);

export function RoomLayer(roomName: string, layerJson: RoomLayerJson) {
  useType(RoomLayer);

  let image: null | (Component & ReturnType<typeof Image>) = null;
  if (layerJson.type !== "Instances") {
    const imageUrl = roomLayerContext(
      `./${roomName}/layers/${layerJson.name}.png`,
    ).default;

    image = useNewComponent(() => Image({ url: imageUrl }));

    useDraw((context) => {
      image!.draw(context, {
        x: layerJson.xOffset,
        y: layerJson.yOffset,
      });
    });
  }

  return {
    image,
    roomName,
    data: layerJson,
  };
}

export function RoomComponent(roomName: string, layersToSkip: Set<string>) {
  useType(RoomComponent);

  const roomJson: RoomJson = roomJsonContext(`./${roomName}/room.json`);

  const layers: {
    [key: string]: Entity & { rootComponent: ReturnType<typeof RoomLayer> };
  } = Object.create(null);

  for (const layer of roomJson.layers) {
    layers[layer.name] = useChild(() => RoomLayer(roomName, layer));
  }

  return {
    name: roomName,
    layers,
    data: roomJson,
  };
}
