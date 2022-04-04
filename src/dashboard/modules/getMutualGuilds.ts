/**
* Developer - Saige#8157
* Website: https://helper.solar
* Github: https://github.com/Saigeie
* 2022
*/

import { APIGuild } from "discord-api-types";
import { GuildInfo } from "passport-discord";
import { client } from "../..";

// Return guilds only the user has admininstrator in
const getAdminGuilds = async (userGuilds: Array<GuildInfo>, userId: string) => {
    const array = []
    const adminUserGuilds = userGuilds.filter(
      (f) => f.owner || (f.permissions & 0x08) === 0x8
    );
    adminUserGuilds.forEach((guild: GuildInfo) => {
        const isGuild = client.guilds.cache.find(g => g.id === guild.id)
        array.push({
            joined: isGuild ? true : false,
            ...guild
        });
    })
    return array.sort((a, b) => Number(b.joined) - Number(a.joined));
}

export default getAdminGuilds;