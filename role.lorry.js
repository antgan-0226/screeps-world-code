//补充能量者
var roleLorry = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //如果背包有空间，捡垃圾
        if (creep.store.getFreeCapacity() > 0) {
            //优先捡垃圾
            let isOk = creep.getDroppedEnergy()
            if (!isOk) {
                if (creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
                    creep.getEnergy(null, [STRUCTURE_CONTAINER, STRUCTURE_STORAGE])
                } else {
                    creep.getEnergy(null, [STRUCTURE_CONTAINER])
                }
            }
        } else {
            //检查Spawn能量是否满，否则优先补充到Spawn，其次tower，最后storage
            if (creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
                creep.putDownEnergy(null, [STRUCTURE_SPAWN, STRUCTURE_EXTENSION])
            } else {
                var towers = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_TOWER) && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
                if (towers && towers.length > 0) {
                    creep.putDownEnergy(null, [STRUCTURE_TOWER])
                } else {
                    creep.putDownEnergy(null, [STRUCTURE_STORAGE])
                }
            }
        }
    },
};

module.exports = roleLorry;