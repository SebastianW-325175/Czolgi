//GLOBAL
const tank = {
	position: [0, 0],
	rotation: 0,
	leftTrack: 0,
	rightTrack: 0,
	clutchEngaged: false,
	sprite: "./assets/ft17.png",
	size: 108,
	physics: {
		sprocketRadius: 0.335,	//Meters
		weight: 6500,			//Kilograms
		rpm: 0,
		gearRatio: 114.5,
		enginePower: 0,			//Watts
		engineTorque: 0,		//Newton meters
		acceleration: 0,		//Meters per second squared
		speed: 0,				//Meters per second
		maxSpeed : 0,			//Meters per second
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
		if(this.leftTrack == 0 && this.rightTrack == 0) this.clutchEngaged = false;
		else this.clutchEngaged = true;
	},
	updatePosition: function() {
		const ft17SpriteContainer = document.querySelector("#ft17Container");
		ft17SpriteContainer.style.bottom = "calc(50vh + "+this.size/2+"px + "+this.position[1]+"px )";
		ft17SpriteContainer.style.left = "calc(50vw - "+this.size/2+"px + "+this.position[0]+"px )";
	},
	updateEngine: function(){
		if(this.clutchEngaged == true){
			if(this.physics.rpm == 0) this.physics.rpm = 1000;
			if(this.physics.rpm<4500) this.physics.rpm += 4;
			this.physics.enginePower = 29000 - (Math.pow(this.physics.rpm-1550, 2))/300;
			this.physics.gearRatio = (this.physics.rpm/38)*(-1) + 140.84;
			this.physics.engineTorque = this.physics.enginePower/this.physics.rpm;
			this.physics.maxSpeed = ((this.physics.rpm/60)/this.physics.gearRatio)*(2*Math.PI*this.physics.sprocketRadius);
		}else{
			this.physics.rpm = 0;
			this.physics.enginePower = 0;
			this.physics.gearRatio = 114.5;
			this.physics.engineTorque = 0;
			this.physics.maxSpeed = 0;
		}
	},
	updateSpeed: function() {		
		let tractionForce = (this.physics.engineTorque*this.physics.gearRatio)/this.physics.sprocketRadius;
		let brakingForce = this.physics.weight * 9.81 * 0.4;

		if(this.clutchEngaged == true) this.physics.acceleration = tractionForce/this.physics.weight;
		else if(this.clutchEngaged == false && Math.abs((tractionForce-brakingForce))/this.physics.weight*(1/60)>this.physics.speed){
			this.physics.acceleration = 0;
			this.physics.speed = 0;
		}
		else this.physics.acceleration = (tractionForce-brakingForce)/this.physics.weight;

		this.physics.speed += this.physics.acceleration*(1/60);
		if(this.clutchEngaged == true && this.physics.speed>this.physics.maxSpeed) this.physics.speed = this.physics.maxSpeed;
		this.moveForward(this.physics.speed);
	},
	moveForward(speed) {
		this.position[1] += this.physics.speed*15*(1/60);
	}
};

//LOCAL
{
	function updateTank() {
		tank.updateTracks();
		tank.updateEngine();
		tank.updatePosition();
		tank.updateSpeed();
	};
	tank.spawn();
	setInterval(function () {updateTank()}, 1000/60)
}