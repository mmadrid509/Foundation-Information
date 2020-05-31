const Discord = require('discord.js')
const SCP_999 = new Discord.MessageEmbed()
	.setColor('#010000')
	.setTitle('SCP-999')
	.setURL('http://www.scp-wiki.net/scp-999')
	.setAuthor('SCP Foundation')
	.setDescription('Object Class: Safe')
	.setThumbnail('https://cdn.discordapp.com/attachments/692738250514890773/713418940734505010/download_7.jpg')
	.addField('\u200b',`Special Containment Procedures: SCP-999 is allowed to freely roam the facility should it desire to, but otherwise must stay in its pen either between 8PM-9PM for sleeping, or during emergency lockdowns for its own safety. Subject is not allowed out of its pen at night or off facility grounds at any time. Pen is to be kept clean and food replaced twice daily. All personnel are allowed inside SCP-999’s holding area, but only if they are not assigned to other tasks at the time, or if they are on break. Subject is to be played with when bored and spoken to in a calm, non-threatening tone.`,'\u200b')

	.setTimestamp('Foundation Information')
	

   
    const SCP_999A = new Discord.MessageEmbed()
        .setColor('#010000')
        .setTitle('Description: ')
        .setURL('http://www.scp-wiki.net/scp-999')
        .setAuthor('SCP Foundation')
        .setDescription('SCP-999 appears to be a large, amorphous, gelatinous mass of translucent orange slime, weighing about 54 kg (120 lbs) with a consistency similar to that of peanut butter. Subject’s size and shape is easily malleable and can change shape at will, though when at rest, SCP-999 becomes a rounded, oblate dome roughly 2 meters wide and 1 meter in height. The surface of SCP-999 consists of a thin, transparent membrane similar to that of an animal cell roughly .5 cm thick, and is highly elastic, allowing SCP-999 to flatten portions of its body up to 2 cm thin.')
        .setThumbnail('https://cdn.discordapp.com/attachments/692738250514890773/713418940734505010/download_7.jpg')
        .addField('\u200b',`This surface is also hydrophobic, although SCP-999 can willfully absorb liquids (see Addendum SCP-999-A).`,'\u200b')
        .addField('\u200b',`The rest of SCP-999's body is filled with a viscous orange substance of unknown chemical makeup, though it is capable of digesting organic materials with ease.`,'\u200b')
        .addField('\u200b',`Subject’s temperament is best described as playful and dog-like: when approached, SCP-999 will often react with overwhelming elation, slithering over to the nearest person and leaping upon them, “hugging” them with a pair of pseudopods while nuzzling the person’s face with a third pseudopod, all the while emitting high-pitched gurgling and cooing noises.`,'\u200b')
        .addField('\u200b',`The surface of SCP-999 emits a pleasing odor that differs with whomever it is interacting with. Recorded scents include chocolate, fresh laundry, bacon, roses, and Play-Doh™.\n\nSimply touching SCP-999’s surface causes an immediate mild euphoria, which intensifies the longer one is exposed to SCP-999, and lasts long after separation from the creature.`,'\u200b')
        .addField('\u200b',`Subject’s favorite activity is "tickle-wrestling", often by completely enveloping a person from the neck down and tickling them until asked to stop (though it does not always immediately comply with this request).`,'\u200b')
        .addField('\u200b',`Though injuries may occur, SCP-999 has never been found to purposefully attempt to harm others, and will immediately back away and contract its body into a quivering mound while gurgling in a matter similar to a whimpering dog, seemingly "apologizing" for hurting someone on accident.\n\nWhile the creature will interact with anyone, it seems to have a special interest in those who are unhappy or hurt in any way.`,'\u200b')
        .addField('\u200b',`Persons suffering from crippling depression or PTSD, for example, have reported having a far more positive outlook on life after multiple interactions with SCP-999.`,'\u200b')
        .addField('\u200b',`The possibility of manufacturing antidepressants from SCP-999's slime is currently being discussed.`,'\u200b')
        .addField('\u200b',`In addition to its playful behavior, SCP-999 seems to love all animals (especially humans), refusing to eat any meat and even risking its own life to save others, on one occasion leaping in front of a person to take a bullet fired at them (subject’s intellect is still up for debate: though its behavior is infantile, it seems to understand human speech and most modern technology, including guns). SCP-999’s diet consists entirely of candy and sweets, with M&M’s™ and Necco™ wafers being its favorites. Its eating methods are similar to those of an amoeba.`,'\u200b')
        .addField('\u200b',`Addendum SCP-999-A: "Reminder to all staff: SCP-999 is not to consume caffeinated soft drinks of any kind. Last week someone gave SCP-999 a can of cola along with its usual breakfast- Not only was it literally bouncing off the walls for half an hour, the carbonation make SCP-999 visibly queasy afterwards, and it refused to move or eat the rest of the day. SCP-999 has thankfully recovered since, but the staff member in question has been reprimanded."\n\nDr. ████████`,'\u200b')
        .addField('\u200b',`Addendum SCP-999-B: The following is a report from an experiment in which SCP-682 is exposed to SCP-999 in the hopes that it will curb the creature’s omnicidal rage.`,'\u200b')
        .addField('\u200b',`TO ACCESS THIS PLEASE SAY THE FOLLOWING: ||;999B||`,'\u200b')
        
        .setTimestamp('Foundation Information')



module.exports = {
	name: '999',
	description: 'Inlcudes info on SCP-999',
	execute(message, args) {
		message.channel.send(SCP_999);
        message.channel.send(SCP_999A)
       
    },
};
