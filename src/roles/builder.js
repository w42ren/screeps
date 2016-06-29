var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
   if (!creep.memory.builder) {
	  creep.memory.builder = {
	  full:false,
	  empty:true,
	  constructionSite:false,
	  GATHERING: 0,
	  BUILDING: 1,
	  UPGRADING: 2
	  // fullAndConstructionSite: function() {return this.full && this.constructionSite},
	  // notEmptyAndNoConstructionSite: function() {return !this.empty && !this.constructionSite},
	  // fullAndNoConstructionSite: function() {return this.full && !this.constructionSite}
	 };
    }
    creep.memory.state=creep.memory.builder.GATHERING;
    
    if (creep.memory.state==creep.memory.builder.GATHERING && creep.memory.builder.full && creep.memory.builder.constructionSite){
	    creep.memory.state=creep.memory.builder.BUILDING;
	}
    else if (creep.memory.state==creep.memory.builder.GATHERING && creep.memory.builder.full && !creep.memory.builder.constructionSite){
	    creep.memory.state=creep.memory.builder.UPGRADING;
    }
    else if (creep.memory.state==creep.memory.builder.BUILDING && creep.memory.builder.empty) {
	    creep.memory.state=creep.memory.builder.GATHERING;
	}
    else if (creep.memory.state==creep.memory.builder.BUILDING && !creep.memory.builder.empty && !creep.memory.builder.constructionSite) {
	    creep.memory.state=creep.memory.builder.UPGRADING;
    }
    else if (creep.memory.state==creep.memory.builder.UPGRADING && creep.memory.builder.empty) {
	    creep.memory.state=creep.memory.builder.GATHERING;
    }
	
	switch(creep.memory.state){
	    case creep.memory.builder.GATHERING:  //gathering  
	    	if(creep.carry.energy < creep.carryCapacity) {
	    	    creep.memory.builder.full=false;
	    	}
	    	if (creep.carry.energy = 0){
	    	    creep.memory.builder.empty=true;
	    	}
            var sources = creep.room.find(FIND_SOURCES);
            console.log('find sources ' );
                
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				
				if(Game.cpu.tickLimit - Game.cpu.getUsed() > 20) {
					creep.moveTo(sources[0]);
				}
				else {				
                    creep.moveTo(sources[0],{reusePath: 10});
			    }
	        }
    	break;
	    case creep.memory.builder.BUILDING:   //Building code
	         var targets=creep.room.find(FIND_CONSTRUCTION_SITES);
	         if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
	         creep.moveTo(targets[0]);
	         }
	         else {
	             if (creep.carry.energy < creep.carryCapacity) {
	                 creep.memory.builder.full=false;
	             }
	             if (creep.carry.energy=0){
	             creep.memory.builder.empty=true;
	             }
     	     }
	        console.log('building');
	    break;
	    case creep.memory.builder.UPGRADING:  //Upgrading code
	        
           	    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	             
				    if (creep.carry.energy < creep.carryCapacity) {
	                 creep.memory.builder.full=false;
	                }
	                if (creep.carry.energy=0){
	                 creep.memory.builder.empty=true;
	                }          	 
          	 
				    if(Game.cpu.tickLimit - Game.cpu.getUsed() > 20) {
					    creep.moveTo(creep.room.controller);
					}
				    else {				
                        creep.moveTo(creep.room.controller,{reusePath: 10});
			        }
	            }
	        console.log('upgrading');
	    break;
        
    
    console.log ('state '+ creep.memory.state);
    console.log ('full '+ creep.memory.builder.full);
    console.log ('empty '+ creep.memory.builder.empty);
    console.log ('constructionSite ' + creep.memory.builder.constructionSite);
 //   console.log ('func1 ' + creep.memory.builder.fullAndConstructionSite());
    }
        
};

module.exports = roleBuilder;