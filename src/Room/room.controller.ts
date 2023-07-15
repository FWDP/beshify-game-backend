import { Router, Request, Response } from "express";
import RoomService from "./room.service";

const RoomController: Router = Router();

RoomController.get("/", async (req: Request, res: Response) => {
  res.json(await RoomService.getAllRooms());
});

// RoomController.get("/:id", RoomService.idBlyat);

RoomController.post("/", async (req: Request, res: Response) => {
  res.status(201);
  res.json(RoomService.createRoom(req.body));
});

export default RoomController;
