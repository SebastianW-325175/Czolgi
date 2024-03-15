const tank = {
	positionX: 0,
	positionY: 0,
	speed: 7,
	rotation: 0,
	leftTrack: 0,
	rightTrack: 0,
	sprite: "./assets/czolg.png",
	size: 108
};
{
	function updateTracks() {
	tank.leftTrack = 0;
	tank.rightTrack = 0;
	if(keyMemoryMap.get(controlsMapping.leftTrackForwards)) tank.leftTrack += 1;
	if(keyMemoryMap.get(controlsMapping.leftTrackReverse)) tank.leftTrack += -1;
	if(keyMemoryMap.get(controlsMapping.rightTrackForwards)) tank.rightTrack += 1;
	if(keyMemoryMap.get(controlsMapping.rightTrackReverse)) tank.rightTrack += -1;
	};
	setInterval(updateTracks, 15)
}
