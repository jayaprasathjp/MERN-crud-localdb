import router from "./routes/user.route.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT;
const url = process.env.SHELL_URL;
mongoose.connect(url);
const connection = mongoose.connection;

connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
app.use("/", router);
app.get("/", (req, res) => res.send("success"));
app.all("*", (req, res) => res.status(404).send("Route doesn't exist"));
