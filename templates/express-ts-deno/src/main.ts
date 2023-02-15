// @deno-types="npm:@types/express"
import express from "express";
import { Request, Response } from "express";

import data from "../data/dinosaurs.json" assert { type: "json" };

const app = express();

app.set("port", 8000)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Dinosaur API!");
});

app.get("/api", (req: Request, res: Response) => {
  res.json(data)
})

if (import.meta.main) {
  app.listen(8000);
}

export default app
