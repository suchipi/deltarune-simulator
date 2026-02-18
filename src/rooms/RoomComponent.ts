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
import { useDepth } from "../useDepth";
import { GameObject } from "../objects/GameObject";
import { RoomName } from "./RoomName";

const requireRoomJson = require.context(
  "../gamedata/chapter1/rooms",
  true,
  /room\.json$/,
);

const requireLayerPng = require.context(
  "../gamedata/chapter1/rooms",
  true,
  /layers\/.+\.png$/,
);

export function RoomLayer(roomName: RoomName, layerJson: RoomLayerJson) {
  useType(RoomLayer);

  useDepth(layerJson.depth);

  let image: null | (Component & ReturnType<typeof Image>) = null;
  let instances: Array<
    Entity & { rootComponent: ReturnType<typeof GameObject> }
  > = [];

  if (layerJson.type === "Instances") {
    for (const instance of layerJson.instances) {
      const child = useChild(() => GameObject(instance));
      instances.push(child);
    }
  } else {
    const imageUrl = requireLayerPng(
      `./${roomName}/layers/${layerJson.name}.png`,
    ).default;

    image = useNewComponent(() => Image({ url: imageUrl }));

    useDraw((context) => {
      image!.draw(context, {
        x: -layerJson.xOffset,
        y: -layerJson.yOffset,
      });
    });
  }

  return {
    image,
    instances,
    roomName,
    data: layerJson,
  };
}

export function RoomComponent(roomName: RoomName) {
  useType(RoomComponent);

  const roomJson: RoomJson = requireRoomJson(`./${roomName}/room.json`);

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
