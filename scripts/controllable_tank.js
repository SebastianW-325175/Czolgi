//GLOBAL
const tank = {
	position: [0, 0],
	rotation: 0,
	leftTrack: 0,
	rightTrack: 0,
	sprite: "./assets/ft17.png",
	size: 108,
	physics: {
		enginePower: 29000,
		weight: 6500,
		acceleration: 0,
		speed: 0,
		optimalSpeed: 5.5
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
	}
};

//LOCAL
{
	function updateTank() {
		tank.updateTracks();
		tank.updatePosition();
	}

	tank.spawn();
	setInterval(function () {updateTank()}, 15)
}
