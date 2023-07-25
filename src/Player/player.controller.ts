import { Router, Request, Response } from "express";
import { userSchema } from "./player.schema";
import { checkSchema, validationResult } from "express-validator";
import PlayerService from "./player.service";
import { encode } from "html-entities";

const PlayerController: Router = Router();

PlayerController.get("/:name", async (req: Request, res: Response) => {
  try {
    const data = await PlayerService.getPlayer(req.params["name"]);
    if (data.errors) {
      return res.status(400).json({ errors: data.errors });
    }

    res.status(201);
    return res.json(data);
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

PlayerController.post("/", async (req: Request, res: Response) => {
  try {
    await checkSchema(userSchema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await PlayerService.createPlayer({
      playerName: encode(req.body.playerName),
      statements: [],
    });
    if (data.errors) {
      return res.status(400).json({ errors: data.errors });
    }

    res.status(201);
    return res.json(data);
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

export default PlayerController;
