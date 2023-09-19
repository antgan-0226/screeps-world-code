//游戏内常用API
var initGameApi = require('game');

module.exports.loop = function () {
    //加载游戏配置
    initGameApi()
    Game.initGameConfigs()

    // 清理memory多余Keys
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

     // 防御塔守护
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let tower of towers) {
        tower.defend();
    }


    // 母巢生产队列
    for (let spawnName of Game.spawnsConfig.spawns) {
        Game.spawns[spawnName].work();
    }
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.runRole();
    }
}