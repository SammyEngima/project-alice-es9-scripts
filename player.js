function Player(slotID) {
	
	this.native = getPlayerByID(slotID);
	this.slotID = slotID;

	this.data = {};
	this.sessionData = {}; // Data only lasts for as long as the player is on the server
}

Player.prototype = {

	// **************************************************************************
	// NATIVE WRAPPERS
	// **************************************************************************

	getName: function()
	{
		return this.native.getName();
	},

	getIP: function()
	{
		return this.native.getIP();
	},

	getGUID: function()
	{
		// return this.native.getGUID();
		return "-";
	},



	// **************************************************************************
	// SESSION FUNCTIONS
	// **************************************************************************

	/**
	 * [setSessionData description]
	 * @param {[type]} key   [description]
	 * @param {[type]} value [description]
	 */
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