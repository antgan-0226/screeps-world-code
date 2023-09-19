// 将拓展签入 Spawn 原型
module.exports = function () {
    _.assign(Spawn.prototype, spawnExtension)
}

// 自定义的 Spawn 的拓展
const spawnExtension = {
    // 检查房间内是否符合爬爬配置
    initRoomCreeps() {
        let needInit = false;
        for (conf of Game.creepConfigs) {
            if (!Game.creeps) {
                return
            }
            let creepsInRoomNum = _.sum(Game.creeps, c => c.memory.role == conf.role);
            if (creepsInRoomNum != conf.number) {
                needInit = true;
                break;
            }
        }
        if (needInit) {
           for (conf of Game.creepConfigs) {
                if (!Game.creeps) {
                 return
                }
                let creepsInRoom = _.filter(Game.creeps, c => c.memory.role == conf.role);
                if (conf.number > 0)  {
                    if (!creepsInRoom) {
                        for (let i = 0; i < conf.number; i++) {
                            this.addTask(conf.role);
                        }
                    }
                    if (creepsInRoom && creepsInRoom.length < conf.number) {
                        for (let i = 0; i < conf.number - creepsInRoom.length; i++) {
                           this.addTask(conf.role);
                       }
                    } 
                }
            
            } 
        }
    },
    // 检查生产任务队列
    work() {
        // 自己已经在生成了 / 内存里没有生成队列 / 生产队列为空 就啥都不干
        if (this.spawning || !this.memory.spawnList || this.memory.spawnList.length == 0) return
        // 进行生成
        const spawnSuccess = this.mainSpawn(this.memory.spawnList[0])
        // 生成成功后移除任务
        if (spawnSuccess) this.memory.spawnList.shift()
    },
    // 将生成任务推入队列
    addTask(role) {
        // 任务加入队列
        if (!this.memory.spawnList) {
            this.memory.spawnList = [];
        }
        this.memory.spawnList.push(role)
        return this.memory.spawnList.length
    },
    // 根据任务配置生产
    mainSpawn(role) {
        let conf = _.find(Game.creepConfigs, v => v.role == role)
        if (conf) {
            let creepName = this.generateCreepName(role);
            let respCode = this.spawnCreep(conf.bodys, creepName, { memory: { role: role, opt: conf.opt}  });
            if (respCode == ERR_NAME_EXISTS) {
                console.log("[自动生产Creep] creep重名了, 名字为："+creepName)
                return false
            }
            if (respCode == ERR_BUSY) {
                console.log("[自动生产Creep]母巢 (spawn) 正在孵化另一个creep")
                return false
            }
            if (respCode == ERR_NOT_ENOUGH_ENERGY) {
                console.log("[自动生产Creep]母巢 (spawn) 和它的扩展 (extension) 包含的能量不足以孵化creep")
                return false
            }
            if (respCode == 0) {
                console.log("[自动生产Creep]正在生产爬爬，类型为："+ role +", 名字为："+creepName)
                return true    
            }
            console.log("[自动生产Creep] unknown error: "+ respCode)
            return false
        }
    },

    generateCreepName(role) {
        if (!this.memory.autoNum) this.memory.autoNum = 1
        let creepName = role+"-"+ this.memory.autoNum;
        this.memory.autoNum++
        return creepName
    }
    // 其他更多自定义拓展
}