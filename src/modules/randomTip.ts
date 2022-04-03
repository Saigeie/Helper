import { Helper } from "../structures/Client";

/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/

const RandomTip = async (client: Helper) => {
    const randomTips = [
      `Helper has a total off **${client.guilds.cache.size}** servers & **${client.users.cache.size}** users`,
      `You can gain support for helper from [**the discord server**](https://helper.solar)!`,
      `You can invite helper to your own server by [**using this invite**](https://helper.solar)!`,
      `Want your own message up here? Well join the [**support server**](https://helper.solar) to submit it!`,
    ];
    const tip = randomTips[Math.floor(Math.random() * randomTips.length)];
    return tip;
};
export default RandomTip;
