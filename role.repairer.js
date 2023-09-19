//维修工
var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            creep.getEnergy();
        } else {
            var structureTarget = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });
            if (structureTarget) {
                if (creep.repair(structureTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structureTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                 creep.standBy('repairerArea')
            }
        }
	}
};

module.exports = roleRepairer;