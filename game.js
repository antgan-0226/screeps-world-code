//配置
var initCreepsConfigs = require('conf.creeps');
var initSpawnsConfigs = require('conf.spawns');
//原型拓展
var prototypeCreeps = require('prototype.creeps');
var prototypeSpawn = require('prototype.spawn');
var prototypeTower = require('prototype.tower');

module.exports = function () {
    //初始化游戏配置
    Game.initGameConfigs = function () {
        //加载配置
        initCreepsConfigs()
        initSpawnsConfigs()

        //加载原型拓展
        prototypeCreeps()
        prototypeSpawn()
        prototypeTower()
    }

    //快捷添加生产任务
    Game.addCreep = function (role) {
        Game.spawns["Spawn1"].addTask(role);
    }

    //快速初始化所有Creeps
    Game.initAllCreeps = function () {
        Game.spawns["Spawn1"].initRoomCreeps();
    }

    //移动某个Creep到指定为止
    Game.moveCreep = function (creepName, x, y) {
        Game.creeps[creepName].moveTo(x, y)
    }

    //展示目前所有能量
    Game.showData = function () {
        console.log("你的GPL为：" + JSON.stringify(Game.gpl) + "\n"
            + "你的GCL为：" + JSON.stringify(Game.gcl) + "\n"
            + "你的GCL为：" + JSON.stringify(Game.gcl) + "\n"
            + "=========================\n"
        )
    }


}

