## NodeJS Promise bassed API.

Easy to use [Tibia](http://www.tibia.com/news/?subtopic=latestnews) API.

### Get started

`npm install tibia-api;`

### How to use it.

```
import TibiaAPI from 'tibia-api';

const tibiaAPI = new TibiaAPI({ worldName: 'Zanera' });

tibiaAPI.getOnlinePlayers(// optional to pass world name here).then((result) => {
  console.log(result); // Array bassed online players to zanera
}).catch((error) => {
  console.log(error);
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
  { date: 'Feb 12 2017, 04:47:16 CET', killedByMessage: 'Killed  at Level 258 by Fenlord.' },
  ...deaths
]
```
