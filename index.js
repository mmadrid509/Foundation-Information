const fs = require('fs');
const Discord = require('discord.js');
const {prefix} = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const config = require("./config.json")
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { Users, CurrencyShop } = require('./currency-stuff/dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const PREFIX = ';';
const app = fs.readdirSync('./currency').filter(file => file.endsWith('.js'));

for (const file of app) {
	const currency = require(`./currency/app.js`);
	
	
	client.commands.set(currency.name, currency);
}
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	
	
	client.commands.set(command.name, command);
}


const cooldowns = new Discord.Collection();

client.once('ready', async () => {
	const storedBalances = await Users.findAll();
storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log('Sucessfuly Opened SCP Foundation Files!');
});


client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).split(/ +/);
const commandName = args.shift().toLowerCase();
if (!client.commands.has(commandName)) return;
const command = client.commands.get(commandName);


	
try  {
	command.execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command! Check the terminal for more info.');
}
});

client.login(config.token)
