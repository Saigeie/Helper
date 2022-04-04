/**
* Developer - Saige#8157
* Website: https://helper.solar
* Github: https://github.com/Saigeie
* 2022
*/

import ClientData from "../../../data/schemas/ClientData";
import { Route } from "../../structures/Route";

export default new Route({
    name: "news",
    api: true,
    run: async (req, res, { client }) => {
        const news = await ClientData.findOne({key: `${process.env.SERVER_KEY}`})
        res.send({
            what_is_this: `This is an endpoint to gather helper's latest news!`,
            response: `${news.news ? news.news : "Can not gather latest news!"}`,
            code: 400,
        })
    }
})