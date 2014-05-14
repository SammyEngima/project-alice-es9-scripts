var Utils = {

	/*==============================================================================================*\
	|* Functions
	\*==============================================================================================*/

	/**
	 * Gets a map's machine name (mp_*) from its friendly name
	 * 
	 * @param  {string} mapName - Map's friendly name
	 * @return {string}         - Null if not found
	 */
	getMapMachineName: function(mapName)
	{
		mapName = mapName.toLowerCase();

		var i, len;
		for(i = 0, len = this.mapFriendlyNames.length ; i < len ; i++)
		{
			if(this.mapFriendlyNames[i].toLowerCase() === mapName)
				return this.mapMachineNames[i];
		}

		return null;
	},

	/**
	 * Generates a random number (int) between min and max
	 * 
	 * @param  {uint} min
	 * @param  {uint} max
	 * @return {uint}
	 */
	rand: function(min, max)
	{
		return Math.round((Math.random() * (max - min)) + min);
	},

	/**
	 * Filters out IP from a string
	 * 
	 * @param  {string} haystack - The string that contains the IP
	 * @param  {string} replace  - The string you wish to replace with the IP
	 * @return {string}
	 */
	filterIP: function(haystack, replace)
	{
		return haystack.replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, replace);
	},

	/**
	 * Finds only a handful of players by partial name. Converts integers to string.
	 * This is a case insensitive search.
	 * 
	 * @param  {string} needle - Partial or full name.
	 * @return {array}         - Array of slot/index IDs of each player matched. Null if
	 *                           no players found.
	 */
	findPlayerIDsByPartName: function(needle)
	{
		// Names cannot be longer than 14 characters so why waste the time trying to
		// look for one? ;)
		if(needle.length > 14)
			return null;

		var found = [];

		needle = needle.toLowerCase();

		var i, len, player, playerName;
		for(i = 0, len = getMaxClients() ; i < len ; i++)
		{
			player = getPlayerByID(i);
			playerName = player.getName().toLowerCase();

			if(playerName.search(needle) >= 0)
				found.push(i);
		}

		// GC
		i = null;
		len = null;
		player = null;
		playerName = null;

		return found.length > 0 ? found : null;
	},


	/*==============================================================================================*\
	|* Variables
	\*==============================================================================================*/

	mapMachineNames: [
		'mp_convoy',
		'mp_backlot',
		'mp_bloc',
		'mp_bog',
		'mp_broadcast',
		'mp_carentan',
		'mp_citystreets',
		'mp_countdown',
		'mp_crash',
		'mp_crash_snow',
		'mp_creek',
		'mp_crossfire',
		'mp_farm',
		'mp_killhouse',
		'mp_overgrown',
		'mp_pipeline',
		'mp_shipment',
		'mp_showdown',
		'mp_strike',
		'mp_vacant',
		'mp_cargoship'
	],
	mapFriendlyNames: [
		'Ambush',
		'Backlot',
		'Bloc',
		'Bog',
		'Broadcast',
		'China Town',
		'Citystreets',
		'Countdown',
		'Crash',
		'Winter Crash',
		'Creek',
		'Crossfire',
		'Downpour',
		'Killhouse',
		'Overgrown',
		'Pipleline',
		'Shipment',
		'Showdown',
		'Strike',
		'Vacant',
		'Wetworks'
	]
};
