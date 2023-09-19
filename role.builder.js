//建筑工
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //背包有空间，则去取能量
        if (creep.store.getFreeCapacity() > 0) {
            creep.getEnergy();
        } else {
            var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if (targets && targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                creep.standBy('builderArea');
            }
        }
    }
};

module.exports = roleBuilder;