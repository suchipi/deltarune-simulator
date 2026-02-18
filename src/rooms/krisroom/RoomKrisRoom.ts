import {
  useType,
  useNewComponent,
  Vector,
  Image,
  Entity,
} from "@hex-engine/2d";
import { RoomComponent } from "../RoomComponent";
import { useRoomRouter } from "../RoomRouter";
import RoomKrisHallway from "../krishallway/RoomKrisHallway";
import { setDepth } from "../../useDepth";

export default function RoomKrisRoom(playerEntity: Entity) {
  useType(RoomKrisRoom);

  const room = useNewComponent(() => RoomComponent("room_krisroom"));

  playerEntity.parent?.removeChild(playerEntity);
  room.layers["Compatibility_Instances_Depth_-20"].addChild(playerEntity);
  setDepth(playerEntity, -20);

  // const bgImage = useNewComponent(() => Image({ url: bgUrl }));
  // const fgImage = useNewComponent(() => Image({ url: fgUrl }));

  // const bounds = new Vector(320, 240);

  // useNewComponent(() =>
  //   BackgroundLayer((context) => {
  //     bgImage.draw(context, Vector.ZERO);
  //   }),
  // );

  // useNewComponent(() =>
  //   ForegroundLayer((context) => {
  //     fgImage.draw(context, Vector.ZERO);
  //   }),
  // );

  // const wallBuilder = makeWallBuilder(Vector.ZERO);

  // wallBuilder.makeWall(20, 20, 299, 39);
  // wallBuilder.makeWall(20, 39, 39, 219);
  // wallBuilder.makeWall(40, 80, 89, 149);
  // wallBuilder.makeWall(42, 182, 91, 201);
  // wallBuilder.makeWall(46, 200, 144, 219);
  // wallBuilder.makeWall(126, 220, 145, 239);
  // wallBuilder.makeWall(40, 80, 279, 99);
  // wallBuilder.makeWall(95, 100, 134, 119);
  // wallBuilder.makeWall(190, 100, 229, 119);
  // wallBuilder.makeWall(185, 219, 204, 238);
  // wallBuilder.makeWall(185, 200, 284, 219);
  // wallBuilder.makeWall(280, 40, 299, 219);

  // // TODO: this bed collider needs to be on sometimes and off other times
  // wallBuilder.makeWall(232, 101, 281, 150);

  // const roomRouter = useRoomRouter();

  // const sensorBuilder = makeSensorBuilder(Vector.ZERO);

  // sensorBuilder.makeSensor(155, 230, 174, 239, {
  //   onStart(info) {
  //     roomRouter.goTo(RoomKrisHallway, "outsideKrisRoomDoor");
  //   },
  // });

  // return {
  //   bounds,
  //   pointsOfInterest: {
  //     playerSpawn: new Vector(255, 130),
  //     enteredSouth: new Vector(164, 217),
  //   },
  // };
}
