var roleBuilder = {
run: function(creep) { 
   
  if (typeof(creep.memory.state) == 'undefined') {
      creep.memory.state = 0;
  }
  if (!creep.memory.builder) {
	  creep.memory.builder= {
	    full:false,
	    empty:true,
	    constructionSite:false,
	    GATHERING: 0,
	    BUILDING: 1,
	    UPGRADING : 2
	    };
	  }
  	

    if (creep.memory.state==creep.memory.builder.GATHERING &&  creep.memory.builder.full && creep.memory.builder.constructionSite) {
        creep.memory.state=creep.memory.builder.BUILDING;
    }
    else if (creep.memory.state==creep.memory.builder.GATHERING &&  creep.memory.builder.full && !creep.memory.builder.constructionSite){
 	         creep.memory.state=creep.memory.builder.UPGRADING;
    }
    else if ((creep.memory.state==creep.memory.builder.BUILDING ||creep.memory.state==creep.memory.builder.UPGRADING) && creep.memory.builder.empty ) {
	         creep.memory.state=creep.memory.builder.GATHERING;
	}
    else if (creep.memory.state==creep.memory.builder.BUILDING &&  !creep.memory.builder.empty && !creep.memory.builder.constructionSite){
	         creep.memory.state=creep.memory.builder.UPGRADING;
    }

    
    
	var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	if (targets.length) {
	    creep.memory.builder.constructionSite=true;
	    }
	else { 
	    creep.memory.builder.constructionSite=false;
	}
	if (creep.carry.energy > 0) {
	   creep.memory.builder.empty=false;
	}
	    else{ 
	        creep.memory.builder.empty=true;
	        }
	if (creep.carry.energy == creep.carryCapacity){
	    creep.memory.builder.full=true;
	}      
	    else { 
	        creep.memory.builder.full=false;
	         }
	  
	
	switch(creep.memory.state){
	case creep.memory.builder.GATHERING:
	    var sources = creep.room.find(FIND_SOURCES);
	    var closestSource = creep.pos.findClosestByPath(sources);
	    console.log('Gathering')
	   	    if(creep.carry.energy < creep.carryCapacity) {
                
                if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                    if(Game.cpu.tickLimit / Game.cpu.getUsed() > 50) {
					creep.moveTo(closestSource);
					}
				else {				
                    creep.moveTo(closestSource,{reusePath: 10});
			     }
                  //creep.moveTo(closestSource);
                }
	   	    }
	break;
	case creep.memory.builder.BUILDING: 
	    console.log('Building')
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    if(Game.cpu.tickLimit / Game.cpu.getUsed() > 50) {
					creep.moveTo(targets[0]);
					}
				else {				
                    creep.moveTo(targets[0],{reusePath: 10});
			     }
                    //creep.moveTo(targets[0]);
                }
	break;
	case creep.memory.builder.UPGRADING: 
	     console.log('Upgrading')//Upgrading code
	      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                    if(Game.cpu.tickLimit / Game.cpu.getUsed() > 50) {
					creep.moveTo(creep.room.controller);
					}
				else {				
                    creep.moveTo(creep.room.controller,{reusePath: 10});
			     }
               // creep.moveTo(creep.room.controller);
                }   
	break;
	}
    }
};
module.exports = roleBuilder;