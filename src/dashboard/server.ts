require("dotenv").config();
import express from "express";
import { RouteHandler } from "./modules/RouteHandler";
import bodyParser from "body-parser";
import ejs from "ejs"
const app = express();

RouteHandler(app);

// app.use(rateLimiter);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("json spaces", 1);
app.set("view engine", "ejs")
app.set("views", process.cwd() + "/src/dashboard/views");
app.use(express.static(process.cwd() + "/src/dashboard/views"));

export default function () {
  app.listen(process.env.PORT || 80, async () => {
    console.log(`Connected to server, port: ${process.env.PORT || 80}`);
  });

}