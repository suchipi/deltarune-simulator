import { Vector } from "@hex-engine/2d";

export type RoomComponent = () => {
  bounds: Vector;
  playerSpawn: {
    position: Vector;
  };
  pointsOfInterest: {
    [key: string]: Vector;
  };
};

export type RoomComponentReturn = ReturnType<RoomComponent>;
