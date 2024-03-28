import cors from "cors";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
