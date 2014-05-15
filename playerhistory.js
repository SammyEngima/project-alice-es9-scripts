var PlayerHistory = {

	capacity: 10, // Amount of snap shots to store
	snaps: [], // Holds PlayerSnapshots

	/**
	 * Creates a snapshot of a player and puts it in the snaps.
	 * 
	 * @param {int} playerID - Player's ID
	 */
	addPlayer: function(playerID)
	{
		// Remove the last entry if it's reached its cap
		if(snaps.length === this.capacity)
			this.snaps.splice(0, 1);

		// Create the snapshot of the player and insert it into the snap
		this.snaps.push(new PlayerSnapShot(playerID));
	},

	/**
	 * Returns the array of all the snaps being held.
	 * 
	 * @return {array} - Snaps of each player
	 */
	getPlayers: function()
	{
		return snaps;
	}

};

function PlayerSnapShot(playerID) {

	var player = getPlayerByID(playerID);

	this.playerID = playerID;
	this.name     = player.getName();
	this.ip       = player.getIP();
	this.guid     = "-";

}