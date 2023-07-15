import { Express } from "express";
import RoomController from "./Room/room.controller";

export class AppModule {
  public static Load(app: Express) {
    app.use(RoomController);
  }
}
