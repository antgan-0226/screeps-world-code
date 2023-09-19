// 将拓展签入 Tower 原型
module.exports = function () {
    _.assign(StructureTower.prototype, towerExtension)
}

// 自定义的 Tower 的拓展
const towerExtension = {
    defend() {
        // find closes hostile creep
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // if one is found...
        if (target != undefined) {
            // ...FIRE!
            this.attack(target);
        }
    }
    // 其他更多自定义拓展
}