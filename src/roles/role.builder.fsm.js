/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

run: function(creep) { 
   
  if (!creep.memory.builder) {
	  creep.memory.builder= {
	  full:FALSE,
	  empty:TRUE,
	  constructionSite:FALSE,
	  GATHERING: 0,
	  BUILDING: 1,
	  UPGRADING : 2,
	  fullAndConstructionSite: function() { 
		return this.full && this.constructionSite;
	  },
	  notEmptyAndNoConstructionSite: function() { 
		return !this.empty && !this.constructionSite;
	  },
	  fullAndNoConstructionSite: function() {
	  this.full && !this.constructionSite
	  };
	  }
    }
    if (creep.memory.state==creep.memory.GATHERING && creep.memory.builder.fullAndConstructionSite()){
	creep.memory.state=building;
	}
    else if (creep.memory.state==creep.memory.builder.GATHERING && creep.memory.builder.fullAndNoConstructionSite()){
	creep.memory.state=upgrading;
    }
    else if (creep.memory.state==creep.memory.builder.BUILDING && creep.memory.builder.empty ) {
	creep.memory.state=gathering;
	}
    else if (creep.memory.state==creep.memory.builder.BUILDING && creep.memory.builder.notEmptyAndNoConstructionSite()) {
	creep.memory.state==upgrading;
    }
    else if (creep.memory.state==creep.memory.builder.UPGRADING && creep.memory.builder.empty) {
	creep.memory.state=gathering;
    }
	
	switch(creep.memory.state){
	case creep.memory.builder.GATHERING:  //gathering code
	break;
	case creep.memory.builder.BUILDING:   //Building code
	break;
	case creep.memory.builder.UPGRADING:  //Upgrading code
	break;
	
	}
};
module.exports = roleBuilder;