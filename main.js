/*==============================================================================================*\
|* Includes
\*==============================================================================================*/
include('/var/cod4server/scripts/player.js');

include('/var/cod4server/scripts/utils.js');
include('/var/cod4server/scripts/commands.js');


/*==============================================================================================*\
|* Global Variables
\*==============================================================================================*/
var players = [];


function onStatusRequest()
{
	var maxClients = getMaxClients();

	print("ID\tName\t\tIP");
	print("--\t----\t\t--");
	for(var i=0;i<maxClients;i++)
	{
		var player = getPlayerByID(i);
		print(i + ":\t" + player.getName() + "\t" + player.getIP());
	}
}

function onPlayerJoinRequest(ip)
{
	var ban = getBanByIP(ip);
	print("Reason for ban: " + ban.getReason());
	limboAccept(ip);
}

function onPlayerDisconnect(playerID)
{
	players[playerID].resetSessionData();
}

function onPlayerSay(playerID, message)
{
	var player = players[playerID].native;

	var foundPlayers = Utils.findPlayerIDsByPartName("test");
	print(foundPlayers[0]);

	// Attempt an execution of a registered command
	var cmdResult = bang.execute(playerID, message);

	// Auto forward the chat on to all players if not a command
	if(cmdResult == 0)
	{
		var isMuted = players[playerID].getSessionData('muted');
		
		// Check if the player is muted or not
		if(isMuted === undefined || isMuted === false)
		{
			// Commit some filtering
			var out = Utils.filterIP(message, "^1NOPE^7");

			// If the player is above a certain rank his name will be red!
			
			sendMessageToAll(player.getName() + ": " + message);
		}
		else
		{
			player.sendMessage("^1You are muted");
		}

		// GC
		isMuted = null;
	}
	else if(cmdResult == 2)
		player.sendMessage("^1No known command");
	else if(cmdResult == 4)
		player.sendMessage("^1You do not have permissions to execute this command");

	// GC
	player = null;
}

function onScriptColdBoot()
{
	scriptStart();

	sendMessageToAll("^1Cold boot completed successfully");
}

function onServerInit()
{
	scriptStart();
}

function scriptStart()
{
	// Full out the players array with all the players
	var i, len;
	for(i = 0, len = getMaxClients(); i < len; i++)
		players.push(new Player(i));
}