//捡地上或墓碑的能量运输者
var roleCarrier = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //如果背包有空间，捡垃圾
	    if(creep.store.getFreeCapacity() > 0) {
	        const droppedTargets = creep.room.find(FIND_DROPPED_RESOURCES);
            if(droppedTargets && droppedTargets.length > 0) {
                if(creep.pickup(droppedTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedTargets[0]);
                    return
                }
            }
	        const tombstonesTargets = creep.room.find(FIND_TOMBSTONES);
            if(tombstonesTargets && tombstonesTargets.length > 0) {
                if(creep.withdraw(tombstonesTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombstonesTargets[0]);
                    return
                }
            }
        } else {
            creep.putDownEnergy();
        }
	}
};

module.exports = roleCarrier;