const fs = require('fs');
const fsPromises = require('fs').promises;

module.exports = {
    name: "embed",
    description: "Embed",
    execute: async (client, message, args) => {
        const localImage = fs.promises.readFile("./img/space.jpg") //only include for local image
        message.channel.createMessage({
            messageReference: {
                messageID: message.id,
                channelID: message.channel.id,
                guildID: message.guildID
            },
            embeds: [{
                title: "Title",
                description: "Description",
                url: "https://google.com",
                author: {
                    name: "Author",
                    icon_url: client.user.dynamicAvatarURL("png", 1080)
                },
                timestamp: new Date(),
                color: 0xffffff, //html color code
                thumbnail: {
                    url: "https://cdn.pixabay.com/photo/2023/02/24/13/46/ai-generated-7811197_1280.jpg" //external image
                },
                image: {
                    url: "attachment://space.jpg" //local image
                },
                fields: [
                    {
                        name: "Text",
                        value: "Inline Value",
                        inline: true
                    },
                    {
                        name: "Text",
                        value: "Inline Value",
                        inline: true
                    },
                    {
                        name: "Text",
                        value: "Non-Inline Value",
                        inline: false
                    },
                    {
                        name: "Text",
                        value: "Non-Inline Value",
                        inline: false
                    },
                ],
                footer: {
                    icon_url: client.user.dynamicAvatarURL("png", 1080),
                    text: "Footer"
                }
            }],
        },
        {file: await localImage, name: 'space.jpg'} //only include for local image
        );
    }
}