//补充能量者
var roleLorry = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
	        creep.memory.working = true;
	    }

	    if(creep.memory.working) {
	        // find closest spawn, extension or tower which is not full
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                            
            });
            if (structure == undefined) {
                structure = creep.room.storage;
                return
            }
        
            // if we found one
            if (structure != undefined && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            } else {
                creep.standBy('lorryArea')
            }
	    } else {
	       
	        //pick resources
	        const target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    return
                }
            }
            //pick TOMBSTONES
	        const targets2 = creep.room.find(FIND_TOMBSTONES);
            if(targets2.length > 0) {
                if(creep.withdraw(targets2[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets2[0]);
                    return
                }
            }
	        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, 
	            {filter: s => (s.structureType == STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] > 0}
	        );
            if (container != undefined) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	       //creep.getEnergy();
	    }
	},
};

module.exports = roleLorry;