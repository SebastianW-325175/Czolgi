//Local
{
	const debugBoxNew = {
		info: new Map([
			["position", [0, 0]],
			["rotation", 0],
			["leftTrack", 0],
			["rightTrack", 0],
			["speed", 0],
			["acceleration", 0]
		]),
		create: function() {
			const debugBox = createUiElement("#uiLayer", "div", "debugBox", "uiBox", "anchorTopRight", "");
			debugBox.style.display = "none";
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
			this.info.forEach(function(value,key) {
				document.querySelector("#debugValue"+key).textContent = value;
			})
		}
	};

	debugBoxNew.create();
	setInterval( function () {debugBoxNew.updateDebugInfo()}, 150);
}