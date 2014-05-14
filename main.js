/*==============================================================================================*\
|* Includes
\*==============================================================================================*/
include('/var/cod4server/scripts/utils.js');
include('/var/cod4server/scripts/commands.js');

include('/var/cod4server/scripts/player.js');

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

function onPlayerSay(playerID, message)
{
	var player = players[i].native;

	// Attempt an execution of a registered command
	var cmdResult = bang.execute(playerID, message);

	// Auto forward the chat on to all players if not a command
	if(cmdResult == 0)
	{
		// Commit some filtering
		var out = Utils.filterIP(message, "^1NOPE^7");

		// If the player is above a certain rank his name will be red!
		
		sendMessageToAll(player.getName() + ": " + out);
	}
	else if(cmdResult == 2)
		player.sendMessage("^1No known command");
	else if(cmdResult == 4)
		player.sendMessage("^1You do not have permissions to execute this command");
}

function onScriptColdBoot()
{
	sendMessageToAll("^1Cold boot completed successfully");
}

function onServerInit()
{
	// Full out the players array with all the players
	for(var i=getMaxClients() - 1; i>=0; i--)
		players.push(new Player(i));

	players[i].setStatus();
}