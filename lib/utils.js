'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCharacterDeathInformationByName = exports.getCharacterInformationByName = exports.getOnlinePlayersByWorld = exports.isAValidWorld = exports.getTibiaWorlds = exports.requestUrl = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _tinyreq = require('tinyreq');

var _tinyreq2 = _interopRequireDefault(_tinyreq);

var _parsers = require('./parsers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestUrl = exports.requestUrl = function requestUrl(url, parser) {
  return new Promise(function (resolve, reject) {
    (0, _tinyreq2.default)(url, function (error, body) {
      if (error) reject(error);
      resolve(parser(body));
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

var isAValidWorld = exports.isAValidWorld = function isAValidWorld(world) {
  return new Promise(function (resolve, reject) {
    getTibiaWorlds().then(function (result) {
      return resolve(_lodash2.default.findIndex(result, function (world) {
        return world.name === world;
      }));
    }).catch(function (error) {
      return console.log(error);
    });
  });
};

var getOnlinePlayersByWorld = exports.getOnlinePlayersByWorld = function getOnlinePlayersByWorld(world) {
  return new Promise(function (resolve, reject) {
    var charactersByWorldUrl = '\n      https://secure.tibia.com/community/?subtopic=worlds&world=' + world + '\n    ';
    requestUrl(charactersByWorldUrl, _parsers.tibiaOnlinePlayersParser).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var getCharacterInformationByName = exports.getCharacterInformationByName = function getCharacterInformationByName(characterName) {
  return new Promise(function (resolve, reject) {
    var characterByNameUrl = '\n      https://secure.tibia.com/community/?subtopic=characters&name=' + characterName + '\n    ';
    requestUrl(characterByNameUrl, _parsers.tibiaCharacterDataParser).then(function (result) {
      console.log(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var getCharacterDeathInformationByName = exports.getCharacterDeathInformationByName = function getCharacterDeathInformationByName(characterName) {
  return new Promise(function (resolve, reject) {
    var characterByNameUrl = '\n      https://secure.tibia.com/community/?subtopic=characters&name=' + characterName + '\n    ';
    requestUrl(characterByNameUrl, _parsers.tibiaCharacterDeathParser).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
};