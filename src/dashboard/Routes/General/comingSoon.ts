import { Route } from "../../structures/Route";

export default new Route({
  name: "/comingsoon",
  run: async (req, res, { client }) => {
    res.send({ msg: `Coming Soon! 👀`})
  },
});
