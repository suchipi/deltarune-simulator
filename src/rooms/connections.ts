import type { Destination, RoomUrl } from "./RoomUrl";

export const connections: Partial<Record<RoomUrl, Destination>> = {
  "/room_krisroom/obj_doorA": {
    roomUrl: "/room_krishallway/300,136",
    facing: "down",
  },
  "/room_krishallway/obj_doorB": {
    roomUrl: "/room_krisroom/164,216",
    facing: "up",
  },
  "/room_krishallway/438,102": {
    roomUrl: "/room_torhouse/156,160",
    facing: "down",
  },
  "/room_torhouse/156,128": {
    roomUrl: "/room_krishallway/438,128",
    facing: "down",
  },
};
