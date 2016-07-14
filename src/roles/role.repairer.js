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
    


    
    
    
	var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if (targets.length) {
	    creep.memory.repairer.constructionSite=true;
	}
	else (
	    creep.memory.repairer.constructionSite=false
	)
	

	
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
	console.log('GATHERING')
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
	case creep.memory.repairer.BUILDING: 
	 console.log('BUILDING')
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    if(Game.cpu.tickLimit / Game.cpu.getUsed() > 15) {
					creep.moveTo(targets[0]);
					}
				    else {				
                    creep.moveTo(targets[0],{reusePath: 10});
			     }
                }
                
	break;
	case creep.memory.repairer.REPAIRING: 
	   console.log('REPAIRING');//REPAIRING 
	   console.log('cpu limit after repairer' + Game.cpu.tickLimit +' cpu used ' +Game.cpu.getUsed());
	  // repairs = creep.room.find(FIND_STRUCTURES, {
	  //     		filter: (s) => s.structureType == STRUCTURE_WALL
	  //   });
	for (let percent =0.1; percent <=0.7; percent = percent + 0.1){
		    closestRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {       
                filter: (s) => s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax * percent   ||
                s.structureType == STRUCTURE_WALL &&  s.hits < s.hitsMax * percent *0.001  ||
                s.structureType == STRUCTURE_RAMPART && s.hits  < s.hitsMax * percent*0.1  
        });
	//}
    if (creep.carry.energy > 0) {
             console.log('repair target '+ closestRepair);
             if(creep.repair(closestRepair) == ERR_NOT_IN_RANGE) {
                  if(Game.cpu.tickLimit / Game.cpu.getUsed() > 50) {
					creep.moveTo(closestRepair);
					}
				else {				
                    creep.moveTo(closestRepair,{reusePath: 10});
			     }
                }
    }
        
    }
    //var len = repairs.length;
    //var less = Math.round(len/3);
    //repairs.length = less;
    

    //repairs.sort((a,b) => parseFloat(a.hits) - parseFloat(b.hits)/**=> a.hits - b.hits**/);
    /** for (creep.memory.repairer.i=0;creep.memory.repairer.i < 16;creep.memory.repairer.i++) { 
         console.log(repairs[creep.memory.repairer.i].hits);
         console.log(repairs[creep.memory.repairer.i].hitsMax)
        if (repairs[creep.memory.repairer.i].hits < repairs[creep.memory.repairer.i].hitsMax && repairs[creep.memory.repairer.i].structureType == 'rampart'){
             creep.memory.repairer.closestRepair = repairs[creep.memory.repairer.i];
              console.log ('repair rampart' + creep.memory.repairer.closestRepair) 
              // if(creep.repair(creep.memory.repairer.closestRepair) == ERR_NOT_IN_RANGE) {
                //  creep.moveTo(creep.memory.repairer.closestRepair);    
                //}
        }    
        else if (repairs[creep.memory.repairer.i].hits < 0.9*(repairs[creep.memory.repairer.i].hitsMax) && repairs[creep.memory.repairer.i].structureType == 'road'){
             creep.memory.repairer.closestRepair = repairs[creep.memory.repairer.i];
             console.log ('repair road' + creep.memory.repairer.closestRepair)
              //if(creep.repair(creep.memory.repairer.closestRepair) == ERR_NOT_IN_RANGE) {
                //  creep.moveTo(creep.memory.repairer.closestRepair);    
                //}
        } 
        else if (repairs[creep.memory.repairer.i].hits < 22000 && repairs[creep.memory.repairer.i].structureType == 'constructedWall'){
             creep.memory.repairer.closestRepair = repairs[creep.memory.repairer.i];
             console.log ('repair wall' + creep.memory.repairer.closestRepair)
        
             //if(creep.repair(creep.memory.repairer.closestRepair) == ERR_NOT_IN_RANGE) {
               //   creep.moveTo(creep.memory.repairer.closestRepair);    
                //}
        }
          
        else {
             creep.memory.repairer.closestRepair = creep.pos.findClosestByPath(repairs);
              console.log ('closest repair' + creep.memory.repairer.closestRepair) 
               //if(creep.repair(creep.memory.repairer.closestRepair) == ERR_NOT_IN_RANGE) {
                 // creep.moveTo(creep.memory.repairer.closestRepair);    
                //}
        }
                    if (creep.carry.energy > 0) {
             
             if(creep.repair(creep.memory.repairer.closestRepair) == ERR_NOT_IN_RANGE) {
                  if(Game.cpu.tickLimit - Game.cpu.getUsed() > 15) {
					creep.moveTo(creep.memory.repairer.closestRepair);
					}
				else {				
                    creep.moveTo(creep.memory.repairer.closestRepair,{reusePath: 10});
			     }
                }
                 
            }
     }**/
         

	break;
	}
    }
};
module.exports = roleRepairer;