import { Application, Request, Response } from "express";
import usersData from "../../data/users.json";


export const loadApiEndpoints = (app: Application): void => {
	app.get("/", (_req, res: Response) => {
    return res.status(200).send("Hello Express + Ts 🐢");
	})

  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send(usersData);
  });
};
