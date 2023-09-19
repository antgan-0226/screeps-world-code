//升级者
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            creep.getEnergy();
        } else {
            let respCode = creep.upgradeController(creep.room.controller)
            if(respCode == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleUpgrader;