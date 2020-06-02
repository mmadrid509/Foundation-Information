const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = sequelize.import('models/CurrencyShop');
sequelize.import('models/Users');
sequelize.import('models/UserItems');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Foundation Key', cost: 25, type: 'Collectible' }),
		CurrencyShop.upsert({ name: 'Coffee From SCP-294', cost: 50, type: 'Collectible'}),
		CurrencyShop.upsert({ name: '05 Council Keycard', cost: 100, type: 'Collectible'}),
		CurrencyShop.upsert({ name: `Mmadrid509's Head`, cost: 150, type: 'Collectible'}),
		CurrencyShop.upsert({ name: `McDonald's Fries`, cost: 690, type: 'Collectible'}),
		CurrencyShop.upsert({ name: 'InfiCrate', cost: 10000, type: 'Crate'}),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);
