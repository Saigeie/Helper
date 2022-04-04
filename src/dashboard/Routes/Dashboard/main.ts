/**
* Developer - Saige#8157
* Website: https://helper.solar
* Github: https://github.com/Saigeie
* 2022
*/

import axios from "axios";
import { GuildInfo } from "passport-discord";
import getAdminGuilds from "../../modules/getMutualGuilds";
import { validateUser } from "../../modules/middleware/validation";
import { Route } from "../../structures/Route";
import CryptoJS from "crypto-js";

export default new Route({
    name: `dashboard`,
    middleware: [validateUser],
    run: async (req, res) => {
      const userToken = CryptoJS.AES.decrypt(
        //@ts-ignore
        req.user.userExtended.token,
        process.env.SECRET
      ).toString(CryptoJS.enc.Utf8);
      const userGuildsUnformatted = (await axios
        .get(`https://discord.com/api/users/@me/guilds`, {
          headers: {
            //@ts-ignore
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data)) as Array<GuildInfo>;

      const userGuilds = await getAdminGuilds(
        userGuildsUnformatted,
        //@ts-ignore
        req.user.userId
      );
      //@ts-ignore
      res.render("pages/dash/home", {
        //@ts-ignore
        guilds: userGuilds,
      });
    }
})