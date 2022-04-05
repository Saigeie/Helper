import { NextFunction, Request, Response } from "express";
import { client } from "../../..";
import Guilds from "../../../data/schemas/Guilds";

export const validateGuild = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  const guild = req.user.guilds.find((g) => g.id === req.params.id);
  if (guild) {
    const guildData = await Guilds.findOne({ guildId: guild.id });
    if (!guildData) await Guilds.create({ guildId: guild.id });
    return next();
  } else {
    return res.redirect("/dashboard");
  }
};

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return req.user ? next() : res.redirect("/auth/login");
};

export const validatePerms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  const guild = client.guilds.cache.find((g) => g.id === req.params.id);
  if(!guild) return res.redirect("/dashboard");
  //@ts-ignore
  const member = guild.members.cache.find((m) => m.id === req.user.userId);
  if (member.permissions.has(["ADMINISTRATOR"]) || member.id === guild.ownerId) { return next() } else { return res.redirect("/dashboard");}
};
