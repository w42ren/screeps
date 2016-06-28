/** @param {Creep} creep **/
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
        
         console.log('new state ' + creep.memory.state);
	    switch (new_state) {
        case 0: // Take resources, either from a container or node
            var sources = creep.room.find(FIND_SOURCES);
            console.log('find sources ' );
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
	    break;
	    case 1: // Upgrade the node controller
	           console.log('upgrade Controller ' );
	           if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
	           }
	    break;
        }
		
	}
    
};
module.exports = roleUpgrader;