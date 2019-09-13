import {
  getOnlinePlayersByWorld,
  getGuildInformationByUrl,
  getCharacterInformationByName,
  getCharacterDeathInformationByName,
} from './utils';
import { isUrl } from './string-utils';

class TibiaAPI {
  constructor(props) {
    if (props && props.worldName) {
      this.worldName = props.worldName;
    }
  }

  getOnlinePlayers(worldName) {
    return new Promise((resolve, reject) => {
      let worldNameToUse = worldName ? worldName : this.worldName;
      if (!worldNameToUse) {
        console.warn('No Game word passed');
        return;
      }

      getOnlinePlayersByWorld(worldNameToUse).then((result) => {
        resolve(result)
      })
    });
  }

  getCharacterInformation(characterName) {
    if (!characterName) {
      console.warn('Characte rname is needed');
      returnl;
    };
    return new Promise((resolve, reject) => {
      getCharacterInformationByName(characterName).then((result) => {
        resolve(result);
      }).catch((error) => reject(error));
    });
  }

  getCharacterDeathInformation(characterName) {
    if (!characterName) {
      console.warn('Charactername is needed');
      return;
    };
    return new Promise((resolve, reject) => {
      getCharacterDeathInformationByName(characterName).then((result) => {
        resolve(result);
      }).catch((error) => reject(error));
    });
  }

  getGuildInformation({ guildUrl }) {
    if (!guildUrl) {
      console.warn('Guild Name or url is needed');
      return;
    };
    let guildUrlToUse = guildUrl;
    const baseGuildsUrl = 'https://secure.tibia.com/community/?subtopic=guilds&page=view&GuildName=';
    const isByUrl = isUrl(guildUrl);
    if (!isByUrl) {
      guildUrlToUse = `${baseGuildsUrl}${guildNameOrUrl.replace(/ /g, '+')}`;
    };
    return new Promise((resolve, reject) => {
      getGuildInformationByUrl(guildUrlToUse).then((result) => {
        resolve(result);
      }).catch((error) => reject(error));
    });
  }
}

export default TibiaAPI;
