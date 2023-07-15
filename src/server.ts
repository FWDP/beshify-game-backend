import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Beshify API");
});

import { AppModule } from "./server.module";
AppModule.Load(app);

app.listen(port, () => {
  console.log(`serving on ${port}`);
});
