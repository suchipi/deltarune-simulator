import { useType, Vector } from "@hex-engine/2d";

export function PlayerSpawn(position: Vector) {
  useType(PlayerSpawn);

  return {
    position,
  };
}
