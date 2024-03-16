//GLOBAL
const tank = {
	positionX: 0,
	positionY: 0,
	speed: 7,
	rotation: 0,
	leftTrack: 0,
	rightTrack: 0,
	sprite: "./assets/ft17.png",
	size: 108,
	spawn: function() {
		const ft17Sprite = document.createElement('div');
		document.querySelector('body').appendChild(ft17Sprite);
		ft17Sprite.outerHTML = '<div><img class="ft17" src="./assets/ft17.png"><img class="ft17" src="./assets/ft17_turret.png"></div>'
	},
	updateTracks: function() {
		this.leftTrack = 0;
		this.rightTrack = 0;
		if(keyMemoryMap.get(controlsMapping.leftTrackForwards)) this.leftTrack += 1;
		if(keyMemoryMap.get(controlsMapping.leftTrackReverse)) this.leftTrack -= 1;
		if(keyMemoryMap.get(controlsMapping.rightTrackForwards)) this.rightTrack += 1;
		if(keyMemoryMap.get(controlsMapping.rightTrackReverse)) this.rightTrack -= 1;
	}
};

//LOCAL
{
	tank.spawn();
	setInterval(function () {tank.updateTracks()}, 15)
}
