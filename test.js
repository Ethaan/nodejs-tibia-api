import TibiaAPI from './src/tibia-api';

const tibiaAPI = new TibiaAPI({ worldName: 'Funera' });

tibiaAPI.getGuildInformation({ guildUrl: 'https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=Reckless&action=characters' }).then((result) => {
  console.log(result);
})