import { Router, Request, Response } from "express";
import VoteService from "./vote.service";
import { checkSchema, validationResult } from "express-validator";
import { VoteSchema } from "./vote.schema";

const VoteController: Router = Router();

VoteController.patch("/", async (req: Request, res: Response) => {
  try {
    await checkSchema(VoteSchema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await VoteService.createVote(req.body);
    if (data?.errors) {
      return res.status(400).json({ errors: data.errors });
    }

    res.status(201);
    return res.json(data);
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

export default VoteController;
