var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var roleTanker = require('role.tanker');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
        delete Memory.creeps[name]; // deletes the memory for expired creeps
        }
    }
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('harvesters: ' + harvesters.length);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('builders: ' + builders.length);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('upgraders: ' + upgraders.length);
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    console.log('attackers: ' + attackers.length);
        var tankers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tanker');
    console.log('tanker: ' + tankers.length);

	if(harvesters.length < 4) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    if(builders.length < 5) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    if(upgraders.length < 3) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
	if(attackers.length < 1) {
        var newName = Game.spawns.Spawn1.createCreep([TOUGH,TOUGH,ATTACK,WORK,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'attacker'});
        console.log('Spawning new attacker: ' + newName);
	}
	if(tankers.length < 1) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'tanker'});
        console.log('Spawning new tanker: ' + newName);
	}
    /**var tower = Game.getObjectById('id242290');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    } **/

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep); 
        }
		if(creep.memory.role == 'tanker') {
            roleTanker.run(creep); 
        }
	}
}