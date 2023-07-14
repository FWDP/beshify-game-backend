import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("asdss");
});


// Import controllers
import BlyatController from "./controllers/room.controller";

app.use("/blyat", BlyatController);

app.listen(port, () => {
  console.log(`serving on ${port}`);
});
