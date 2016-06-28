var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
         if (creep.room.find(FIND_HOSTILE_CREEPS)==ERR_NOT_IN_RANGE){
        	    creep.memory.attacking = true;
            }
            else {
                creep.memory.attacking = false;
            }
        if(creep.memory.attacking) {
               var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
                console.log('Enemies: ' + enemies );
            if (creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) { 
                    creep.moveTo(enemies[0]);
                    console.log('move to Enemies: ' );
            }
        }    
       
	    if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            console.log('find sources ' );
            if(creep.harvest(sources[0])) {
                    creep.moveTo(sources[0]);
                    console.log('move to sources ' );
            }
                
        else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                }
            }
	   }
    
	}
	
};

module.exports = roleAttacker;
