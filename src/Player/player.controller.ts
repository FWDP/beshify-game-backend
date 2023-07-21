import { Router, Request, Response } from "express";
import { userSchema } from "./player.schema";
import { checkSchema, validationResult } from "express-validator";
import PlayerService from "./player.service";

const PlayerController: Router = Router();

PlayerController.post("/", async (req: Request, res: Response) => {
  try {
    await checkSchema(userSchema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await PlayerService.createPlayer(req.body);
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
