import { Request, Response } from "express";
import { Helper } from "../../structures/Client";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

interface RunOptions {
  client: Helper

}

type runFun = (req: Request, res: Response, options: RunOptions) => any
export type RouteType = {
  name: string;
  run: runFun;
}