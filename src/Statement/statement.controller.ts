import { Router, Request, Response } from "express";
import { statementSchema } from "./statement.schema";
import { checkSchema, validationResult } from "express-validator";
import StatementService from "./statement.service";

const StatementController: Router = Router();

StatementController.post("/", async (req: Request, res: Response) => {
  try {
    await checkSchema(statementSchema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await StatementService.createStatement(req.body);
    if (data.errors) {
      return res.status(400).json({ errors: data.errors });
    }

    res.status(201);
    return res.json(data);
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

export default StatementController;
