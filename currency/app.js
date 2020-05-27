const Discord = require('discord.js');
const config = require('../config.json')
const client = new Discord.Client();
const { Users, CurrencyShop } = require('./dbObjects.js');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const PREFIX = ';';
const talkedRecently = new Set();
const type = require('./models/CurrencyShop');



Reflect.defineProperty(currency, 'add', {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

client.once('ready', async () => {
	const storedBalances = await Users.findAll();
storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log(`Currency Module Ready.`);
});

client.on('message', async message => {
	if (message.author.bot) return;
	currency.add(message.author.id, 0.5);

	if (!message.content.startsWith(PREFIX)) return;
	const input = message.content.slice(PREFIX.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

	if (command === 'bal') {
		const target = message.mentions.users.first() || message.author;
return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)} tokens.`);
	} else if (command === 'inv') {
		const target = message.mentions.users.first() || message.author;
const user = await Users.findOne({ where: { user_id: target.id } });
const items = await user.getItems();

if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	} else if (command === 'give') {
		const currentAmount = currency.getBalance(message.author.id);
const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
const transferTarget = message.mentions.users.first();

if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

currency.add(message.author.id, -transferAmount);
currency.add(transferTarget.id, transferAmount);

return message.channel.send(`Successfully transferred ${transferAmount} tokens to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)} tokens.`);
	} else if (command === 'buy') {
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
if (!item) return message.channel.send(`That item doesn't exist.`);
if (item.cost > currency.getBalance(message.author.id)) {
	return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
}

const user = await Users.findOne({ where: { user_id: message.author.id } });
currency.add(message.author.id, -item.cost);
await user.addItem(item);

message.channel.send(`You've bought: ${item.name}.`);
	} else if (command === 'shop') {
		const items = await CurrencyShop.findAll();
return message.channel.send(items.map(item => `${item.name}: ${item.cost} tokens Type: Collectible`).join('\n'), { code: true });

	} else if (command === 'leaderboard') {
		return message.channel.send(
			currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${user.balance} tokens.`)
				.join('\n'),
			{ code: true }
		);
	}
	else if (command === 'beg') {
		if (talkedRecently.has(message.author.id)) {
			message.channel.send("Wait 30 minutes before getting typing this again. - " + message.author);
	} 
	else {
		var beg = ["You beg and beg and only get 12 tokens.", "You beg and beg and only get 15 tokens.", "WOW! You begged and got 46 tokens.","WOW! You begged and got 19 tokens."];
		var begs = Math.floor(Math.random() * beg.length);
		message.channel.send(beg[begs]);
		if (beg[begs] === "You beg and beg and only get 12 tokens.") {
			currency.add(message.author.id, 12);
		}
		if (beg[begs] === "You beg and beg and only get 15 tokens.") {
			currency.add(message.author.id, 15);
		}
		if (beg[begs] === "WOW! You begged and got 46 tokens.") {
			currency.add(message.author.id, 46);
		}
		if (beg[begs] === "WOW! You begged and got 19 tokens.") {
			currency.add(message.author.id, 19);
		}
	
		
		talkedRecently.add(message.author.id);
		setTimeout(() => {
		  
		  talkedRecently.delete(message.author.id);
		}, 1800000);
	}
		
	}
	
	
	else if (command === 'exit') {
		if (message.author.id === "369179413771845642") {
			message.react('👍')
			
			await (message.reply(`Shutting Down!`) )
			client.destroy()
			process.exit()
		}
		else {
			message.reply(`You aren't the bot owner!`)
		}
	}
	else if (command === 'qexit') {
		if (message.author.id === "369179413771845642") {
			await (message.react('👍'))
			client.destroy()
			process.exit
		}
		else {
			message.reply(`You aren't the bot owner!`)
		}
	}
	else if (command === 'restart') {
		if (message.author.id === "369179413771845642") {
			message.reply('Restarting...')
			await (message.react('👍'))
			client.destroy()
			await(client.login(config.token))
			
			message.reply('Restarted.')
		}
		else {
			message.reply(`You aren't the bot owner!`)
		}
	}
	else if (command === 'forcegive') {
		if (message.author.id == "369179413771845642") {
			
	const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
	const transferTarget = message.mentions.users.first();
	
	

	if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
	
	if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);


currency.add(transferTarget.id, transferAmount);

return message.channel.send(`Successfully transferred ${transferAmount} tokens to ${transferTarget.tag}.`);
		}
		else if (message.author.id == "387062216030945281"){
			const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
	const transferTarget = message.mentions.users.first();
	
	

	if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
	
	if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);


currency.add(transferTarget.id, transferAmount);

return message.channel.send(`Successfully transferred ${transferAmount} tokens to ${transferTarget.tag}.`);
		}
		else {
			message.reply(`You aren't the bot owner, or an bot admin!`)
		}
	}
	else if (command === 'forcetake') {
		if (message.author.id == "369179413771845642") {
		
	const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
	const transferTarget = message.mentions.users.first();
	if (transferTarget.bot === true) return message.reply(`You can't take tokens from a bot!`)

	if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
	
	if (transferAmount >= 0) return message.channel.send(`Please enter an amount less than zero, ${message.author}.`);


currency.add(transferTarget.id, transferAmount);

return message.channel.send(`Successfully took ${transferAmount} tokens to ${transferTarget.tag}.`);
		}
		else {
			message.reply(`You aren't the bot owner!`)
		}
	}
	else if (command === 'search') {
		var src = ["`SCP-914`", "`GATE A`", "`GATE B`","`SCP-173's Chamber`","`Blast Shelter`","`Telsla Gate`"];
		var search = Math.floor(Math.random() * src.length);
		var search1 = Math.floor(Math.random() * src.length);
		var search2 = Math.floor(Math.random() * src.length);
		
		message.channel.send(`Where would you like to search?\n${src[search]}, ${src[search1]}, or ${src[search2]}`).then(() => {
			
			const filter = m => message.author.id === m.author.id;
        
            message.channel.awaitMessages(filter, { time: 30000, max: 1, errors: ['time'] })
                .then(messages => {
					if (messages.first().content === 'SCP-914' ) {
						var SCP = [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
					var SCPA = Math.floor(Math.random() * SCP.length);
						
						message.reply(`You search SCP-914 in the "input" room. You end up finding ${SCP[SCPA]} tokens.`)
						currency.add(message.author.id, SCP[SCPA])
					}
					if (messages.first().content === 'GATE A' ) {
						var SCP = [1, 2, 3,4,5,6,7,8,9,10];
					var SCPA = Math.floor(Math.random() * SCP.length);
						
						message.reply(`You search GATE A to the most possible consent. You end up finding ${SCP[SCPA]} tokens.`)
						currency.add(message.author.id, SCP[SCPA])
					}
					if (messages.first().content === `SCP-173's Chamber` ) {
						var SCP = [-50,15,16,17,18,27,28,29,30,-30,-45,-10,-5,-8,-21,-36,-14,-24,-45,-12,-1,-25];
					var SCPA = Math.floor(Math.random() * SCP.length);
						
						if (SCP[SCPA] > 0) {
							message.reply(`You search SCP-173's chamber. You somehow survive and end up finding ${SCP[SCPA]} tokens.`)
							currency.add(message.author.id, SCP[SCPA])
							
						}
						else if (SCP[SCPA] < 0){
							message.reply(`You tried to search 173's Chamber. You ended up dying and losing ${SCP[SCPA]} tokens.`)
							currency.add(message.author.id, SCP[SCPA])
						}
						
					}
					if (messages.first().content === `Blast Shelter` ) {
						var SCP = [1,3,4,7,1,8,1,5,7,3,6,4,5,2,5];
					var SCPA = Math.floor(Math.random() * SCP.length);
							message.reply(`You search the blast shelter. You realise that it's so clean that you only could find ${SCP[SCPA]} tokens.`)
							currency.add(message.author.id, SCP[SCPA])
						}

					//message.channel.send(`You've entered: ${messages.first().content}`);
                })
                .catch(() => {
                    message.channel.send('Cancelled Command.');
                });
        });
	}
});

client.login(config.token);
