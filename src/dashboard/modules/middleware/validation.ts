import { NextFunction, Request, Response } from "express";

export const validateGuild = async (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const guild = req.user.guilds.find((g) => g.id === req.params.id);
  return guild ? next() : res.redirect("/dashboard");
}

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return req.user ? next() : res.redirect("/auth/login")
};