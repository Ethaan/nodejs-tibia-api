import _ from 'lodash';
import cheerio from 'cheerio';
import { camelize } from './string-utils';

const getWorldsData = $ => {
  return (i, tr) => {
    const worldInfo = [];
    // To dont get the headers titles
    if (i === 0) return;

    $(tr).find('td').each((index, td) => {
      worldInfo.push($(td).text());
    });

    return {
      name: worldInfo[0],
      playersOnline: worldInfo[1],
      location: worldInfo[2],
      pvpType: worldInfo[3],
      additionalInfo:worldInfo[4]
    };
  }
};

const onlinePlayersData = $ => {
  return (i, tr) => {
    const characterData = [];
    // To dont get the headers titles
    if (i === 0) return;
    $(tr).find('td').each((index, td) => {
      characterData.push($(td).text());
    });
    return {
      name: characterData[0],
      level: characterData[1],
      vocation: characterData[2],
    };
  }
};

const characterInformationData = $ => {
  return (i, tr) => {
    const characterData = [];
    // To dont get the headers titles
    if (i === 0) return;
    $(tr).find('td').each((index, td) => {
      characterData.push($(td).text());
    });
    return {
      [camelize(characterData[0].replace(/^0+/, ""))]: characterData[1]
    };
  }
};

const characterDeathInformationData = $ => {
  return (i, tr) => {
    const characterDeathData = [];
    // To dont get the headers titles
    if (i === 0) return;
    $(tr).find('td').each((index, td) => {
      characterDeathData.push($(td).text());
    });

    return {
      timeAgo: characterDeathData[0],
      killedBy: characterDeathData[1],
    };
  }
};

const guildInvitedsData = $ => {
  return (i, tr) => {
    const invitedMemberData = [];
    // To dont get the headers titles
    if (i === 0 || i === 1) return;
    $(tr).find('td').each((index, td) => {
      invitedMemberData.push($(td).text());
    });
    return {
      name: invitedMemberData[0],
      invitationDate: invitedMemberData[1],
    };
  }
};

const guildInformationData = $ => {
  return (i, tr) => {
    const memberData = [];
    // To dont get the headers titles
    if (i === 0) return;
    $(tr).find('td').each((index, td) => {
      memberData.push($(td).text());
    });
    // This is basically a hack.
    // it was an easy fix related to this.
    // http://stackoverflow.com/questions/32413180/cheerio-scraping-returning-only-two-rows
    const level = memberData[3];
    if (!isNaN(parseInt(level))) {
      return {
        level,
        rank: memberData[0],
        name: memberData[1].replace(/ *\([^)]*\) */g, ""),
        vocation: memberData[2],
        joiningDate: memberData[4],
        status: memberData[5],
        isOnline: memberData[5] === 'online' ? true : false,
      };
    }
  }
};

export const tibiaWorldsParser = body => {
  const $ = cheerio.load(body);
  return $($('.Table3 .TableContent')[1])
         .find('tr')
         .map(getWorldsData($))
         .get()
};

export const tibiaOnlinePlayersParser = body => {
  const $ = cheerio.load(body);
  return $('.Table2')
         .find('tr')
         .map(onlinePlayersData($))
         .get();
};

export const tibiaCharacterDataParser = body => {
  const $ = cheerio.load(body);
  return $('b:contains("Character Information")')
         .parent()
         .parent()
         .parent()
         .find('tr')
         .map(characterInformationData($))
         .get()
         .reduce((result, object) => {
           const key = Object.keys(object);
           result[key] = object[key];
           return result;
         }, {});
};

export const tibiaCharacterDeathParser = body => {
  const $ = cheerio.load(body);
  return $('b:contains("Character Deaths")')
         .parent()
         .parent()
         .parent()
         .find('tr')
         .map(characterDeathInformationData($))
         .get()
}

export const tibiaGuildInformationParser = body => {
  const $ = cheerio.load(body);
  const members = $('tr').map(guildInformationData($)).get();
  const invitedMembers = $($('tr').parent()[15]).find('tr').map(guildInvitedsData($)).get();
  const guildMembersOnline = _.compact(members.map(({ isOnline }) => isOnline));
  return Object.assign({}, {
    members,
    invitedMembers,
    guildMembersOnline: guildMembersOnline.length,
    guildInformation: $('#GuildInformationContainer').text(),
  });
}
