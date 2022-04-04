/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

import { Route } from "../../structures/Route";

export default new Route({
  name: "/invite",
  run: async (req, res) => {
    const { guildId } = req.query
    if (!guildId) {
      res.redirect(`${process.env.INVITE}`);
    } else {
      res.redirect(`${process.env.INVITE}&guild_id=${guildId}`);
    }
  },
});
