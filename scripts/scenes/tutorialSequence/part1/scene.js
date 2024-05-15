const sceneTutorialPart1 = {
	load: function(){
		rendererObject.clear();
		hoverEventHandler.clear();
		clickEventHandler.clear();

		//Background layer
		const backgroundLayer = rendererObject.newLayer("backgroundLayer", []);
		const backgroundColor = backgroundLayer.newObject("backgroundColor", "rect")
		const tile1 = backgroundLayer.newObject("tile1", "img");
		backgroundLayer.enableOffset();
		backgroundColor.defineRect("#FFFFFF", -160, -90, 320, 180);
		tile1.defineImg("./assets/map/training_grounds.png", -150, -150);

		//Character layer
		const characterLayer = rendererObject.newLayer("characterLayer", []);
		characterLayer.enableOffset();
		//Driver object
		const driverObject = gameEngine.newObject("driver");
		const driverSprite = characterLayer.newObject("driverSprite", "img");
		driverSprite.defineImg("./assets/characters/driver/shirt/idle.png", 0, 0);
		driverObject.sprite = driverSprite;
		driverObject.position = [0, 0];
		driverObject.updateControls = function(){
			if(keyMemoryMap.get(controlsMapping.goForwards)) this.position[1] += 0.42;
			if(keyMemoryMap.get(controlsMapping.goBackwards)) this.position[1] -= 0.42;
			if(keyMemoryMap.get(controlsMapping.goRight)) this.position[0] += 0.42;
			if(keyMemoryMap.get(controlsMapping.goLeft)) this.position[0] -= 0.42;
		};

		//Interface layer
		const interfaceLayer = rendererObject.newLayer("interfaceLayer", []);
		const placeholderWindow = interfaceLayer.newObject("placeholderWindow", "rect");
		const placeholderText1 = interfaceLayer.newObject("placeHolderText1", "text");
		const placeholderText2 = interfaceLayer.newObject("placeHolderText2", "text");
		const placeholderText3 = interfaceLayer.newObject("placeHolderText2", "text");
		placeholderWindow.defineRect("#1023FE", 90, 2, 140, 28);
		placeholderText1.defineText("This is the interface", "#FFFFFF", "6px Dogica", "center", 160, 10);
		placeholderText2.defineText("It does not scale with zoom", "#FFFFFF", "6px Dogica", "center", 160, 18);
		placeholderText3.defineText("It maintains a pixel size", "#FFFFFF", "6px Dogica", "center", 160, 26);

		gameEngine.controlledObject = driverObject;
		gameEngine.tickLoop();
		rendererObject.renderLoop();
	}
}