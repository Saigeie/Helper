/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

import {
  validateUser,
} from "../../modules/middleware/validation";
import { Route } from "../../structures/Route";
import { client } from "../../..";

export default new Route({
  name: `dashboard/:id/:type`,
  middleware: [validateUser],
  type: "put",
  run: async (req, res) => {
    const { type, id } = req.params
    const guild = client.guilds.cache.find((g) => g.id === id);
    if (type === "settings") {
      const { nickname } = req.body;
      if (nickname === "" || guild.me.nickname ? nickname === guild.me.nickname : false) return;
      guild.me.setNickname(nickname.slice(0, 32)).catch(() => { })
      setTimeout(() => {
        res.redirect(`/dashboard/${id}`);
      }, 500);
    }
    
  },
});
