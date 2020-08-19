const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
import { InterpretMessage } from './interpreter.js';

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content.startsWith(config.PREFIX)) {
		let args = message.content.split(' ');
		let command = args[1];
		let argument = args[2];
		let channel = message.channel;
		InterpretMessage(command, channel, argument);
	}
});


client.login(config.BOT_TOKEN);