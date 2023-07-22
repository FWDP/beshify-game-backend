import { Router, Request, Response } from "express";
import RoomService from "./room.service";
import { checkSchema, validationResult } from "express-validator";
import { createRoomSchema, joinRoomSchema } from "./room.schema";
import { io } from "../server";

const RoomController: Router = Router();

io.on("connection", async (socket) => {
  RoomService.chatRooms.map((rID: String) => {
    socket.on(`${rID}:connect`, (data) => {
      socket.broadcast.emit(`${rID}:chat`, `${data} joined the game`);
    });

    socket.on(`${rID}:chat`, (data) => {
      socket.broadcast.emit(`${rID}:chat`, data);
    });

    socket.on(`${rID}:disconnect`, (data) => {
      socket.broadcast.emit(`${rID}:chat`, `${data} left the game`);
    });
  });
});

RoomController.get("/", async (req: Request, res: Response) => {
  res.json(await RoomService.getAllRooms());
});

RoomController.post("/", async (req: Request, res: Response) => {
  try {
    await checkSchema(createRoomSchema).run(req);
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

RoomController.patch("/", async (req: Request, res: Response) => {
  try {
    await checkSchema(joinRoomSchema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await RoomService.joinRoom(req.body);
    if (data.errors) {
      return res.status(400).json({ errors: data.errors });
    }

    res.status(201);
    return res.json(data);
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

/* Codes below are for testing purposes */
RoomController.delete("/", async (req: Request, res: Response) => {
  try {
    res.json(await RoomService.deleteRoom(req.body.id));
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

RoomController.get("/chat", async (req: Request, res: Response) => {
  try {
    res.json(await RoomService.getChatRooms());
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});
RoomController.get("/chat/re", async (req: Request, res: Response) => {
  try {
    res.json(await RoomService.repopulateChatRooms());
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

export default RoomController;
