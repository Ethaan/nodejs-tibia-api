import _ from 'lodash';
import cloudscraper from 'cloudscraper'
import {
  tibiaWorldsParser,
  tibiaOnlinePlayersParser,
  tibiaGuildInformationParser,
  tibiaCharacterInformationParser,
} from './parsers';

export const requestUrl = (uri, parser) => (
  new Promise((resolve, reject) => {
    cloudscraper.get({
      uri,
      header: {
        'Cache-Control': 'max-age=0, no-cache, must-revalidate, proxy-revalidate',
      },
    }).then((body) => {
      resolve(parser(body));
    }).catch((error) => {
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

    requestUrl(characterByNameUrl, tibiaCharacterInformationParser(characterName)).then((result) => {
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
