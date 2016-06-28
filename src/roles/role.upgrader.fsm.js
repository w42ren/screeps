    fsm(creep) {
    var start_state = creep.memory.state;
    var new_state = 0;
   
    switch (start_state) {
    case 0: // Gathering.  When we're at capacity, start moving.
        if(creep.carry.energy == creep.carryCapacity) {
        new_state = 1;
            }
        break;
    case 1: // Distributing energy.  When we hit 0, go back to gathering.
        if (creep.carry.energy == 0) {
        new_state = 0;
        }
        break;
    }
    creep.memory.state = new_state;
    return new_state;
    }
	