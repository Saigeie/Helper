import { Request, Response } from "express";
import { Helper } from "../../structures/Client";

interface RunOptions {
  client: Helper

}

type runFun = (req: Request, res: Response, options: RunOptions) => any
export type RouteType = {
  name: string;
  run: runFun;
}