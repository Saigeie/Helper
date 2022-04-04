/**
* Developer - Saige#8157
* Website: https://helper.solar
* Github: https://github.com/Saigeie
* 2022
*/

require("dotenv").config();
import express from "express";
import { RouteHandler } from "./modules/RouteHandler";
import bodyParser from "body-parser";
import discordStratagy from "./stratagies/discord"
import ejs from "ejs"
import { client } from "..";
import chalk from "chalk";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session"
import cookies from "cookies";
import methodOverride from "method-override";
const app = express();

RouteHandler(app);
discordStratagy()
// app.use(rateLimiter);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 * 12 },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB }),
  })
);
app.use(cookies.express("a", "b", "c"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set("json spaces", 1);
app.set("view engine", "ejs")
app.set("views", process.cwd() + "/src/dashboard/views");
app.use(express.static(process.cwd() + "/src/dashboard/views"));

app.get("/auth/callback", passport.authenticate("discord", { failureRedirect: "/"}), async (req, res) => {
    setTimeout(() => {
      res.redirect("/dashboard");
    }, 500);
})

export default function () {
  app.listen(process.env.PORT || 80, async () => {
    client.logger.info(
      chalk.redBright(`${chalk.bold(`Dashboard`)} is now online!`)
    );
    client.logger.info(
      `Running on port ${chalk.redBright(`${process.env.PORT}`)}`
    );
  });

}

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/