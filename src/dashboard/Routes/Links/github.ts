import { Route } from "../../structures/Route";
import glob from "glob";
import { promisify } from "util";
const globPromise = promisify(glob);

export default new Route({
  name: "/github",
  run: async (req, res) => {
    res.redirect(`https://github.com/Saigeie/Helper`);
  },
});
