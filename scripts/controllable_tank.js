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
		wheelCircumference: 2.2,
		weight: 6500,
		rpm: 500,
		speed: 0,
		gear: 0,
		gearbox: {
			gears: 4,
			reverse: -114.5,
			first: 114.5,
			second: 56.3,
			third: 34.5,
			fourth: 22.3
		}
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
		ft17SpriteContainer.style.left = "calc(50vw - "+this.size/2+"px + "+this.position[0]+"px )";
		ft17SpriteContainer.style.bottom = "calc(50vh - "+this.size/2+"px + "+this.position[1]+"px )";
		ft17SpriteContainer.style.transform = "rotate("+this.rotation+"deg)";
		this.position[0] += (this.physics.speed*Math.sin(this.rotation*Math.PI/180))*15*(1/60);
		this.position[1] += (this.physics.speed*Math.cos(this.rotation*Math.PI/180))*15*(1/60);
	},
	updateEngine: function(){		
		switch(this.state){
		case "drive":
			switch(this.physics.gear){
			case -1:
				this.brake(0.4);
				if(this.physics.speed >= 0){
					this.physics.gear = 0;
					this.physics.rpm = 500
				};
				break;
			case 0:
				this.throttle(12);
				if(this.physics.rpm > 550){
					this.physics.gear = 1;
				};
				break;
			case 1:
				this.throttle(10);
				this.drive(this.physics.gearbox.first);
				if(this.physics.rpm > 750){
					this.physics.gear = 2;
					this.physics.rpm = 550;
				};
				break;
			case 2:
				this.throttle(8);
				this.drive(this.physics.gearbox.second);
				if(this.physics.rpm > 750){
					this.physics.gear = 3;
					this.physics.rpm = 550;
				};
				break;
			case 3:
				this.throttle(6);
				this.drive(this.physics.gearbox.third);
				if(this.physics.rpm > 750){
					this.physics.gear = 4;
					this.physics.rpm = 550;
				};
				break;
			case 4:
				this.throttle(4);
				this.drive(this.physics.gearbox.fourth);
				break;
			}
			break;
		case "brake":
			this.physics.gear = 0;
			this.physics.rpm = 500;
			this.brake(0.4);
			break;
		case "reverse":
			if(this.physics.speed > 0 && this.physics.gear != -1){
				this.brake(0.4);
			}else{
				this.physics.gear = -1;
				this.throttle(10);
				this.drive(this.physics.gearbox.reverse);
			};
			break;
		case "rightTurnForward":
			if(this.physics.speed > (1250/this.physics.gearbox.first*this.physics.wheelCircumference)/60){
				this.brake(0.1);
				this.turn(this.physics.speed, 0.5, 1.6);
			}else{
				this.physics.gear = 1;
				this.throttle(10);
				this.turn(this.physics.speed, 1, 1.6);
				this.drive(this.physics.gearbox.first);
			};
			break;
		case "leftTurnForward":
			if(this.physics.speed > (1250/this.physics.gearbox.first*this.physics.wheelCircumference)/60){
				this.brake(0.1);
				this.turn(this.physics.speed, 0.5, -1.6);
			}else{
				this.physics.gear = 1;
				this.throttle(10);
				this.turn(this.physics.speed, 1, -1.6);
				this.drive(this.physics.gearbox.first);
			};
			break;
		case "rightTurnReverse":
			if(this.physics.speed > 0 && this.physics.gear != -1){
				this.brake(0.4);
				this.turn(this.physics.speed, 1, 1.6);
			}else{
				this.physics.gear = -1;
				this.throttle(10);
				this.turn(this.physics.speed, 1, 1.6);
				this.drive(this.physics.gearbox.reverse);
			};
			break;
		case "leftTurnReverse":
			if(this.physics.speed > 0 && this.physics.gear != -1){
				this.brake(0.4);
				this.turn(this.physics.speed, 1, -1.6);
			}else{
				this.physics.gear = -1;
				this.throttle(10);
				this.turn(this.physics.speed, 1, -1.6);
				this.drive(this.physics.gearbox.reverse);
			};
			break;
		case "rotateRight":
			if(this.physics.speed > (1250/this.physics.gearbox.first*this.physics.wheelCircumference)/60){
				this.brake(0.1);
			}else{
				this.physics.gear = 1;
				this.throttle(10);
				this.turn((this.physics.rpm/this.physics.gearbox.first*this.physics.wheelCircumference)/60, 1, 1);
			}
			break;
		case "rotateLeft":
			if(this.physics.speed > (1250/this.physics.gearbox.first*this.physics.wheelCircumference)/60){
				this.brake(0.1);
			}else{
				this.physics.gear = 1;
				this.throttle(10);
				this.turn((this.physics.rpm/this.physics.gearbox.first*this.physics.wheelCircumference)/60, 1, -1);
			}
			break;
		}
	},
	throttle: function(coefficient){
		if(this.physics.rpm<1250) this.physics.rpm += -coefficient/1562500*Math.pow(this.physics.rpm, 2) + coefficient;
	},
	drive: function(gearRatio){
		this.physics.speed = (this.physics.rpm/gearRatio*this.physics.wheelCircumference)/60
	},
	brake: function(coefficient){
		const brakingForce = this.physics.weight*9.81*coefficient;
		if(brakingForce/this.physics.weight/60 > Math.abs(this.physics.speed)){
			this.physics.rpm = 0;
			this.physics.speed = 0;
		}else if(this.physics.speed>0){
			this.physics.speed -= brakingForce/this.physics.weight/60;
		}else{
			this.physics.speed += brakingForce/this.physics.weight/60
		}
	},
	turn: function(speed, speedPerc, turnCircRad){
		const turnCircumference = 2*Math.PI*turnCircRad;
		const distanceTravelled = speed*speedPerc/60;
		const angleRotated = 360/(turnCircumference/distanceTravelled);
		this.rotation += angleRotated;
	}
};

//LOCAL
{
	function updateTank() {
		tank.updateState();
		tank.updatePosition();
		tank.updateEngine();
	};
	tank.spawn();
	setInterval(function () {updateTank()}, 1000/60)
}