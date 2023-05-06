module.exports = (bot) => {
    bot.on("ready", async() => {
        console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}!`);
    });
};