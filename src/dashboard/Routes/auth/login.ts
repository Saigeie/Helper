/**
* Developer - Saige#8157
* Website: https://helper.solar
* Github: https://github.com/Saigeie
* 2022
*/

import { Route } from "../../structures/Route";

export default new Route({
    name: `auth/login`,
    run: async (req, res) => {
        res.redirect(process.env.AUTH_LOGIN_URL)
    }
})