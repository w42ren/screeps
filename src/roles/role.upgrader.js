var roleUpgrader = {
 

    run: function(creep) { 

        var start_state = creep.memory.state;
        var new_state=0;
        
        switch (start_state) {
        case 0: // Gathering.  When we're at capacity, start moving.
            if(creep.carry.energy == creep.carryCapacity) {
            var new_state = 1;
                }
            break;
        case 1: // Distributing energy.  When we hit 0, go back to gathering.
            if (creep.carry.energy == 0) {
            var new_state = 0;}
            else { new_state = 1;
                 }
            break;
        };
        
        creep.memory.state = new_state;
        
	    switch (new_state) {
        case 0: // Take resources, either from a container or node
            var sources = creep.room.find(FIND_SOURCES);
        
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
				if(Game.cpu.tickLimit - Game.cpu.getUsed() > 20) {
					creep.moveTo(sources[1]);
					}
				else {				
                    creep.moveTo(sources[1],{reusePath: 10});
			     }
			}
	    break;
	    case 1: // Upgrade the node controller
	           console.log('upgrade Controller ' );
			   
	        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				if(Game.cpu.tickLimit - Game.cpu.getUsed() > 20) {
					creep.moveTo(creep.room.controller);
					}
				else {				
                    creep.moveTo(creep.room.controller,{reusePath: 10});
			     }
	           }
	    break;
        }
		
	}
    
};
module.exports = roleUpgrader;