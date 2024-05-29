const sceneWinScreen = {
	load(){
		gameEngine.clear()
		rendererObject.clear();
		hoverEventHandler.clear();
		clickEventHandler.clear();

		//Text layer
		const interactKey = controlsMapping.interact;
		const textLayer = rendererObject.newLayer("textLayer", []);
		const victory = textLayer.newObject("vicotyr", "text");
		const text1 = textLayer.newObject("text1", "text");
		const text2 = textLayer.newObject("text2", "text");
		const victoryAppear = victory.newAnimation("appear", "opacity");
		const text1Appear = text1.newAnimation("appear", "opacity");
		const text2Appear = text2.newAnimation("appear", "opacity");
		victory.defineText("VICTORY", "rgb(238 190 10 / 0)", "20px Dogica", "center", 160, 40);
		text1.defineText("Your troops survived and broke through enemy lines!", "rgb(255 255 255 / 0)", "6px Dogica", "center", 160, 60);
		text2.defineText("Press "+interactKey+" to replay the mission.", "rgb(255 255 255 / 0)", "6px pixeled", "center", 160, 150);
		victoryAppear.defineLinear(0, 1, "linear", 2);
		text1Appear.defineLinear(0, 1, "linear", 2);
		text2Appear.defineLinear(0, 1, "linear", 2);

		victoryAppear.chainAnimation(text1Appear, 0);
		text1Appear.chainAnimation(text2Appear, 0);
		text2Appear.endScript = function(){
			objectiveLibrary.retry();
		};

		victoryAppear.playAnimation();
		rendererObject.renderLoop();
	}
}