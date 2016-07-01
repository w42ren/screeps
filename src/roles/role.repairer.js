var roleRepairer = {
run: function(creep) { 
   
  if (typeof(creep.memory.state) == 'undefined') {
      creep.memory.state = 0;
  }
  if (!creep.memory.repairer) {
	  creep.memory.repairer= {
	    full:false,
	    empty:true,
	    constructionSite:false,
	    GATHERING: 0,
	    BUILDING: 1,
	    REPAIRING : 2
	    };
	  }
  	

    if (creep.memory.state==creep.memory.repairer.GATHERING &&  creep.memory.repairer.full && creep.memory.repairer.constructionSite) {
        creep.memory.state=creep.memory.repairer.BUILDING;
    }
    else if (creep.memory.state==creep.memory.repairer.GATHERING &&  creep.memory.repairer.full && !creep.memory.repairer.constructionSite){
 	         creep.memory.state=creep.memory.repairer.REPAIRING;
    }
    else if ((creep.memory.state==creep.memory.repairer.BUILDING ||creep.memory.state==creep.memory.repairer.REPAIRING) && creep.memory.repairer.empty ) {
	         creep.memory.state=creep.memory.repairer.GATHERING;
	}
    else if (creep.memory.state==creep.memory.repairer.BUILDING &&  !creep.memory.repairer.empty && !creep.memory.repairer.constructionSite){
	         creep.memory.state=creep.memory.repairer.REPAIRING;
    }
    

    var sources = creep.room.find(FIND_SOURCES);
    var closestSource = creep.pos.findClosestByPath(sources);
    
	var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if (targets.length) {
	    creep.memory.repairer.constructionSite=true;
	}
	var repairs = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.hits < object.hitsMax
    });
    
    repairs.sort((a,b) => a.hits - b.hits);

	
	if (creep.carry.energy > 0) {
	   creep.memory.repairer.empty=false;
	}
	    else{ 
	        creep.memory.repairer.empty=true;
	        }
	if (creep.carry.energy == creep.carryCapacity){
	    creep.memory.repairer.full=true;
	}      
	    else { 
	        creep.memory.repairer.full=false;
	         }
	  
	
	switch(creep.memory.state){
	case creep.memory.repairer.GATHERING:
	   // console.log('Gathering')
	   	    if(creep.carry.energy < creep.carryCapacity) {
                
                if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestSource);
                }
	   	    }
	break;
	case creep.memory.repairer.BUILDING: 
	   // console.log('Building')
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
	break;
	case creep.memory.repairer.REPAIRING: 
	   // console.log('REPAIRING')//REPAIRING code
            
             if(creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(repairs[0]);    
                } 
			
	break;
	}
    }
};
module.exports = roleRepairer;