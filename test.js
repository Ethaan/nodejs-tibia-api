import TibiaAPI from './src/tibia-api';

const tibiaAPI = new TibiaAPI({ worldName: 'Funera' });

tibiaAPI.getCharacterInformation('Ethaanpump').then((result) => {
  console.log(result);
})