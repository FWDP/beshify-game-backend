import { Express } from "express";
import RoomController from "./Room/room.controller";
import PlayerController from "./Player/player.controller";
import StatementController from "./Statement/statement.controller";
import VoteController from "./Vote/vote.controller";
export class AppModule {
  public static Load(app: Express) {
    app.use("/room", RoomController);
    app.use("/player", PlayerController);
    app.use("/statement", StatementController);
    app.use("/vote", VoteController);
  }
}
