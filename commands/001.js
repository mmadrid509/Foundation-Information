const Discord = require('discord.js')
const SCP_001 = new Discord.MessageEmbed()
	.setColor('#010000')
	.setTitle('SCP-001')
	.setURL('http://www.scp-wiki.net/scp-001')
	.setAuthor('SCP Foundation')
	.setDescription('GENERAL NOTICE 001-Alpha: In order to prevent knowledge of SCP-001 from being leaked, several/no false SCP-001 files have been created alongside the true file/files. All files concerning the nature of SCP-001, including the decoy/decoys, are protected by a memetic kill agent designed to immediately cause cardiac arrest in any nonauthorized personnel attempting to access the file. Revealing the true nature/natures of SCP-001 to the general public is cause for execution, except as required under ████-███-██████.')
	.setThumbnail('https://cdn.discordapp.com/attachments/692738250514890773/713418940734505010/download_7.jpg')


	
	.setTimestamp()






module.exports = {
	name: '001',
    cooldown: 5,
    description: 'Information on SCP-001',
	execute(message, args) {
		message.channel.send(SCP_001);
	},
};
