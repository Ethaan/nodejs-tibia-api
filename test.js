import TibiaAPI from './src/tibia-api';

const tibiaAPI = new TibiaAPI({ worldName: 'Funera' });

tibiaAPI.getCharacterDeathInformation('Demoniac Joker').then((result) => {
  console.log(result);
})