//建筑工
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if (targets && targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                creep.standBy('builderArea');
            }
        } else {
            creep.getEnergy();
        }
    }
};

module.exports = roleBuilder;