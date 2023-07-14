import { Router, Request, Response } from "express";
import RoomService from "../services/room.service";

const RoomController: Router = Router();


RoomController.get("/", async (req: Request, res: Response) => {
  res.send(await RoomService.getAllRooms())
});

// RoomController.get("/:id", RoomService.idBlyat);

RoomController.post("/", async (req: Request, res: Response) => {
  RoomService.createRoom(req.body);
  res.status(201)
  res.send({
    "msg": "room created"
  });
});

export default RoomController;
