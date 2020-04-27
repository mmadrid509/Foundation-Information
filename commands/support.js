module.exports = {
	name: 'support',
	cooldown: 5,
	description: 'Gives the support server for the bot that includes a spot where you can ask to add an SCP to the bot.',
	execute(message, args) {
		message.channel.send(`Here's the support server for the bot that includes a channel where you can ask to add an SCP to the bot. (MUST ALREADY BE PART OF THE FOUNDATION)`);
		message.channel.send(`https://discord.gg/EmeC6Yr`)
	},
};
