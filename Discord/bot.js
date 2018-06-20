const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

client.login('NDU0NTQ0NTI4NjExNzM3NjAx.DfvBCQ.pNcmtcRjgqjJLjBAWD3MQYJcyVo');


client.on('ready', () => {
  client.user.setPresence({ game: { name: "!help" }, status: 'online' })
    .then(console.log).then(() => { client.user.setUsername('Patates Bot') })
    .catch(console.error)
    .then(() => { console.log(`Logged in as ${client.user.username}!`) })
});

client.on('message', msg => {
  if (msg.content === "!help") {
    msg.author.createDM()
      .then(() => {
        msg.author.dmChannel.send(
          "```\
        *********************************************************\n\
        !help           : List you all the functions.\n\
        !p {Youtube Url}: Plays sound from given youtube url.\n\
        !test           : checks whether bot alive or not.\n\
        !dc             : Bot Leaves the channel.\n\
        !delete {number}: deletes [number] of last sent messages.\n\
        *********************************************************\
        ```")
      })
      .catch(console.error)
      .then(() => { console.log(`Dm sent to ${msg.author.username}!`) })
  }
});

client.on(`message`, msg => {
  if (msg.content === `!test`) {
    msg.reply("I'm Alive!! ")
      .then(() => { console.log("Aktif!!") })
      .catch(console.error)
  }
});

client.on('message', msg => {
  if (msg.content === `!delete`) {
    const number = msg.content.slice(1).trim().split(/ +/g);
    const command = number.shift().toLowerCase()
    if (number[0] > 10) {
      msg.reply(`You cant delete more than 10 messages`);
      number[0] = 10;
    }
    number[0]++;
    msg.channel.bulkDelete(number[0]);
    number[0]--;
    console.log(`${number[0]} messages deleted by ${msg.author.username}`);
    msg.reply(`Deleted ${number} message(s)!`)
  }
})

client.on(`message`, msg => {
  if (msg.content === `!destroy`) {
    msg.reply("Bay Bay")
      .then(() => client.user.setPresence({ game: { name: "!help" }, status: 'invisible' }))
      .catch(console.error)
      .then(console.log(`destroyed by ${msg.author.username} `))
      .then(() => client.destroy())
  }
})
client.on(`message`, msg => {
  if (msg.content === `!dc`) {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.leave()
      msg.reply("Bay Bay")
        .then(() => { client.user.setPresence({ game: { name: "!help" }, status: 'online' }) })
        .then(() => console.log)
        .catch(console.error)
    }
    else { msg.reply("you need to be in VoiceChannel") }
    console.log("left voice chat")
  }
})

client.on(`message`, msg => {
  if ((msg.content.charAt(0) == '!') && (msg.content.charAt(1) == 'p')) {
    if (msg.member.voiceChannel) {
      const video1 = msg.content.slice(1).trim().split(/ +/g);
      const command = video1.shift().toLowerCase()
      ytdl.getInfo(video1[0]);
      msg.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          msg.reply(`Joined channel  ${msg.member.voiceChannel.name}`);
          const stream = ytdl(video1[0], { filter: "audioonly" });
          const streamoptions = { seek: 0, volume: 0.1 };
          const dispatcher = connection.playStream(stream, streamoptions);
        })
        .then(() => { client.user.setPresence({ game: { name: `playing music` }, status: 'online' }) })
        .catch(console.log)
        console.log('playing music')
    } else { msg.reply('you need to be in any voice channels') }
  }
})