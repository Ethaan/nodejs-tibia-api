import _ from 'lodash';
import cloudscraper from 'cloudscraper'
import tinyreq from 'tinyreq';
import {
  tibiaWorldsParser,
  tibiaOnlinePlayersParser,
  tibiaCharacterDataParser,
  tibiaCharacterDeathParser,
  tibiaGuildInformationParser,
} from './parsers';

export const requestUrl = (url, parser) => (
  new Promise((resolve, reject) => {
    cloudscraper.get(url).then((body) => {
      resolve(parser(body));
    }).catch((error) => {
      console.log(error);
      reject(error)
    })
  })
);

export const getTibiaWorlds = () => (
  new Promise((resolve, reject) => {
    const tibiaWorldsURL = 'https://secure.tibia.com/community/?subtopic=worlds';
    requestUrl(tibiaWorldsURL, tibiaWorldsParser).then((result) => {
      resolve(result);
    }).catch((error) => reject(error))
  })
);

export const getOnlinePlayersByWorld = world => (
  new Promise((resolve, reject) => {
    const charactersByWorldUrl = `https://www.tibia.com/community/?subtopic=worlds&world=${world}`;
    requestUrl(charactersByWorldUrl, tibiaOnlinePlayersParser).then((result) => {
      resolve(result);
    }).catch((error) => reject(error))
  })
);

export const getCharacterInformationByName = characterName => (
  new Promise((resolve, reject) => {
    const characterByNameUrl = `https://www.tibia.com/community/?subtopic=characters&name=${encodeURI(characterName)}`;

    requestUrl(characterByNameUrl, tibiaCharacterDataParser).then((result) => {
      resolve(result)
    }).catch((error) => reject(error))
  })
);

export const getCharacterDeathInformationByName = characterName => (
  new Promise((resolve, reject) => {
    const characterByNameUrl = `https://www.tibia.com/community/?subtopic=characters&name=${encodeURI(characterName)}`;

    requestUrl(characterByNameUrl, tibiaCharacterDeathParser).then((result) => {
      resolve(result);
    }).catch((error) => reject(error))
  })
);

export const getGuildInformationByUrl = guildUrl => (
  new Promise((resolve, reject) => {
    requestUrl(guildUrl, tibiaGuildInformationParser).then((result) => {
      resolve(result);
    }).catch((error) => reject(error))
  })
)
