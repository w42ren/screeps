var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
   if (!creep.memory.builder) {
	  creep.memory.builder = {
	  full:FALSE,
	  empty:TRUE,
	  constructionSite:FALSE,
	  GATHERING: 0,
	  BUILDING: 1,
	  UPGRADING: 2,
	  fullAndConstructionSite: function() {return this.full && this.constructionSite},
	  notEmptyAndNoConstructionSite: function() {return !this.empty && !this.constructionSite},
	  fullAndNoConstructionSite: function() {return this.full && !this.constructionSite}
	 };
    }
    
    if (creep.memory.state==creep.memory.builder.GATHERING && creep.memory.builder.fullAndConstructionSite()){
	    creep.memory.state=creep.memory.builder.BUILDING;
	}
    else if (creep.memory.state==creep.memory.builder.GATHERING && creep.memory.builder.fullAndNoConstructionSite()){
	    creep.memory.state=creep.memory.builder.UPGRADING;
    }
    else if (creep.memory.state==creep.memory.builder.BUILDING && creep.memory.builder.empty ) {
	    creep.memory.state=creep.memory.builder.GATHERING;
	}
    else if (creep.memory.state==creep.memory.builder.BUILDING && creep.memory.builder.notEmptyAndNoConstructionSite()) {
	    creep.memory.state=creep.memory.builder.UPGRADING;
    }
    else if (creep.memory.state==creep.memory.builder.UPGRADING && creep.memory.builder.empty) {
	    creep.memory.state=creep.memory.builder.GATHERING;
    }
	
	switch(creep.memory.state){
	    case creep.memory.builder.GATHERING:  //gathering    
    	break;
	    case creep.memory.builder.BUILDING:   //Building code
	    break;
	    case creep.memory.builder.UPGRADING:  //Upgrading code
	    break;
    }

    }    
};

module.exports = roleBuilder;