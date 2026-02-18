import { RoomName } from "./RoomName";

export type RoomJson = {
  name: RoomName;
  width: number;
  height: number;
  canvasWidth: number;
  canvasHeight: number;
  canvasOffsetX: number;
  canvasOffsetY: number;
  speed: number;
  persistent: boolean;
  backgroundColor: string;
  drawBackgroundColor: boolean;
  isGMS2: boolean;
  isGMS2_3: boolean;
  enableViews: boolean;
  gridWidth: number;
  gridHeight: number;
  layers: Array<RoomLayerJson>;
  gameObjects: Array<RoomInstanceJson>;
  views: Array<RoomViewJson>;
};

export type RoomLayerJson = {
  name: string;
  depth: number;
  layerId: number;
  visible: boolean;
  xOffset: number;
  yOffset: number;
  hSpeed: number;
  vSpeed: number;
} & (
  | {
      type: "Background";
      backgroundData: {
        sprite: string | null;
        visible: boolean;
        foreground: boolean;
        stretch: boolean;
        tiledHorizontally: boolean;
        tiledVertically: boolean;
        color: string;
        firstFrame: number;
        animationSpeed: number;
        animationSpeedType: string;
      };
    }
  | {
      type: "Instances";
      instances: Array<RoomInstanceJson>;
    }
  | {
      type: "Assets";
      assetsData: {
        legacyTiles: Array<RoomTileJson>;
      };
    }
);

export type RoomInstanceJson = {
  x: number;
  y: number;
  objectName: string;
  instanceID: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  color: string;
};

export type RoomTileJson = {
  x: number;
  y: number;
  width: number;
  height: number;
  sourceX: number;
  sourceY: number;
  sprite: string;
  instanceID: number;
  tileDepth: number;
  scaleX: number;
  scaleY: number;
  color: string;
};

export type RoomViewJson = {
  enabled: boolean;
  viewX: number;
  viewY: number;
  viewWidth: number;
  viewHeight: number;
  portX: number;
  portY: number;
  portWidth: number;
  portHeight: number;
  borderX: number;
  borderY: number;
  speedX: number;
  speedY: number;
  followsObject: string | null;
};
