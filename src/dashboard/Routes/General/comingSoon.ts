import { Route } from "../../structures/Route";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

export default new Route({
  name: "/comingsoon",
  run: async (req, res, { client }) => {
    res.send({ msg: `Coming Soon! 👀`})
  },
});
