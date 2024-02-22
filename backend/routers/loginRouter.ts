import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
const loginRouter = express.Router();

loginRouter.post("/", (req: Request, res: Response) => {
  const userData = req.body;
  const { userName, password } = userData;
  if (userName === "kvin" && password === "kvin123") {
    const accessToken = jwt.sign(userData, process.env.JWT_SECRET || "");
    res.status(200).send({ accessToken });
  }
});

export default loginRouter;
