function Player(slotID) {
	
	this.native = getPlayerByID(slotID);
	this.slotID = slotID;

	this.data = {};
	this.sessionData = {}; // Data only lasts for as long as the player is on the server

	// Statuses
	this.nameBanned   = false;
	this.ipBanescaped = false;
}

Player.prototype = {

	toString: function()
	{
		return this.slotID + " -[" + this.getName() + " | " + this.getIP() + "]";
	},

	toColorString: function()
	{
		var str = "^5" + this.slotID + " -[";

		if(this.nameBanned)
			str += "^1" + this.getName();
		else
			str += "^2" + this.getName();

		str += " ^5| ^2" + this.getIP() + "^5]";

		return str;
	},


	// **************************************************************************
	// NATIVE WRAPPERS
	// **************************************************************************

	isConnected: function()
	{
		return this.native.isConnected();
	},

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

	sendMessage: function(message)
	{
		this.native.sendMessage(message);
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