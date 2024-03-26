//GLOBAL
const tank = {
	position: [0, 0],
	rotation: 0,
	leftTrack: 0,
	rightTrack: 0,
	sprite: "./assets/ft17.png",
	size: 108,
	physics: {
		weight: 6500,		//Kilograms
		speed: 0,			//Meters per second
		enginePower: 0,		//Watts
		acceleration: 0,	//Meters per second squared
		optimalSpeed: 1.53	//Meters per second
	},
	spawn: function() {
		const ft17Sprite = document.createElement("div");
		document.querySelector("body").appendChild(ft17Sprite);
		ft17Sprite.outerHTML = '<div id="ft17Container"><img class="ft17" src="./assets/ft17.png"><img class="ft17" src="./assets/ft17_turret.png"></div>'
	},
	updateTracks: function() {
		this.leftTrack = 0;
		this.rightTrack = 0;
		if(keyMemoryMap.get(controlsMapping.leftTrackForwards)) this.leftTrack += 1;
		if(keyMemoryMap.get(controlsMapping.leftTrackReverse)) this.leftTrack -= 1;
		if(keyMemoryMap.get(controlsMapping.rightTrackForwards)) this.rightTrack += 1;
		if(keyMemoryMap.get(controlsMapping.rightTrackReverse)) this.rightTrack -= 1;
	},
	updatePosition: function() {
		const ft17SpriteContainer = document.querySelector("#ft17Container");
		ft17SpriteContainer.style.bottom = "calc(50vh + "+this.size/2+"px + "+this.position[1]+"px )";
		ft17SpriteContainer.style.left = "calc(50vw - "+this.size/2+"px + "+this.position[0]+"px )";
	},
	updateSpeed: function() {
		//Calculate enginePower
		this.physics.enginePower = -7000*Math.pow( (this.physics.speed - 1.5), 2)+30000-(500*Math.pow((this.physics.speed+0.15), 5));
		//Disallow negative enginePower
		if(this.physics.enginePower<0) this.physics.enginePower = 0;
		//Calculate acceleration based on enginePower
		this.physics.acceleration = Math.sqrt( (this.physics.enginePower / (this.physics.weight * 0.015) ) );
		//Calculate speed based on acceleration
		this.physics.speed = this.physics.speed + (this.physics.acceleration * 0.015);
		this.moveForward(this.physics.speed);
	},
	moveForward(speed) {
		const scaledSpeed = speed/1.6;
		this.position[1] += scaledSpeed;
	}
};

//LOCAL
{
	function updateTank() {
		tank.updateTracks();
		tank.updatePosition();
		tank.updateSpeed();
	}

	tank.spawn();
	setInterval(function () {updateTank()}, 15)

	/*	Równania fizyczne
	//Calculate enginePower
		this.physics.enginePower = -7500*Math.pow( (this.physics.speed - 1.5), 2) + 30000 - Math.pow(600, (this.physics.speed-0.5) );
		//Disallow negative enginePower
		if(this.physics.enginePower<0) this.physics.enginePower = 0;
		//Calculate acceleration based on enginePower
		this.physics.acceleration = Math.sqrt( (this.physics.enginePower / (this.physics.weight * 0.015) ) );
		//Calculate speed based on acceleration
		this.physics.speed = this.physics.speed + (this.physics.acceleration * 0.015);s
	*/
}