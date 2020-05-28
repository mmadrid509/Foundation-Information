const Discord = require('discord.js')
const config = require('../config.json')
const { prefix } = require('../config.json');
const help = new Discord.MessageEmbed()
	.setColor('#010000')
	.setTitle('Help!')
	.setURL('https://github.com/mmadrid509/BOT-SCP-Information')
	.setAuthor('Mmadrid509')
    .setDescription(`Hi! I am a bot that gives information on a set of SCPs that the owner of this bot added. If you'd like, you can go to the official github for this bot at https://github.com/mmadrid509/BOT-SCP-Information. My commands are ***;disconnect, ;help, ;ping, ;play, ;001, ;002, ;003, ;004, ;076, ;096, ;096a, ;173, ;999, and ;999B***`)
    
	.setThumbnail('https://cdn.discordapp.com/attachments/692738250514890773/713418940734505010/download_7.jpg')


	
	.setTimestamp()
    const currency = new Discord.MessageEmbed()
	.setColor('#010000')
	.setTitle('Help!')
	.setURL('https://github.com/mmadrid509/BOT-SCP-Information')
	.setAuthor('Mmadrid509')
    .setDescription(`I also have a currency module! The commands for this module are: ;beg , ;shop , ;buy , ;give , ;inv , ;search , and ;bal.`)
    
	.setThumbnail('https://cdn.discordapp.com/attachments/692738250514890773/713418940734505010/download_7.jpg')


	
	.setTimestamp()

    const owner = new Discord.MessageEmbed()
	.setColor('#010000')
	.setTitle('OWNER ONLY')
	.setURL('https://github.com/mmadrid509/BOT-SCP-Information')
	.setAuthor('Mmadrid509')
    .setDescription(`OWNER ONLY COMMANDS: ;qexit, ;exit, ;forcegive, ;forcetake, ;reload and ;restart`)
    
	.setThumbnail('https://cdn.discordapp.com/avatars/369179413771845642/9a4bfe11d191c8a0f487b2d99cdbcc05.png?size=256')


	
	.setTimestamp()




module.exports = {
	name: 'help',
	description: 'Nil',
	guildOnly: true,
	execute(message, args) {
		
		message.channel.send(help)
        message.channel.send(currency)
		if (message.author.id === config.owner) return message.channel.send(owner)

		
		
	},
};
