'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGuildInformationByUrl = exports.getCharacterDeathInformationByName = exports.getCharacterInformationByName = exports.getOnlinePlayersByWorld = exports.getTibiaWorlds = exports.requestUrl = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cloudscraper = require('cloudscraper');

var _cloudscraper2 = _interopRequireDefault(_cloudscraper);

var _parsers = require('./parsers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestUrl = exports.requestUrl = function requestUrl(url, parser) {
  return new Promise(function (resolve, reject) {
    _cloudscraper2.default.get(url).then(function (body) {
      resolve(parser(body));
    }).catch(function (error) {
      console.log(error);
      reject(error);
    });
  });
};

var getTibiaWorlds = exports.getTibiaWorlds = function getTibiaWorlds() {
  return new Promise(function (resolve, reject) {
    var tibiaWorldsURL = 'https://secure.tibia.com/community/?subtopic=worlds';
    requestUrl(tibiaWorldsURL, _parsers.tibiaWorldsParser).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var getOnlinePlayersByWorld = exports.getOnlinePlayersByWorld = function getOnlinePlayersByWorld(world) {
  return new Promise(function (resolve, reject) {
    var charactersByWorldUrl = 'https://www.tibia.com/community/?subtopic=worlds&world=' + world;
    requestUrl(charactersByWorldUrl, _parsers.tibiaOnlinePlayersParser).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var getCharacterInformationByName = exports.getCharacterInformationByName = function getCharacterInformationByName(characterName) {
  return new Promise(function (resolve, reject) {
    var characterByNameUrl = 'https://www.tibia.com/community/?subtopic=characters&name=' + encodeURI(characterName);

    requestUrl(characterByNameUrl, _parsers.tibiaCharacterDataParser).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var getCharacterDeathInformationByName = exports.getCharacterDeathInformationByName = function getCharacterDeathInformationByName(characterName) {
  return new Promise(function (resolve, reject) {
    var characterByNameUrl = 'https://www.tibia.com/community/?subtopic=characters&name=' + encodeURI(characterName);

    requestUrl(characterByNameUrl, _parsers.tibiaCharacterDeathParser).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var getGuildInformationByUrl = exports.getGuildInformationByUrl = function getGuildInformationByUrl(guildUrl) {
  return new Promise(function (resolve, reject) {
    requestUrl(guildUrl, _parsers.tibiaGuildInformationParser).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
};