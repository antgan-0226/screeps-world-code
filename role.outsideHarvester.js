//长距离采矿者
var roleOutsideHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	   this.workInOutside(creep);
	},
	
	//外派采矿者
	workInOutside: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            if (creep.room.name != creep.memory.opt.targetRoom) {
                let exit = creep.room.findExitTo(creep.memory.opt.targetRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                var activeSources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(creep.harvest(activeSources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(activeSources, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    } else {
            if (creep.room.name != creep.memory.opt.myRoom) {
                let exit = creep.room.findExitTo(creep.memory.opt.myRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                creep.putDownEnergy();
            }
	    }
	   
	}
};

module.exports = roleOutsideHarvester;