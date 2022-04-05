/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

import { validateGuild, validatePerms, validateUser } from "../../modules/middleware/validation";
import { Route } from "../../structures/Route";
import { client } from "../../..";
import { Response } from "express";
import { arrayToObject } from "../../modules/objects";
import { formatPerm } from "../../../modules/format";
import Guilds from "../../../data/schemas/Guilds";

export default new Route({
  name: `dashboard/:id/submit/:type`,
  middleware: [validateUser, validatePerms, validateGuild],
  type: "put",
  run: async (req, res) => {
    const { type, id } = req.params;
    const guild = client.guilds.cache.find((g) => g.id === id);
    const guildData = await Guilds.findOne({ guildId: req.params.id });
    if (type === "settings") {
      const { nickname } = req.body;
      if (
        nickname !== "" || guild.me.nickname
          ? nickname !== guild.me.nickname
          : false
      ) {
        guild.me.setNickname(nickname.slice(0, 32)).catch(() => {});
      }
      guild.me.setNickname(nickname.slice(0, 32)).catch(() => {});

      // Enable Categories
      const asArray = Object.entries(req.body);
      const categoriesArray = asArray.filter(
        ([key, value]) => key !== "nickname"
      );
      const categories = await arrayToObject(categoriesArray);
      const commandCategories = [];
      const newEnabledLists = [];
      client.commands.forEach((cmd) => {
        if (commandCategories.includes(formatPerm(cmd.category))) return;
        commandCategories.push(formatPerm(cmd.category));
      });
      commandCategories.forEach((category) => {
        let value = categories[category];
        if (!value) return;
        if (
          value === "on" ||
          guildData.enabled_categories.includes(category.toLowerCase())
        ) {
          value = true;
        } else {
          value = false;
        }
        newEnabledLists.push(category.toLowerCase());
      });

      await Guilds.findOneAndUpdate(
        { guildId: req.params.id },
        {
          enabled_categories: newEnabledLists,
        }
      );

      redirect(res, req.params.id);
    }
  },
});

function redirect(res: Response, id: string) {
  setTimeout(() => {
    res.redirect(`/dashboard/${id}`);
  }, 500);
}
