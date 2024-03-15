const keyMemoryMap = new Map();
const controlsMapping = {
		leftTrackForwards: "q",
		leftTrackReverse: "a",
		rightTrackForwards: "e",
		rightTrackReverse: "d",
};
{
	const keyboardController = {
	keyDownEvent: function(event) {
		if(event.type == "keydown") keyMemoryMap.set(event.key, true);
		if(event.type == "keyup") keyMemoryMap.set(event.key, false);
		}
	}
	document.addEventListener("keydown", keyboardController.keyDownEvent);
	document.addEventListener("keyup", keyboardController.keyDownEvent);
}