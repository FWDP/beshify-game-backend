import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const app: Express = express();
const httpServer = createServer(app);

// Temporary * for origin
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Beshify API");
});

import { AppModule } from "./serverModule";
AppModule.Load(app);

httpServer.listen(port, () => {
  console.log(`serving on ${port}`);
});
