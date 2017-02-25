'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tibiaCharacterDeathParser = exports.tibiaCharacterDataParser = exports.tibiaOnlinePlayersParser = exports.tibiaWorldsParser = undefined;

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _stringUtils = require('./string-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getWorldsData = function getWorldsData($) {
  return function (i, tr) {
    var worldInfo = [];
    // To dont get the headers titles
    if (i === 0) return;

    $(tr).find('td').each(function (index, td) {
      worldInfo.push($(td).text());
    });

    return {
      name: worldInfo[0],
      playersOnline: worldInfo[1],
      location: worldInfo[2],
      pvpType: worldInfo[3],
      additionalInfo: worldInfo[4]
    };
  };
};

var onlinePlayersData = function onlinePlayersData($) {
  return function (i, tr) {
    var characterData = [];
    // To dont get the headers titles
    if (i === 0) return;
    $(tr).find('td').each(function (index, td) {
      characterData.push($(td).text());
    });
    return {
      name: characterData[0],
      level: characterData[1],
      vocation: characterData[2]
    };
  };
};

var characterInformationData = function characterInformationData($) {
  return function (i, tr) {
    var characterData = [];
    // To dont get the headers titles
    if (i === 0) return;
    $(tr).find('td').each(function (index, td) {
      characterData.push($(td).text());
    });
    return _defineProperty({}, (0, _stringUtils.camelize)(characterData[0].replace(/^0+/, "")), characterData[1]);
  };
};

var characterDeathInformationData = function characterDeathInformationData($) {
  return function (i, tr) {
    var characterDeathData = [];
    // To dont get the headers titles
    if (i === 0) return;
    $(tr).find('td').each(function (index, td) {
      characterDeathData.push($(td).text());
    });
    return {
      date: characterDeathData[0],
      killedByMessage: characterDeathData[1]
    };
  };
};

var tibiaWorldsParser = exports.tibiaWorldsParser = function tibiaWorldsParser(body) {
  var $ = _cheerio2.default.load(body);
  return $($('.Table3 .TableContent')[1]).find('tr').map(getWorldsData($)).get();
};

var tibiaOnlinePlayersParser = exports.tibiaOnlinePlayersParser = function tibiaOnlinePlayersParser(body) {
  var $ = _cheerio2.default.load(body);
  return $('.Table2').find('tr').map(onlinePlayersData($)).get();
};

var tibiaCharacterDataParser = exports.tibiaCharacterDataParser = function tibiaCharacterDataParser(body) {
  var $ = _cheerio2.default.load(body);
  return $('b:contains("Character Information")').parent().parent().parent().find('tr').map(characterInformationData($)).get().reduce(function (result, object) {
    var key = Object.keys(object);
    result[key] = object[key];
    return result;
  }, {});
};

var tibiaCharacterDeathParser = exports.tibiaCharacterDeathParser = function tibiaCharacterDeathParser(body) {
  var $ = _cheerio2.default.load(body);
  return $('b:contains("Character Deaths")').parent().parent().parent().find('tr').map(characterDeathInformationData($)).get();
};