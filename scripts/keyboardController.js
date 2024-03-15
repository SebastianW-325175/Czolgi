//GLOBAL
const keyMemoryMap = new Map();		//Map object containing pressed keys
const controlsMapping = {			//Object defining the controls mapping
		leftTrackForwards: "q",
		leftTrackReverse: "a",
		rightTrackForwards: "e",
		rightTrackReverse: "d",
};

//LOCAL
{
	//Updates the keyMemoryMap with pressed keys and either a true or a false to indicate a state
	function updateKeyMemoryMap(event) {
		if(event.type == "keydown") keyMemoryMap.set(event.key, true);
		if(event.type == "keyup") keyMemoryMap.set(event.key, false);
	}
	document.addEventListener("keydown", updateKeyMemoryMap);
	document.addEventListener("keyup", updateKeyMemoryMap);
}