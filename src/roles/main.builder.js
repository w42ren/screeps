var roleBuilder = require('role.builder');

module.exports.loop = function () {
    

var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

console.log('builders: ' + builders.length);
    if(builders.length < 1) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];      
            if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            }
        }
    }    
}

