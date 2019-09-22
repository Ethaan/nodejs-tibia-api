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

#### NOTE

Tibia is taking some minutes to refresh the online list, so better use `getCharacterInformation`

**Example response**
```
 {
   { name: String, level: String, vocation: String },
 }

`getCharacterInformation(characterName)` - Method to get the whole character information by a giving name, like kills and online

**Example response**
```
{
  kills: [
    {
      name: String,
      timeAgo: String,
      killedBy: String
    },
    ...deaths
  ],
  characters: [
    {
      name: String,
      world: String,
      isOnline: Boolean
    }
  ]
}
```

`getGuildInformation({ guildUrl })` - Method to get the guild information by a giving guild URL or guild name.

**Example response**
```
[
  members: [{
    rank: ' ',
     name: String,
     vocation: String,
     level: String,
     joiningDate: String,
     status: String,
     isOnline: Boolean
  }],
  invitedMembers: [{
    name: String,
    invitationDate: String
  }],
  guildMembersOnline: Number,
  guildInformation: String
]
```

## TODO

- [ ] Tests