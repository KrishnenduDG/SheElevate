import cors from "cors";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { PORT } from "./config.js";
import {
  businessRouter,
  misclRouter,
  userRouter,
  wsRouter,
} from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/miscl", misclRouter); // Miscl Router
app.use("/user", userRouter); // User routes
app.use("/workspace", wsRouter); // Workspace Routes
app.use("/business", businessRouter); // Business Routes

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
