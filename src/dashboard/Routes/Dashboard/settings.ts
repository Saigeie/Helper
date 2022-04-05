/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
 */

import axios from "axios";
import { GuildInfo } from "passport-discord";
import getAdminGuilds from "../../modules/getMutualGuilds";
import {
  validateGuild,
  validatePerms,
  validateUser,
} from "../../modules/middleware/validation";
import { Route } from "../../structures/Route";
import CryptoJS from "crypto-js";
import { client } from "../../..";
import Guilds from "../../../data/schemas/Guilds";
import { formatPerm } from "../../../modules/format";

export default new Route({
  name: `dashboard/:id`,
  middleware: [validateUser, validateGuild, validatePerms],
  run: async (req, res) => {
    //@ts-ignore
    const guild = req.user.guilds.find((g) => g.id === req.params.id);
    const me = client.guilds.cache
      .find((g) => g.id === guild.id)
      .members.cache.find((m) => m.id === client.user.id);
    const guildData = await Guilds.findOne({ guildId: req.params.id });
    const clientGuild = client.guilds.cache.find((g) => g.id === guild.id);
    const commandCategories = [];
    let commandId = 0;
    client.commands.forEach((cmd) => {
      commandId++;
      let enabled = false;
      const alreadyAdded = commandCategories.filter(
        (c) => c.category === formatPerm(cmd.category)
      );
      if (alreadyAdded.length > 0) return;
      if (guildData.enabled_categories.includes(cmd.category)) {
        enabled = true;
      }
      commandCategories.push({
        id: commandId,
        enabled: enabled,
        category: formatPerm(cmd.category),
      });
    });
    res.render("pages/dash/settings/home", {
      guild: guild,
      guildData: guildData,
      nickname: me.nickname ? me.nickname : "Helper",
      clientGuild: clientGuild,
      Owner: clientGuild.members.cache.find(
        (m) => m.id === clientGuild.ownerId
      ),
      categories: commandCategories,
    });
  },
});
