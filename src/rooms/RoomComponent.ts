import {
  useType,
  Image,
  useDraw,
  useNewComponent,
  useChild,
  Entity,
  Component,
  useEntityName,
} from "@hex-engine/2d";
import { RoomJson, RoomLayerJson } from "./RoomJson";
import { useDepth } from "../useDepth";
import { GameObject } from "../objects/GameObject";
import { RoomName } from "./RoomName";
import { connections } from "./connections";
import { RoomConnection } from "./RoomConnection";

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

  useEntityName(layerJson.name);

  let image: null | (Component & ReturnType<typeof Image>) = null;
  let instances: Array<
    Entity & {
      rootComponent: ReturnType<typeof GameObject | typeof RoomConnection>;
    }
  > = [];

  if (layerJson.type === "Instances") {
    for (const instance of layerJson.instances) {
      const maybeConnection =
        connections[`/${roomName}/${instance.objectName}`];

      let child: (typeof instances)[number];
      if (maybeConnection) {
        child = useChild(() => RoomConnection(instance, maybeConnection));
      } else {
        child = useChild(() => GameObject(instance));
      }
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

export function loadRoom(roomName: RoomName) {
  const roomJson: RoomJson = requireRoomJson(`./${roomName}/room.json`);
  return roomJson;
}

export function RoomComponent(roomName: RoomName) {
  useType(RoomComponent);

  useEntityName(roomName);

  const roomJson = loadRoom(roomName);

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
