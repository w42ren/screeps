/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

run: function(creep) { 
    var full =0;
    var empty =1;
    var construct =0;
    var fec=[full,empty,construct];
    var initial_state = creep.memory.state;
    var new_state = 0;

   
    switch (new_state) {
	
	case 0://gathering
	    console.log('gathering ' + creep.memory.state);
		switch (fec)
    	case : [1,0,1] new_state = 1;break;
		case : [1,0,0] new_state = 2;break;
		creep.memory.state = new_state;
		console.log('new state ' + creep.memory.state);
	break;
	case 1://building
		switch (fec)
		console.log('building ' +  creep.memory.state);
		case: [1,1,1] new_state = 0;break;
		case: [0,0,0] new_state = 2;break;
		creep.memory.state = new_state;
	    console.log('new state ' + creep.memory.state);
	break;
	case 2://upgrading
	    console.log('upgrading ' +  creep.memory.state);
	    switch(fec)
		//if  
		case : [0,1,0] new_state = 0;break;
		creep.memory.state = new_state;
		console.log('new_state ' +  creep.memory.state);
	break;
	}

};
module.exports = roleBuilder;