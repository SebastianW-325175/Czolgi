//LOCAL
/*{
	const debugBox = document.querySelector("#debugBox");
	let lastKeyState = false;

	//Updates the box' display based on whether the key has been pressed for only 1 tick
	function updateDebugBox() {
		if(keyMemoryMap.get(controlsMapping.showDebug) && lastKeyState == false) {
			switch(debugBox.style.display) {
			case "none":
				debugBox.style.display = "inline-block";
				break;
			case "inline-block":
				debugBox.style.display = "none";
				break;
			}
		}

		lastKeyState = keyMemoryMap.get(controlsMapping.showDebug);
	};
	
	debugBox.style.display = "none";
	keyMemoryMap.set(controlsMapping.showDebug, false);	//Workaround to account for the first-ever press
	setInterval(updateDebugBox, 15);
}
*/