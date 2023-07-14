import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Warudoo");
});

// Import controllers
import RoomController from "./controllers/room.controller";

app.use("/room", RoomController);

app.listen(port, () => {
  console.log(`serving on ${port}`);
});
