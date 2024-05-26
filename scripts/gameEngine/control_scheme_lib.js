const controlSchemeLibrary = {
	humanCharacter: function(){
		const movementVector = [0, 0];
		let movementAngle = undefined;
		let displacementX = undefined;
		let displacementY = undefined;
		if(keyMemoryMap.get(controlsMapping.goRight)) movementVector[0] += 1;
		if(keyMemoryMap.get(controlsMapping.goLeft)) movementVector[0] -= 1;
		if(keyMemoryMap.get(controlsMapping.goBackwards)) movementVector[1] += 1;
		if(keyMemoryMap.get(controlsMapping.goForwards)) movementVector[1] -= 1;
		movementAngle = Math.atan(movementVector[1]/movementVector[0]);
		displacementX = Math.cos(movementAngle)*0.42;
		displacementY = Math.sin(movementAngle)*0.42;
		if(displacementX || displacementY) {
			this.sprite.getAnimation("walk").playAnimation();
			this.rotation = (movementAngle/(Math.PI/180))+90;
		}
		else this.sprite.getAnimation("walk").stopAnimation();
		if(movementVector[0] == -1){
			 displacementX *= -1;
			 displacementY *= -1;
			 this.rotation += 180;
		};
		if(displacementX) this.position[0] += displacementX;
		if(displacementY) this.position[1] += displacementY;
		if(this.testCollision()){
			if(displacementX) this.position[0] -= displacementX;
			if(displacementY) this.position[1] -= displacementY;
		}
	},
	tankCharacter: {
		updateState(){
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
		updatePosition(){
			const horizontalSpeed = (this.speed*Math.sin(this.parentObject.rotation*Math.PI/180))*15*(1/60);
			const verticalSpeed = (this.speed*Math.cos(this.parentObject.rotation*Math.PI/180))*15*(1/60);
			this.parentObject.position[0] += horizontalSpeed;
			this.parentObject.position[1] -= verticalSpeed;
			if(this.parentObject.testCollision()){
				this.parentObject.position[0] -= horizontalSpeed;
				this.parentObject.position[1] += verticalSpeed;
			}else{
				this.parentObject.attachedObjects.forEach(function(object){
					object.position[0] += horizontalSpeed;
					object.position[1] -= verticalSpeed;
				})
			}
		},
		updateEngine(){
			switch(this.state){
			case "drive":
				switch(this.gear){
				case -1:
					this.brake(0.4);
					if(this.speed >= 0){
						this.gear = 0;
						this.rpm = 500
					};
					break;
				case 0:
					this.throttle(12);
					if(this.rpm > 550){
						this.gear = 1;
					};
					break;
				case 1:
					this.throttle(10);
					this.drive(114.5);
					if(this.rpm > 750){
						this.gear = 2;
						this.rpm = 550;
					};
					break;
				case 2:
					this.throttle(8);
					this.drive(56.3);
					if(this.rpm > 750){
						this.gear = 3;
						this.rpm = 550;
					};
					break;
				case 3:
					this.throttle(6);
					this.drive(34.5);
					if(this.rpm > 750){
						this.gear = 4;
						this.rpm = 550;
					};
					break;
				case 4:
					this.throttle(4);
					this.drive(22.3);
					break;
				};
				break;
			case "brake":
				this.gear = 0;
				this.rpm = 500;
				this.brake(0.4);
				break;
			case "reverse":
				if(this.speed > 0 && this.gear != -1){
					this.brake(0.4);
				}else{
					this.gear = -1;
					this.throttle(10);
					this.drive(-114.5);
				};
				break;
			case "rightTurnForward":
				if(this.speed > (1250/114.5*2.2)/60){
					this.brake(0.1);
					this.turn(this.speed, 0.5, 1.6);
				}else{
					this.gear = 1;
					this.throttle(10);
					this.turn(this.speed, 1, 1.6);
					this.drive(114.5);
				};
				break;
			case "leftTurnForward":
				if(this.speed > (1250/114.5*2.2)/60){
					this.brake(0.1);
					this.turn(this.speed, 0.5, -1.6);
				}else{
					this.gear = 1;
					this.throttle(10);
					this.turn(this.speed, 1, -1.6);
					this.drive(114.5);
				};
				break;
			case "rightTurnReverse":
				if(this.speed > 0 && this.gear != -1){
					this.brake(0.4);
					this.turn(this.speed, 1, 1.6);
				}else{
					this.gear = -1;
					this.throttle(10);
					this.turn(this.speed, 1, 1.6);
					this.drive(-114.5);
				};
				break;
			case "leftTurnReverse":
				if(this.speed > 0 && this.gear != -1){
					this.brake(0.4);
					this.turn(this.speed, 1, -1.6);
				}else{
					this.gear = -1;
					this.throttle(10);
					this.turn(this.speed, 1, -1.6);
					this.drive(-114.5);
				};
				break;
			case "rotateRight":
				if(this.speed > (1250/114.5*2.2)/60){
					this.brake(0.1);
				}else{
					this.gear = 1;
					this.throttle(10);
					this.turn((this.rpm/114.5*2.2)/60, 1, 1);
				};
				break;
			case "rotateLeft":
				if(this.speed > (1250/114.5*2.2)/60){
					this.brake(0.1);
				}else{
					this.gear = 1;
					this.throttle(10);
					this.turn((this.rpm/114.5*2.2)/60, 1, -1);
				};
				break;
			}
		},
		throttle(coefficient){
			if(this.rpm<1250) this.rpm += -coefficient/1562500*Math.pow(this.rpm, 2) + coefficient;
		},
		drive(gearRatio){
			this.speed = (this.rpm/gearRatio*2.2)/60
		},
		brake(coefficient){
			const brakingForce = 6500*9.81*coefficient;
			if(brakingForce/6500/60 > Math.abs(this.speed)){
				this.rpm = 0;
				this.speed = 0;
			}else if(this.speed>0){
				this.speed -= brakingForce/6500/60;
			}else{
				this.speed += brakingForce/6500/60
			}
		},
		turn(speed, speedPerc, turnCircRad){
			const turnCircumference = 2*Math.PI*turnCircRad;
			const distanceTravelled = speed*speedPerc/60;
			const angleRotated = 360/(turnCircumference/distanceTravelled);
			this.parentObject.rotation += angleRotated;
			this.parentObject.attachedObjects.forEach(function(object){
				object.rotation += angleRotated;
			})
		}
	}
}