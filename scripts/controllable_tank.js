//GLOBAL
const tank = {
	position: [0, 0],
	rotation: 0,
	leftTrack: 0,
	rightTrack: 0,
	state: "brake",
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
	spawn: function(){
		const ft17Sprite = document.createElement("div");
		document.querySelector("body").appendChild(ft17Sprite);
		ft17Sprite.outerHTML = '<div id="ft17Container"><img class="ft17" src="./assets/ft17.png"><img class="ft17" src="./assets/ft17_turret.png"></div>'
	},
	updateState: function(){
		this.leftTrack = 0;
		this.rightTrack = 0;
		if(keyMemoryMap.get(controlsMapping.leftTrackForwards)) this.leftTrack += 1;
		if(keyMemoryMap.get(controlsMapping.leftTrackReverse)) this.leftTrack -= 1;
		if(keyMemoryMap.get(controlsMapping.rightTrackForwards)) this.rightTrack += 1;
		if(keyMemoryMap.get(controlsMapping.rightTrackReverse)) this.rightTrack -= 1;

		if(this.leftTrack == 1 && this.rightTrack == 1) this.state = "drive";
		if(this.leftTrack == 0 && this.rightTrack == 0) this.state = "brake";
		if(this.leftTrack == -1 && this.rightTrack == -1) this.state = "reverse";
		if(this.leftTrack == 1 && this.rightTrack == 0) this.state = "rightTurnForward";
		if(this.leftTrack == 0 && this.rightTrack == 1) this.state = "leftTurnForward";
		if(this.leftTrack == -1 && this.rightTrack == 0) this.state = "rightTurnReverse";
		if(this.leftTrack == 0 && this.rightTrack == -1) this.state = "leftTurnReverse";
		if(this.leftTrack == 1 && this.rightTrack == -1) this.state = "rotateRight";
		if(this.leftTrack == -1 && this.rightTrack == 1) this.state = "rotateLeft";
	},
	updatePosition: function(){
		const ft17SpriteContainer = document.querySelector("#ft17Container");
		this.position[0] += (this.physics.speed*Math.sin(this.rotation*Math.PI/180))*15*(1/60);
		this.position[1] += (this.physics.speed*Math.cos(this.rotation*Math.PI/180))*15*(1/60);
		ft17SpriteContainer.style.left = "calc(50vw - "+this.size/2+"px + "+this.position[0]+"px )";
		ft17SpriteContainer.style.bottom = "calc(50vh - "+this.size/2+"px + "+this.position[1]+"px )";
		ft17SpriteContainer.style.transform = "rotate("+this.rotation+"deg)";
	},
	updateEngine: function(){
		if(this.state != "brake"){
			if(this.physics.rpm == 0) this.physics.rpm = 1000;
			if(this.physics.rpm<2000) this.physics.rpm += -4/1000000*Math.pow(this.physics.rpm, 2) + 8/1000*this.physics.rpm;
			//if(this.leftTrack != this.rightTrack && this.physics.rpm>1300) this.physics.rpm = 1300;
			this.physics.enginePower = -(1/12.4)*(Math.pow(this.physics.rpm-1400, 2))+29000;
			if(this.physics.enginePower<0) this.physics.enginePower = 0;
			this.physics.gearRatio = (this.physics.rpm/21.7)*(-1) + 114.5;
			this.physics.engineTorque = this.physics.enginePower/this.physics.rpm;
		}else{
			this.physics.rpm = 0;
			this.physics.enginePower = 0;
			this.physics.gearRatio = 114.5;
			this.physics.engineTorque = 0;
			this.physics.maxSpeed = 0;
		}
	},
	moveTank: function(){		
		switch(this.state){
		case "drive":
			this.drive(1);
			break;
		case "brake":
			this.brake(0.75);
			break;
		case "reverse":
			break;
		case "rightTurnForward":
			this.turn(1, 1.4);
			this.drive();
			break;
		case "leftTurnForward":
			this.turn(1, -1.4);
			this.drive();
			break;
		case "rightTurnReverse":
			this.turn(1, -1.4);
			break;
		case "leftTurnReverse":
			this.turn(1, 1.4);
			break;
		case "rotateRight":
			this.drive();
			this.turn(1, 0.2);
			break;
		case "rotateLeft":
			this.drive();
			this.turn(1, -0.2);
			break;
		}
	},
	drive: function(multiplier){
		let tractionForce = (this.physics.engineTorque*this.physics.gearRatio)/this.physics.sprocketRadius;
		this.physics.acceleration = tractionForce/this.physics.weight;
		this.physics.speed += this.physics.acceleration*(1/60);
	},
	brake: function(frictionCoef){
		let brakingForce = this.physics.weight*9.81*frictionCoef;

		this.physics.speed -= (brakingForce/this.physics.weight)*(1/60);
		if(this.physics.speed<0){
			this.physics.speed = 0;
			this.physics.acceleration = 0;
		};
	},
	turn: function(speedPerc, turnCircRad){
		this.physics.gearRatio = 22.3
		circleCircumference = 2*Math.PI*turnCircRad;
		lapTime = circleCircumference/this.physics.speed;
		angleRotated = 360*(1/60)/lapTime;
		this.rotation += angleRotated;
	}
};

//LOCAL
{
	function updateTank() {
		tank.updateState();
		tank.updateEngine();
		tank.updatePosition();
		tank.moveTank();
	};
	tank.spawn();
	setInterval(function () {updateTank()}, 1000/60)
}