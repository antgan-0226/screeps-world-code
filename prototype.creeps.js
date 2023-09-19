var roles = {
    harvester: require('role.harvester'),
    outsideHarvester: require('role.outsideHarvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    lorry: require('role.lorry'),
};

// 将拓展签入 Creep 原型
module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}

// 自定义的 Creep 的拓展
const creepExtension = {
    // 执行角色本职工作
    runRole() {
        this.checkHealth();
        roles[this.memory.role].run(this);
    },
    //待命状态下集合
    standBy(flagName) {
        let flagTarget = Game.flags[flagName]
        this.moveTo(flagTarget)
    },

    // 自我健康检测，如果快挂了则向spawn发送生产替身
    checkHealth() {
        if (this.ticksToLive <= 10) {
            //爬爬一生只能发送一次生成任务
            if (!this.memory.hasSendRebirth) {
                // 向指定 spawn 推送生成任务
                Game.addCreep(this.memory.role)
                this.memory.hasSendRebirth = true
            }
            return false
        }
        return true
    },
    //通用方法：捡垃圾
    getDroppedEnergy() {
        const droppedTargets = this.room.find(FIND_DROPPED_RESOURCES);
        if(droppedTargets && droppedTargets.length > 0) {
            if(this.pickup(droppedTargets[0]) == ERR_NOT_IN_RANGE) {
                this.moveTo(droppedTargets[0]);
                return true
            }
        }
        const tombstonesTargets = this.room.find(FIND_TOMBSTONES);
        if(tombstonesTargets && tombstonesTargets.length > 0) {
            if(this.withdraw(tombstonesTargets[0]) == ERR_NOT_IN_RANGE) {
                this.moveTo(tombstonesTargets[0]);
                return true
            }
        }
        return false
    },

    //通用方法：获取能量
    getEnergy(targetIds, structureTypes) {
        //如果背包已满，直接返回
        if (this.store.getFreeCapacity() == 0) {
            this.say("The store is full");
            return
        }
        //如果有目标获取对象，则优先尝试获取目标能量
        if (targetIds && targetIds.length > 0) {
            let containers = [];
            for (let tid of targetIds) {
                containers.push(Game.getObjectById(tid))
            }

            let maxEnergyContainer = containers[0]
            _.forEach(containers, c => {
                if (maxEnergyContainer.store[RESOURCE_ENERGY] < c.store[RESOURCE_ENERGY]) {
                    maxEnergyContainer = c;
                }
            })
            if (maxEnergyContainer && maxEnergyContainer.store[RESOURCE_ENERGY] > 0) {
                if (this.withdraw(maxEnergyContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(maxEnergyContainer, { visualizePathStyle: { stroke: '#ffffff' } });
                    return
                }
            }
            return
        }
        //如果有目标获取对象的类型，则优先尝试获取目标能量
        if (structureTypes && structureTypes.length > 0) {
            let targetStructure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: s => structureTypes.includes(s.structureType) && s.store[RESOURCE_ENERGY] > 0
            });
            if (targetStructure) {
                if (this.withdraw(targetStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(targetStructure, { visualizePathStyle: { stroke: '#ffffff' } });
                    return
                }
            }
            return
        }

        //否则只能从Storage获取能量
        let storageTarget = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: s => (s.structureType == STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0
        });
        if (this.withdraw(storageTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(storageTarget, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    },
    //放下资源
    putDownEnergy(targetIds, structureTypes) {
        //如果有指定放下的目标，优先尝试
        if (targetIds && targetIds.length > 0) {
            let containers = [];
            for (let tid of targetIds) {
                containers.push(Game.getObjectById(tid))
            }
            let minEnergyContainer = containers[0]
            _.forEach(containers, c => {
                if (minEnergyContainer.energy > c.energy) {
                    minEnergyContainer = c;
                }
            })
            if (minEnergyContainer && minEnergyContainer.store.getFreeCapacity() > 0) {
                if (this.transfer(minEnergyContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(minEnergyContainer, { visualizePathStyle: { stroke: '#ffffff' } });
                    return
                }
            }
            return
        }
        //如果有指定放下的目标类型，优先尝试
        if (structureTypes && structureTypes.length > 0) {
            let targetStructure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => structureTypes.includes(s.structureType) && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            if (targetStructure) {
                if (this.transfer(targetStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(targetStructure, { visualizePathStyle: { stroke: '#ffffff' } });
                    return
                }
            }
            return
        }
        //优先放Spawn和Extension，再放Storage
        let targetStructure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        if (targetStructure) {
            if (this.transfer(targetStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(targetStructure, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            let storageTarget = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE) && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            if (storageTarget) {
                if (this.transfer(storageTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(storageTarget, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
    // 其他更多自定义拓展
}