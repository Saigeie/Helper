/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

import { Route } from "../../structures/Route";

export default new Route({
  name: "stats/user",
  api: true,
  run: async (req, res, { client }) => {
    res.send({
      response: client.users.cache.size,
      code: 400,
    });
  },
});
