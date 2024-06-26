//Local
{
	const debugBoxNew = {
		object: createUiElement("#uiLayer", "div", "debugBox", "uiBox", "anchorTopRight", ""),
		lastKeyState: false,
		info: new Map([
			["position", [0, 0]],
			["rotation", 0],
			["leftTrack", 0],
			["rightTrack", 0],
			["state", "brake"],
			["rpm", 0],
			["gear", 0],
			["speed", 0]
		]),
		create: function() {
			this.object.style.display = "inline-block";
			createUiElement("#debugBox", "div", "debugBoxTitleContainer", "uiTextContainer", "", "");
			createUiElement("#debugBoxTitleContainer", "p", "", "uiText", "", "Debug info");
			
			this.info.forEach(function(value, key) {
				const debugTextContainer = createUiElement("#debugBox", "div", "", "uiTextContainer", "", "");
				const debugTextKey = createUiElement("", "p", "", "uiText", "uiTextSmall", key+": ");
				debugTextContainer.appendChild(debugTextKey);
				
				const debugTextValue = createUiElement("", "p", "debugValue"+key, "uiText", "uiTextSmall", ""+value);
				debugTextContainer.appendChild(debugTextValue);
			})
		},
		updateDebugInfo() {
			if(this.object.style.display == "inline-block") {							//Update the object properties
				this.info.set("position", [tank.position[0].toFixed(0), tank.position[1].toFixed(0)]);		
				this.info.set("rotation", tank.rotation.toFixed(1));
				this.info.set("leftTrack", tank.leftTrack);
				this.info.set("rightTrack", tank.rightTrack);
				this.info.set("state", tank.state);
				this.info.set("rpm", tank.physics.rpm.toFixed(0));
				this.info.set("gear", tank.physics.gear);
				this.info.set("speed", (tank.physics.speed*3.6).toFixed(2)+"km/h");
			}
			
			this.info.forEach(function(value,key) {
				document.querySelector("#debugValue"+key).textContent = value;				//Update the display
			});
			if(keyMemoryMap.get(controlsMapping.showDebug) && this.lastKeyState == false){	//Show/Hide Controller
				switch(this.object.style.display) {
				case "none":
					this.object.style.display = "inline-block";
					break;
				case "inline-block":
					this.object.style.display = "none";
					break;
				}
			}
			this.lastKeyState = keyMemoryMap.get(controlsMapping.showDebug);				//Update lastKeyState
		}
	};

	debugBoxNew.create();
	keyMemoryMap.set(controlsMapping.showDebug, false);	//Workaround to account for the first-ever press
	setInterval( function () {debugBoxNew.updateDebugInfo()}, 1000/60);
}