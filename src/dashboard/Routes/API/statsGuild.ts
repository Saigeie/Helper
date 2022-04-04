/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

import { Route } from "../../structures/Route";

export default new Route({
  name: "stats/guild",
  api: true,
  run: async (req, res, { client }) => {
    res.send({
      response: client.guilds.cache.size,
      code: 400,
    });
  },
});
