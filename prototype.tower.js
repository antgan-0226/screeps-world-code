const { filter } = require("lodash");

// 将拓展签入 Tower 原型
module.exports = function () {
    _.assign(StructureTower.prototype, towerExtension)
}

// 自定义的 Tower 的拓展
const towerExtension = {
    defend() {
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            this.attack(target);
        } else {
            var structureTargets = this.room.find(FIND_MY_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });
            if (structureTargets && structureTargets.length > 0) {
                let respCode = this.repair(structureTargets[0])
                console.log(respCode)
            }
        }
    }
    // 其他更多自定义拓展
}