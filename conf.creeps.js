// 爬虫配置
module.exports = function () {
    Game.creepConfigs = [ 
        {
            role: 'lorry',
            bodys: [ CARRY, CARRY, MOVE],
            number: 3
        },
        {
            role: 'harvester',
            bodys: [ WORK, WORK, MOVE ],
            number: 5,
        },
        {
            role: 'upgrader',
            bodys: [ WORK, WORK, CARRY, CARRY, MOVE ],
            number: 6
        }, 
        {
            role: 'builder',
            bodys: [ WORK, WORK, CARRY, MOVE ],
            number: 4
        },
        {
            role: 'repairer',
            bodys: [ WORK, WORK, CARRY, MOVE],
            number: 5
        },
        {
            role: 'outsideHarvester',
            bodys: [ WORK, WORK, CARRY, CARRY,MOVE ],
            number: 1,
            opt: {
                outside: true,
                targetRoom: 'W7N24',
                myRoom: 'W8N24',
            }
        }
    ]
}
