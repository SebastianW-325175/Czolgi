const sceneFailScreen = {
	load(){
		gameEngine.clear()
		rendererObject.clear();
		hoverEventHandler.clear();
		clickEventHandler.clear();

		//Text layer
		const interactKey = controlsMapping.interact;
		const textLayer = rendererObject.newLayer("textLayer", []);
		const failure = textLayer.newObject("failure", "text");
		const text1 = textLayer.newObject("text1", "text");
		const text2 = textLayer.newObject("text2", "text");
		const failureAppear = failure.newAnimation("appear", "opacity");
		const text1Appear = text1.newAnimation("appear", "opacity");
		const text2Appear = text2.newAnimation("appear", "opacity");
		failure.defineText("FAILURE", "rgb(255 255 255 / 0)", "20px Dogica", "center", 160, 40);
		text1.defineText("All of your troops were killed.", "rgb(255 255 255 / 0)", "6px Dogica", "center", 160, 60);
		text2.defineText("Press "+interactKey+" to try again", "rgb(255 255 255 / 0)", "6px pixeled", "center", 160, 150);
		failureAppear.defineLinear(0, 1, "linear", 0);
		text1Appear.defineLinear(0, 1, "linear", 0);
		text2Appear.defineLinear(0, 1, "linear", 1.5)
		text2Appear.endScript = function(){
			objectiveLibrary.retry();
		};

		setTimeout(function(animation){animation.playAnimation()}, 500, failureAppear);
		failureAppear.chainAnimation(text1Appear, 0.5);
		text1Appear.chainAnimation(text2Appear, 0.5);
		rendererObject.renderLoop();
	}
}