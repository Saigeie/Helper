import { Request } from "express";
import { Response } from "express-serve-static-core";
import glob from "glob";
import { promisify } from "util";
import { RouteType } from "../types/RouteTypes";
const globPromise = promisify(glob);
import { client } from "../..";
export async function importFile(filePath: string) {
  return (await import(filePath))?.default;
}

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

// Route Handler
export  async function RouteHandler(app) {
  const Files = await globPromise(`${process.cwd()}/src/dashboard/Routes/**/*.ts`);
  Files.map(async (x) => {
    const file: RouteType = await importFile(x);
    if (!file) return;
    app.get(
      `${file.name.startsWith("/") ? `${file.name}` : `/${file.name}`}`,
      (req: Request, res: Response) => {
        file.run(req, res, { client });
      }
    );
  });
}

