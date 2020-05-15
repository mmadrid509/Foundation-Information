const Discord = require('discord.js');
const config = require('../config.json')
const client = new Discord.Client();
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const PREFIX = ';';

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
	currency.add(message.author.id, 0);

	if (!message.content.startsWith(PREFIX)) return;
	const input = message.content.slice(PREFIX.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

	if (command === 'balance') {
		const target = message.mentions.users.first() || message.author;
return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)} tokens.`);
	} else if (command === 'inventory') {
		const target = message.mentions.users.first() || message.author;
const user = await Users.findOne({ where: { user_id: target.id } });
const items = await user.getItems();

if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	} else if (command === 'transfer') {
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
return message.channel.send(items.map(item => `${item.name}: ${item.cost} tokens`).join('\n'), { code: true });
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
});

client.login(config.token);
