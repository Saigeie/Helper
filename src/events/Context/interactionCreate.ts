import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "../../index";
import { Event } from "../../structures/Event";
import { Extendedinteraction } from "../../types/Command";

export default new Event("interactionCreate", async (interaction) => {
  // Chat Input Commands
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.followUp("You have used a non existent command");

    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as Extendedinteraction,
    });
  }
});
