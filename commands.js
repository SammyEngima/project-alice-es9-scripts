// include("/var/cod4server/scripts/bang.js");

/*==============================================================================================*\
|* Command Registration
\*==============================================================================================*/



// Global vars
var bang = new Bang();


/*==============================================================================================*\
|* Command Registration
\*==============================================================================================*/

// Public commands
bang.regCommand("me", null, 1, cmdMe);
bang.regCommand("ping", null, 0, cmdPing);

// Commands requiring permissions
bang.regCommand("ph", "playerhistory", 1, cmdPlayerHistory);
bang.regCommand("kick", "kick", 2, cmdKick);
bang.regCommand("mute", null, 2, cmdMute);
bang.regCommand("map", "map_change", 1, cmdLoadMap);
bang.regCommand("resetmap", "map_reset", 1, cmdResetMap);
bang.regCommand("maps", "map_list", 0, cmdListMaps);


/*==============================================================================================*\
|* Commands
\*==============================================================================================*/

/*-----------------------------------------------*\
|* !me [action]
\*-----------------------------------------------*/
function cmdMe(playerID, args)
{
	var player = getPlayerByID(playerID);
	sendMessageToAll(player.getName() + " " + args[1]);
}

/*-----------------------------------------------*\
|* !ping
\*-----------------------------------------------*/
function cmdPing(playerID, args)
{
	var player = getPlayerByID(playerID);
	sendMessageToAll("Pong");
}

/*-----------------------------------------------*\
|* !ph [(page)]
\*-----------------------------------------------*/
function cmdPlayerHistory(playerID, args)
{

}

/*-----------------------------------------------*\
|* !kick [player id] [reason]
\*-----------------------------------------------*/
function cmdKick(playerID, args)
{
	var executor = getPlayerByID(playerID);
	var usageMsg = "^1Usage: !kick [playerid/partial name] [reason]";

	if(args.length < 3)
		executor.sendMessage(usageMsg);
	else
	{
		var targetPlayer = getPlayerByID(args[1]);
		targetPlayer.kick(args[2]);
	}
}

/*-----------------------------------------------*\
|* !mute [player id] [reason]
\*-----------------------------------------------*/
function cmdMute(playerID, args)
{
	var executor = getPlayerByID(playerID);
	var usageMsg = "^1Usage: !mute [playerid/partial name] [reason]";

	if(args.length < 3)
		executor.sendMessage(usageMsg);
	else
	{
		var playersFound = Utils.findPlayerIDs(args[1]);

		if(playersFound != null)
		{
			if(playersFound.length === 1)
				players[playersFound[0]].setSessionData('muted', true);
			else
				cmdMultiplePlayers(playerID, playersFound);
		}
		else
			cmdNoPlayers(playerID);
	}
}

/*-----------------------------------------------*\
|* !map [map name]
\*-----------------------------------------------*/
function cmdLoadMap(playerID, args)
{
	var executor = getPlayerByID(playerID);

	if(args.length < 2)
	{
		executor.sendMessage("^1Usage: !map [map name]");
		executor.sendMessage("^1Use ^5!maps ^1for a list of usable [map name]s");
	}
	else
	{
		var mapMachineName = Utils.getMapMachineName(args[1]);
		
		if(mapMachineName != null)
			loadMap(mapMachineName);
		else
			executor.sendMessage("^1Map does not exist, use ^5!maps ^1for a list of usable [map name]s");
	}
}

/*-----------------------------------------------*\
|* !resetmap
\*-----------------------------------------------*/
function cmdResetMap(playerID, args)
{
	resetMap();
}

/*-----------------------------------------------*\
|* !maps
|* Lists all usable maps
\*-----------------------------------------------*/
function cmdListMaps(playerID, args)
{
	var player = getPlayerByID(playerID);
	var chunkCnt = 1;
	var mapNameChunk = "";

	// We wanna build a string that contains 5 map names
	// then send it to the player
	for(var i = 0, len = Utils.mapFriendlyNames.length; i < len; i++)
	{
		mapNameChunk += Utils.mapFriendlyNames[i] + " ^2|^7 ";

		if(chunkCnt == 5)
		{
			player.sendMessage(mapNameChunk);
			chunkCnt = 1;
			mapNameChunk = "";
		}

		chunkCnt++;
	}
	
	if(mapNameChunk != "")
		player.sendMessage(mapNameChunk);
}


/*==============================================================================================*\
|* General
\*==============================================================================================*/
function cmdMultiplePlayers(playerID, playersFound)
{
	players[playerID].native.sendMessage("^1Multiple players found:");

}

function cmdNoPlayers(playerID)
{
	players[playerID].native.sendMessage("No players found");
}