var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var roleTanker = require('role.tanker');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
        delete Memory.creeps[name]; // deletes the memory for expired creeps
        }
    }
    
    
    if(Game.cpu.getUsed() > Game.cpu.tickLimit / 2) {
    console.log("Used half of CPU already!");
    }
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
     console.log('harvesters: ' + harvesters.length);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
     console.log('builders: ' + builders.length);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    // console.log('upgraders: ' + upgraders.length);
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    // console.log('attackers: ' + attackers.length);
        var tankers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tanker');
    // console.log('tanker: ' + tankers.length);
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
     console.log('repairers: ' + repairers.length);
    
	if(harvesters.length < 5) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
       // console.log('Spawning new harvester: ' + newName);
    }
    if(builders.length < 5) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'builder'});
        // console.log('Spawning new builder: ' + newName);
    }
    if(upgraders.length < 0) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
        // console.log('Spawning new upgrader: ' + newName);
    }
	if(attackers.length < 0) {
        var newName = Game.spawns.Spawn1.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE], undefined, {role: 'attacker'});
        // console.log('Spawning new attacker: ' + newName);
	}
	if(tankers.length < 0) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'tanker'});
        // console.log('Spawning new tanker: ' + newName);
	}
	if(repairers.length < 5) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'repairer'});
        // console.log('Spawning new repairer: ' + newName);
	}
//    var id = Room.find(STRUCTURE_TOWER).id
    
    
    
    
   /** if(tower) {
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
    }**/

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //var towerid = creep.room.find(FIND_STRUCTURES, {
              
        //                filter: (s) => s.structureType == STRUCTURE_TOWER
   // });
           // return (structure.structureType == STRUCTURE_TOWER)
            //}
        // filter: (structure) => {
        //});
        //console.log(towerid);
        var tower = Game.getObjectById('5778e0d06b8406a661b7cddf');
        var tower2 = Game.getObjectById('5782389e3b09ffb64a799927');
        // console.log('tower'+ tower);
        
    if(tower) {
       //var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //filter: (structure) => structure.hits < 0.9*structure.hitsMax
        //});
  
        
        //if (closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        //}

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    var closestHostile2 = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        //console.log(closestHostile);
        if (closestHostile) {
            tower.attack(closestHostile);
            tower2.attack(closestHostile2);
         }
         else if (creep.hits < creep.hitsMax) {
         //console.log(creep);
         tower.heal(creep);
         tower2.heal(creep);
         
        }
    }
 

    
    // var targets = creep.room.find(FIND_STRUCTURES, {
    //    filter: (structure) => {
    //        return (structure.structureType == STRUCTURE_SPAWN ||
    //        structure.structureType == STRUCTURE_CONTAINER ||
	//		structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
    //        }
    //});           
    //for (i = 0; i < targets.length; i++) {
    //        tower.transferEnergy(targets[i], 50)
    //        }
        //console.log('damaged' +closestDamagedStructure);
        //console.log('hostile' +closestHostile);
        //var targetRoomName = "E34S17";    
        //var targetPos = new RoomPosition(22,6, targetRoomName);
        //creep.moveTo(targetPos);
    
   console.log ('cpu limit ' + Game.cpu.tickLimit +' cpu used ' +Game.cpu.getUsed());
    
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            console.log ('cpu limit after harvester ' + Game.cpu.tickLimit +' cpu used ' +Game.cpu.getUsed());
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
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep); 
        }
        
	}
}