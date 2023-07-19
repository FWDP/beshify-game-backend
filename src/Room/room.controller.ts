import { Router, Request, Response } from "express";
import RoomService from "./room.service";
import { checkSchema, validationResult } from "express-validator";
import { roomSchema } from "./room.schema";

const RoomController: Router = Router();

RoomController.get("/", async (req: Request, res: Response) => {
  res.json(await RoomService.getAllRooms());
});

// RoomController.get("/:id", RoomService.idBlyat);

RoomController.post("/", async (req: Request, res: Response) => {
  try {
    await checkSchema(roomSchema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await RoomService.createRoom(req.body);
    if (data.errors) {
      return res.status(400).json({ errors: data.errors });
    }

    res.status(201);
    return res.json(data);
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

export default RoomController;
