// Currently not in use since it doesnt want to work 😭

import { ShardingManager } from "discord.js";
import { client } from ".";

const manager = new ShardingManager(`./dist/index.js`, {
  token: process.env.DISCORD_TOKEN,
  //autoSpawn: true,
  //totalShards: 'auto'
  totalShards: 1,
});

manager.on(`shardCreate`, (shard) => {
  client.logger.info(`Shard Launching ${shard.id + 1}`, { label: `INFO` });
});
manager.spawn()