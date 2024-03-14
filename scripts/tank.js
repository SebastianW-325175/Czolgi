function updateTank(tankObject, tankSpriteObject, tankControllerObject) {
	tankSpriteObject.style.top = (((window.innerHeight/2)-54)-tankObject.positionY)+"px";
	tankSpriteObject.style.left = (((window.innerWidth/2)-54)+tankObject.positionX)+"px";
	tankSprite.style.transform = "rotate("+tankObject.rotation+"deg)";
	updateTankController(tankObject, tankControllerObject);
	updateTankPos(tankObject);
};
function updateTankController(tankObject, tankControllerObject) {
	if(tankControllerObject.keyQ == true && tankControllerObject.keyA == false){
		tankObject.leftTrack = "forward";
	} else if(tankControllerObject.keyQ == false && tankControllerObject.keyA == true) {
		tankObject.leftTrack = "reverse";
	} else {
		tankObject.leftTrack = "neutral";
	};
	if(tankControllerObject.keyE == true && tankControllerObject.keyD == false){
		tankObject.rightTrack = "forward";
	} else if(tankControllerObject.keyE == false && tankControllerObject.keyD == true) {
		tankObject.rightTrack = "reverse";
	} else {
		tankObject.rightTrack = "neutral";
	}
};
function updateTankPos(tankObject) {
	if(tankObject.leftTrack == "forward" && tankObject.rightTrack == "forward") {
		tankObject.moveForward(tankObject.speed);
	} else if(tankObject.leftTrack == "reverse" && tankObject.rightTrack == "reverse") {
		tankObject.moveForward(tankObject.speed * -0.4);
	} else if(tankObject.leftTrack == "forward" && tankObject.rightTrack == "reverse") {
		tankObject.rotation += 0.4;
		tankObject.moveForward(tankObject.speed * 0.05);
	} else if(tankObject.leftTrack == "reverse" && tankObject.rightTrack == "forward") {
		tankObject.rotation -= 0.4;
		tankObject.moveForward(tankObject.speed * 0.05);
	} else if(tankObject.leftTrack == "forward" && tankObject.rightTrack == "neutral") {
		tankObject.rotation += 0.25;
		tankObject.moveForward(tankObject.speed * 0.15);
	} else if(tankObject.leftTrack == "neutral" && tankObject.rightTrack == "forward") {
		tankObject.rotation -= 0.25;
		tankObject.moveForward(tankObject.speed * 0.15);
	} else if(tankObject.leftTrack == "reverse" && tankObject.rightTrack == "neutral") {
		tankObject.rotation -= 0.15;
		tankObject.moveForward(tankObject.speed * -0.05);
	} else if(tankObject.leftTrack == "neutral" && tankObject.rightTrack == "reverse") {
		tankObject.rotation += 0.15;
		tankObject.moveForward(tankObject.speed * -0.05);
	}
};

const tank = {
	positionX: 0,
	positionY: 0,
	health: 100,
	speed: 1,
	rotation: 0,
	leftTrack: "neutral",
	rightTrack: "neutral",
	moveForward: function(speed) {
		this.positionX += ( speed * Math.sin( this.rotation * Math.PI/180) );
		this.positionY += ( speed * Math.cos( this.rotation * Math.PI/180) );
	}
};

const tankController = {
	keyQ: false,
	keyA: false,
	keyE: false,
	keyD: false,
	keyDownHandler: function(event) {
		switch(event.key) {
		case "q":
			tankController.keyQ = true;
			break;
		case "a":
			tankController.keyA = true;
			break;
		case "e":
			tankController.keyE = true;
			break;
		case "d":
			tankController.keyD = true;
			break;
		}
	},
	keyUpHandler: function(event) {
		switch(event.key) {
		case "q":
			tankController.keyQ = false;
			break;
		case "a":
			tankController.keyA = false;
			break;
		case "e":
			tankController.keyE = false;
			break;
		case "d":
			tankController.keyD = false;
			break;
		}
	}
}

const tankSprite = document.createElement('img');
tankSprite.src = "./assets/czolg.png";
tankSprite.style.position = "absolute";
tankSprite.style.height = "108px";
tankSprite.style.imageRendering = "pixelated";
document.querySelector('body').appendChild(tankSprite);
setInterval(updateTank, 10, tank, tankSprite, tankController);

document.addEventListener("keypress", tankController.keyDownHandler);
document.addEventListener("keyup", tankController.keyUpHandler);