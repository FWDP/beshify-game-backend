import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app: Express = express();
const httpServer = createServer(app);

// Temporary * for orign
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Beshify API");
});

import { AppModule } from "./serverModule";
AppModule.Load(app);

httpServer.listen(port, () => {
  console.log(`serving on ${port}`);
});
