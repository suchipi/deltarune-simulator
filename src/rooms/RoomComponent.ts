import { Vector } from "@hex-engine/2d";

export type RoomComponent = () => {
  bounds: Vector;
  pointsOfInterest: {
    playerSpawn: Vector;
    [key: string]: Vector;
  };
};

export type RoomComponentReturn = ReturnType<RoomComponent>;
