import { Route } from "../../structures/Route"
import ClientData from "../../../data/schemas/ClientData";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default new Route({
  name: "/",
  run: async (req, res, { client }) => {
    const clientData = await ClientData.findOne({ key: `${process.env.SERVER_KEY}`})
    res.render(`pages/home.ejs`, {
      bot: client,
      premium: clientData.premiumGuilds.length || 0,
      commandsRan: clientData.commandsRan
    })
  },
});
