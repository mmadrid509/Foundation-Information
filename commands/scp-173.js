const Discord = require('discord.js')
const SCP_173 = new Discord.MessageEmbed()
	.setColor('#010000')
	.setTitle('SCP-173')
	.setURL('http://www.scp-wiki.net/scp-001')
	.setAuthor('SCP Foundation')
	.setDescription('Object Class: Euclid')
	.setThumbnail('https://cdn.discordapp.com/attachments/692738250514890773/713418940734505010/download_7.jpg')
	.addField('\u200b',`Special Containment Procedures: Item SCP-173 is to be kept in a locked container at all times. When personnel must enter SCP-173's container, no fewer than 3 may enter at any time and the door is to be relocked behind them. At all times, two persons must maintain direct eye contact with SCP-173 until all personnel have vacated and relocked the container.`,'\u200b')

	
	.setTimestamp()
const SCP173A = new Discord.MessageEmbed()
	.setColor('#010000')
	.setTitle('Description:')
	.setURL('http://www.scp-wiki.net/scp-173')
	.setAuthor('SCP Foundation')
	.setDescription('Moved to Site-19 1993. Origin is as of yet unknown. It is constructed from concrete and rebar with traces of Krylon brand spray paint. SCP-173 is animate and extremely hostile. The object cannot move while within a direct line of sight. Line of sight must not be broken at any time with SCP-173. Personnel assigned to enter container are instructed to alert one another before blinking. Object is reported to attack by snapping the neck at the base of the skull, or by strangulation. In the event of an attack, personnel are to observe Class 4 hazardous object containment procedures.')
	.addField('\u200b',`Personnel report sounds of scraping stone originating from within the container when no one is present inside. This is considered normal, and any change in this behaviour should be reported to the acting HMCL supervisor on duty.`,'\u200b')
	.addField('\u200b',`The reddish brown substance on the floor is a combination of feces and blood. Origin of these materials is unknown. The enclosure must be cleaned on a bi-weekly basis.`,'\u200b')


module.exports = {
	name: '173',
    cooldown: 5,
    description: 'Information on SCP-173',
	execute(message, args) {
		
		message.channel.send(SCP_173);
		message.channel.send(SCP173A);
	},
};
