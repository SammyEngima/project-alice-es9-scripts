function Player(slotID) {
	
	this.native = getPlayerByID(slotID);
	this.data   = {};

	// Data only lasts for as long as the player is on the server
	this.sessionData = {};
}

Player.prototype = {

	getName: function()
	{
		return this.native.getName();
	},

	setSessionData: function(key, value)
	{
		this.sessionData[key] = value;
	},

	getSessionData: function(key)
	{
		return this.sessionData[key];
	}

}