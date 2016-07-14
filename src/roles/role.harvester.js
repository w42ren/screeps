var roleHarvester = {
run: function(creep) { 
   
  if (typeof(creep.memory.state) == 'undefined') {
      creep.memory.state = 0;
  }
  if (!creep.memory.harvester) {
	  creep.memory.harvester= {
	   
        sourceId: 0,
        full:false,
	    empty:true,
	    fullSpawn:false,
	    GATHERING: 0,
	    FILLING: 1,
	    MINING: 2
	    };
	  }
  	

    if (creep.memory.state==creep.memory.harvester.GATHERING &&  creep.memory.harvester.full && !creep.memory.harvester.fullSpawn) {
        creep.memory.state=creep.memory.harvester.FILLING;
    }
    else if (creep.memory.state==creep.memory.harvester.GATHERING &&  creep.memory.harvester.full && creep.memory.harvester.fullSpawn){
 	         creep.memory.state=creep.memory.harvester.MINING;
    }
    else if ((creep.memory.state==creep.memory.harvester.FILLING ||creep.memory.state==creep.memory.harvester.MINING) && creep.memory.harvester.empty ) {
	         creep.memory.state=creep.memory.harvester.GATHERING;
	}
    else if (creep.memory.state==creep.memory.harvester.FILLING &&  !creep.memory.harvester.empty && creep.memory.harvester.fullSpawn){
	         creep.memory.state=creep.memory.harvester.MINING;
    }
    else if (creep.memory.state==creep.memory.harvester.MINING &&  !creep.memory.harvester.empty && !creep.memory.harvester.fullSpawn){
	         creep.memory.state=creep.memory.harvester.FILLING;
    }   


    

	



	if (creep.carry.energy > 0) {
	   creep.memory.harvester.empty=false;
	}
	    else{ 
	        creep.memory.harvester.empty=true;
	        }
	if (creep.carry.energy == creep.carryCapacity){
	    creep.memory.harvester.full=true;
	}      
	    else { 
	        creep.memory.harvester.full=false;
	         }
	  
	
	switch(creep.memory.state){
	case creep.memory.harvester.GATHERING:
	   console.log('HARVESTING');
   	/**var dropped = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
    console.log ('dropped'+ dropped);
    if(dropped) {
        if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
            creep.moveTo(dropped);
        }
    }
    **/
    var sources = creep.room.find(FIND_SOURCES);
    var closestSource = creep.pos.findClosestByPath(sources);
	   	    if(creep.carry.energy < creep.carryCapacity) {
                
                if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                    if(Game.cpu.tickLimit / Game.cpu.getUsed() > 50) {
					creep.moveTo(closestSource);
					}
				else {				
                    creep.moveTo(closestSource,{reusePath: 10});
			     }
                }
	   	    }

   	    
	break;
	case creep.memory.harvester.FILLING: 
	console.log('FILLING')
	
	var emptyTowers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
	});
        if (emptyTowers.length > 0){         
             for (i = 0; i < emptyTowers.length; i++) {
                if(creep.transfer(emptyTowers[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   if(Game.cpu.tickLimit / Game.cpu.getUsed() > 50) {
				    	creep.moveTo(emptyTowers[i]);
					   }
				       else {				
                       creep.moveTo(emptyTowers[i],{reusePath: 10});
			           }
                }
            }
        }    
        else {    
	var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_SPAWN ||
			//structure.structureType == STRUCTURE_CONTAINER ||
			structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
            }
	 });
                    for (i = 0; i < targets.length; i++) {
                if(creep.transfer(targets[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					   if(Game.cpu.tickLimit / Game.cpu.getUsed() > 50) {
				    	creep.moveTo(targets[i]);
					   }
				       else {				
                       creep.moveTo(targets[i],{reusePath: 10});
			           }
                }
            }
        }    
	break;
	case creep.memory.harvester.MINING: 
	   // console.log('MINING')//MINING code
	   	var ext = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER ||
            structure.structureType == STRUCTURE_SPAWN ||
			//structure.structureType == STRUCTURE_CONTAINER ||
			structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
            }
	    
	});

                    for (j = 0; j < ext.length; j++) {
                if(creep.transfer(ext[j], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(ext[j]);
				}   
            }
	break;
	}
    }
};
module.exports = roleHarvester;