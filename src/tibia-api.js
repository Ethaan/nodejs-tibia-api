import {
  requestUrl,
  isAValidWorld,
  getTibiaWorlds,
  getOnlinePlayersByWorld,
  getCharacterInformationByName,
  getCharacterDeathInformationByName,
} from './utils';

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
            console.log(result);
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
        resolve(result);
      }).catch((error) => reject(error));
    });
  }
}

const tibia = new TibiaAPI({ worldName: 'Zanera'});

tibia.getCharacterInformation('Diegopump').then((result) => console.log(result));

export default TibiaAPI;
