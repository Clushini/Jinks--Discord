const Discord = require('discord.js');
const fs = require('fs');
import { searchDatabase, saveLink, checkAuthorization } from './calls';
let auth = false;

export const InterpretMessage = (message, channel, argument) => {
    if (message == "ping") {
        channel.send("pong");
    }

    if (message == "search" && argument) {
        handleLookup(channel, argument);
    }

    if (message == "save" && argument) {
        handleSave(channel, argument);
    }

    if (message == "auth" && argument) {
        handleAuth(channel, argument);
    }
}

const handleSave = (channel, argument) => {
    saveLink(argument).then((response) => {
        if (response.data) {
            channel.send(response.data);
        }
    })
}

const constructEmbed = (channel, results) => {
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${results.hits.total} results found!`)
	.setURL('https://jinks.io/')
	.setAuthor('Jinks Pre-Alpha', 'https://i.imgur.com/Kh9EGMR.png', 'https://jinks.io/')
	.setDescription(`Found ${results.hits.total} results in ${results.took} milliseconds`)
	.setThumbnail('https://i.imgur.com/Kh9EGMR.png')
	.setTimestamp()
    .setFooter('Created by Aaron Lilla - All Rights Reserved', 'https://i.imgur.com/Kh9EGMR.png');

    results.hits.hits.map(item => {
        exampleEmbed.addField(`${item._source.title} - Search Score: ${item._score}`, `${item._source.link}`, false);
        // fs.writeFile("test.txt", JSON.stringify(item), function(err) {
        //     if (err) return console.log(err);
        //     console.log('Hello World > helloworld.txt');
        // })
    })

    // results.map(item => {
    //     exampleEmbed.addField(`${item.title}`, `${item.link}`, false);
    // })
    
    channel.send(exampleEmbed);
}

const handleLookup = (channel, searchterm) => {
    searchDatabase(searchterm).then((response) => {
        let data = response.data;
        console.log(response.data)
        if (data.hits.total > 0) {
            constructEmbed(channel, data);
        } 
        else {
            //channel.send("No results found.")
        }
    })
}

const handleAuth = (channel, token) => {
    checkAuthorization(token).then((response) => {
        if (response.data == "authorized") {
            auth = true;
            channel.send("Successfully authorized.");
        }
    })
}