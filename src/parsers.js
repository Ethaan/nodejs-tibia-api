import cheerio from 'cheerio';

const getWorldsData = ($) => {
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

const onlinePlayersData = ($) => {
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

const characterInformationData = ($) => {
  return (i, tr) => {
    const characterData = [];
    // To dont get the headers titles
    if (i === 0) return;
    $(tr).find('td').each((index, td) => {
      characterData.push($(td).text());
    });
    return {
      [characterData[0].replace(/^0+/, "")]: characterData[1]
    };
  }
};

const characterDeathInformationData = ($) => {
  return (i, tr) => {
    const characterDeathData = [];
    // To dont get the headers titles
    if (i === 0) return;
    $(tr).find('td').each((index, td) => {
      characterDeathData.push($(td).text());
    });
    return {
      date: characterDeathData[0],
      killedByMessage: characterDeathData[1],
    };
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
