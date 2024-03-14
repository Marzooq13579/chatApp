import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./db/connection";

const app = express();

const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to Auth Service");
});

connectDB()
  .then(() => {
    app
      .listen(PORT, () => {
        console.log("Server Running at PORT", PORT);
      })
      .on("error", (err) => {
        throw new Error(err.message);
      });
  })
  .catch((err) => {
    console.log("error", err);
  });
