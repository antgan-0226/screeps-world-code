//维修工
var roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            var structureTarget = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });
            if (structureTarget) {
                if (creep.repair(structureTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structureTarget, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                creep.standBy('repairerArea')
            }
        } else {
            creep.getEnergy();
        }
    }
};

module.exports = roleRepairer;