module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'Ping!',
	guildOnly: true,
	execute(message, args) {
		var ping = (Date.now() - message.createdTimestamp) / 1000;
  
		message.channel.send(`:ping_pong: Pong! Took ${ping} ms. So yeah.`)
	}}
