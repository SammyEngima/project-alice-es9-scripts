function Player(slotID) {
	
	this.native  = getPlayerByID(slotID);
	this.data    = {};
	this.tmpData = {};
}

Player.prototype = {

	getName: function()
	{
		return this.native.getName();
	}

}