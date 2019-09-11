## NodeJS Promise bassed API.

Easy to use [Tibia](http://www.tibia.com/news/?subtopic=latestnews) API.

### Get started

`npm install tibia-api`

### How to use it.

```
import TibiaAPI from 'tibia-api';

const tibiaAPI = new TibiaAPI({ worldName: 'Funera' });

tibiaAPI.getOnlinePlayers().then((result) => {
  console.log(result);
})
```
### Methods.

`getOnlinePlayers(worldName)` - Method to get all the online players `worldName` is optional, but be sure to pass a `worldName` when you initialize the function.

**Example response**
```
 {
   { name: 'Abelardini', level: '246', vocation: 'Royal Paladin' },
   ...more,
 }
```
`getCharacterInformation(characterName)` - Method to get the whole character information

**Example response**
```
{ 'name:': 'Diegopump ',
  'sex:': 'male',
  'vocation:': 'Elder Druid',
  'level:': '257',
  'achievementPoints:': '171',
  'world:': 'Morta',
  'residence:': 'Thais',
  'lastLogin:': 'Feb 12 2017, 06:35:37 CET',
  'accountStatus:': 'Free Account'
}
```

`getCharacterDeathInformation(characterName)` - Method to get the whole character death information by a giving name

**Example response**
```
[
  { timeAgo: 'Feb 12 2017, 04:47:16 CET', killedBy: 'Killed  at Level 258 by Fenlord.' },
  ...deaths
]
```

`getGuildInformation({ guildUrl })` - Method to get the guild information by a giving guild URL or guild name.

**Example response**
```
[
  members: [{
    rank: ' ',
     name: 'Devade Pous',
     vocation: 'Royal Paladin',
     level: '140',
     joiningDate: 'Dec 10 2016',
     status: 'offline',
     isOnline: false
  },
  ...moreCharacters],
  invitedMembers: [{
    name: 'Devade Pous',
    invitationDate: 'Feb 20 2017' // you can parse this to whathever you needs
  }],
  guildMembersOnline: 6,
  guildInformation: 'guild information'
]
```

## TODO

- [ ] Tests