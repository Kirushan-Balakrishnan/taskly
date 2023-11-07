import { onRequest } from "firebase-functions/v2/https";
import * as express from "express";
import * as cors from "cors";
import {
  addEntry,
  getAllEntries,
  updateEntry,
  deleteEntry,
} from "./TaskController";

const app = express();
app.use(cors());
app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.post("/task", addEntry);
app.get("/task", getAllEntries);
app.patch("/task/:taskId", updateEntry);
app.delete("/task/:taskId", deleteEntry);

exports.app = onRequest(app);
