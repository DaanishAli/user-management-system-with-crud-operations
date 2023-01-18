import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/users.js";
import Connetion from "./database/db.js";
import * as dotenv from "dotenv";

dotenv.config();
const username = process.env.DB_USERNAM;
const password = process.env.DB_PASSWORD;

const app = express();
const port = 5000;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", userRoutes);
app.get("/", (req, res) => res.send("hello form express"));
app.all("*", (req, res) => res.send("That route dos not exist"));
Connetion(username, password);
app.listen(port, () =>
  console.log(`server is listining on port: http//localhost:${port}`)
);
