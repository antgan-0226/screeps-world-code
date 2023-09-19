//采矿者
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    this.workInLocal(creep);    
	},
	
	//本地采矿者
	workInLocal: function(creep) {
	    var activeSources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
	    if(activeSources) {
	        if(creep.harvest(activeSources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(activeSources, {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    } else {
	        creep.standBy('harvesterArea');
	    }
	}
};

module.exports = roleHarvester;