import { Command } from "../../structures/Command";

export default new Command({
    name: "play",
    description: `🎺 | Play a song!`,
    type: "CHAT_INPUT",
    run: async ({ interaction }) => {
        console.log()
    }
})