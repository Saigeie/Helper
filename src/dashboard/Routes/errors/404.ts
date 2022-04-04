/**
* Developer - Saige#8157
* Website: https://helper.solar
* Github: https://github.com/Saigeie
* 2022
*/

import { Route } from "../../structures/Route";

export default new Route({
    name: `404`,
    run: async (req, res) => {
        res.send({msg: "Error!", code: 404})
    }
})