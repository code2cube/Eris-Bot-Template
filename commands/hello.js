module.exports = {
    name: "hello",
    description: "Say hello",
    aliases: ['hi'],
    execute: async (client, message, args) => {
        message.channel.createMessage(`Hello ${message.author.mention}!`);
    }
}