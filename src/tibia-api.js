import {
  requestUrl,
  isAValidWorld,
  getTibiaWorlds,
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
      let worldNameToUse = worldName ? worldName : this.world;
      if (!worldNameToUse) {
        console.warn('No Game word passed');
        return;
      }
      isAValidWorld(worldNameToUse).then((isValid) => {
        if (isValid) {
          getOnlinePlayersByWorld(worldNameToUse).then((result) => {
            resolve(result)
          }).catch((error) => console.log(error))
        } else {
          reject(`${worldNameToUse} is not a valud Server World`);
        }
      }).catch((error) => reject(error));
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
        resolve(result.invitedMembers);
      }).catch((error) => reject(error));
    });
  }

  getGuildInformation(guildNameOrUrl) {
    if (!guildNameOrUrl) {
      console.warn('Guild Name or url is needed');
      return;
    };
    let guildUrl = guildNameOrUrl;
    const baseGuildsUrl = 'https://secure.tibia.com/community/?subtopic=guilds&page=view&GuildName=';
    const isByUrl = isUrl(guildNameOrUrl);
    if (!isByUrl) {
      guildUrl = `${baseGuildsUrl}${guildNameOrUrl.replace(/ /g, '+')}`;
    };
    return new Promise((resolve, reject) => {
      getGuildInformationByUrl(guildUrl).then((result) => {
        resolve(result);
      }).catch((error) => reject(error));
    });
  }
}

const tibia = new TibiaAPI({ worldName: 'Zanera' });

tibia.getGuildInformation('Last Resort').then((result) => {
  console.log(result)
}).catch((error) => console.log(error));

export default TibiaAPI;
