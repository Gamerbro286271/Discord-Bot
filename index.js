const Discord = require('discord.js');
const bot = new Discord.Client();

const token  = 'NTc4NzYwNDY1OTAwMTA5ODY1.XN9IUQ.P-fo05O6-oTvduYib0w3wbXkSsU';

const PREFIX = '!';

bot.on('ready', () =>{
	console.log('This  bot is online!');
})

bot.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'new-members');
	if (!channel) return;
	channel.send(`Welcome to the server, ${member}`);
});

bot.on('message', message => {
	if (!message.guild) return;

	if (message.content.startsWith('!kick')) {
	  const user = message.mentions.users.first();
	  if (user) {
		if(!message.member.roles.find(r => r.name === "STAFF")) return message.channel.send('YOU DO NOT HAVE PERMISSIONS')
		const member = message.guild.member(user);
		if (member) {
		  member.kick('Optional reason that will display in the audit logs').then(() => {
			message.reply(`Successfully kicked ${user.tag}`);
		  }).catch(err => {
			message.reply('I was unable to kick the member');
			console.error(err);
		  });
		} else {
		  message.reply('That user isn\'t in this guild!');
		}
	  } else {
		message.reply('You didn\'t mention the user to kick!');
	  }
	}
  });

  bot.on('message', message => {
	if (!message.guild) return;
  
	if (message.content.startsWith('!ban')) {
	  const user = message.mentions.users.first();
	  if (user) {
		if(!message.member.roles.find(r => r.name === "Administrator")) return message.channel.send('YOU DO NOT HAVE PERMISSIONS')
		const member = message.guild.member(user);
		if (member) {
		  member.ban({
			reason: 'They were bad!',
		  }).then(() => {
			message.reply(`Successfully banned ${user.tag}`);
		  }).catch(err => {
			message.reply('I was unable to ban the member');
			console.error(err);
		  });
		} else {
		  message.reply('That user isn\'t in this guild!');
		}
	  } else {
		message.reply('You didn\'t mention the user to ban!');
	  }
	}
  });

bot.on('message', message=>{

	let args = message.content.substring(PREFIX.length).split(" ");

	switch(args[0]){
		case 'ping':
			message.channel.sendMessage('pong!')
			break;
		case 'website':
			message.channel.sendMessage('COMING SOON!')
			break;
		case 'cad':
			message.channel.sendMessage('COMING SOON!')
			break;
		case 'clear':
			if(!message.member.roles.find(r => r.name === "STAFF")) return message.channel.send('YOU DO NOT HAVE PERMISSIONS')
			if(!args[1]) return message.reply('Error please define a certain amount')
			message.channel.bulkDelete(args[1]);
			break;
		case 'help':
			const embed = new Discord.RichEmbed()
			.setTitle('Informaion')
			.addField('Player Name', message.author.username)
			.addField('Help', 'List of Commands')
			.addField('!help', 'Brings up this text')
			.addField('!ping', 'Pong!')
			.addField('!website', 'Brings up our website')
			.addField('!cad', 'Brings up our cad')
			.addField('!clear', 'Clears a certain amount of messages')
			.addField('!kick', 'Kicks user')
			.addField('!ban', 'Bans a user')
			.setColor(0x00FF00)
			.setFooter('Made by Samuel W.')
			message.channel.sendEmbed(embed);
			break;
	}
})

bot.login(token);