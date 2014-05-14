function Player(slotID) {
	
	this.native = getPlayerByID(slotID);
	this.slotID = slotID;
	this.data = {};
	this.sessionData = {}; // Data only lasts for as long as the player is on the server
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
		if(key in this.sessionData)
			return this.sessionData[key];
		else
			return undefined;
	},

	resetSessionData: function()
	{
		this.sessionData = null;
		this.sessionData = {};
	}

}