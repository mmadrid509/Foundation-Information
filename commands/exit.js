const Discord = require('discord.js');
const config = require('../config.json')
const client = new Discord.Client();

module.exports = {
    name: 'exit',
	cooldown: 5,
	description: 'Ping!',
	guildOnly: true,
	async execute(message, args) {
		if (message.author.id === config.owner) {
            message.react('👍')
            
            await (message.reply(`Shutting Down!`) )
            client.destroy()
            process.exit()
        }
        else {
            message.reply(`You aren't the bot owner!`)
        }
	}}
