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

import { AppModule } from "./server.module";
AppModule.Load(app);
if (process.env.NODE_ENV !== "production") {
  console.log("dev mode");
  httpServer.listen(port, () => {
    console.log(`serving on ${port}`);
  });
}

// Export the Express app as a function for Vercel
export default (req: Request, res: Response) => {
  // Allow only GET requests for the root path ("/")
  if (req.method === "GET" && req.url === "/") {
    return app(req, res);
  }

  // For all other requests, return 404
  res.status(404).send("Not found");
};
