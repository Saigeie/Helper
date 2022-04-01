import { Route } from "../../structures/Route";
import glob from "glob";
import { promisify } from "util";
const globPromise = promisify(glob);

export default new Route({
  name: "/invite",
  run: async (req, res) => {
    res.redirect(`${process.env.INVITE}`);
  },
});
