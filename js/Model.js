"use strict"; // RUN Javascript in strict mode

// Neighbor object
var Neighbor = function(name, desc, location){
	
	// Name of Neighbor
	this.name = name;
	
	// Description of Neighbor
	this.desc = desc;
	
	// Location of Neighbor
	this.location = {
		x: 0,
		y: 0
	};

	// set Name of Neighbor
	this.setName = function(name){
		this.name = name;
	};

	// get Name of Neighbor
	this.getName = function(){
		return this.name;
	};

	// set Description of Neighbor
	this.setDesc = function(desc){
		this.desc = desc;
	};

	// get Description of Neighbor
	this.getDesc = function(){
		return this.desc;
	};

	// set Location(x, y) of Neighbor
	this.setLocation = function(location){
		// set Location if only has object and contains x, y properties
		if(typeof location == "object" && location.x && location.y){
			if(!isNaN(location.x) && !isNaN(location.y)){
				this.location.x = eval(location.x);
				this.location.y = eval(location.y);
			}
		}
	};

	// get Location(x, y) of Neighbor
	this.getLocation = function(){
		return this.location;
	};

	// set Location(x) of Neighbor
	this.setX = function(x){
		this.location.x = x;
	}

	// set Location(y) of Neighbor
	this.setY = function(y){
		this.location.y = y;
	}

	// get Location(x) of Neighbor
	this.getX = function(){
		return this.location.x;
	}

	// get Location(y) of Neighbor
	this.getY = function(){
		return this.location.y;
	}

	/*######################### Constuctor Section #########################*/
	this.setName(name);
	this.setDesc(desc);
	this.setLocation(location);
	/*######################### Constuctor Section #########################*/

	// return object to outside varibale world
	return this;
};
