const sceneTutorialIntro = {
	load: function(){
		gameEngine.clear()
		rendererObject.clear();
		hoverEventHandler.clear();
		clickEventHandler.clear();

		//Background layer
		const backgroundLayer = rendererObject.newLayer("backgroundLayer", []);
		const backgroundColor = backgroundLayer.newObject("backgroundColor", "rect")
		backgroundColor.defineRect("#000000", 0, 0, 320, 180);

		//Text layer
		const textLayer = rendererObject.newLayer("textLayer", []);
		const text1 = textLayer.newObject("text1", "text");
		const text2 = textLayer.newObject("text2", "text");
		const text3 = textLayer.newObject("text3", "text");
		const text4 = textLayer.newObject("text4", "text");
		const text1Appear = text1.newAnimation("text1FadeIn", "opacity");
		const text2Appear = text2.newAnimation("text2FadeIn", "opacity");
		const text3Appear = text3.newAnimation("text3FadeIn", "opacity");
		const text4Appear = text4.newAnimation("text4FadeIn", "opacity");
		text1.defineText("Versailles", "rgb(255 255 255 / 0)", "12px Dogica", "right", 310, 140);
		text2.defineText("May 8th, Thursday, 10:32 AM", "rgb(255 255 255 / 0)", "6px Dogica", "right", 310, 150);
		text3.defineText("Three months to", "rgb(255 255 255 / 0)", "6px Dogica", "right", 244, 160);
		text4.defineText("The Offensive", "rgb(189 0 0 / 0)", "6px Dogica", "right", 310, 160);
		text1Appear.defineLinear(0, 1, "linear", 0.5);
		text2Appear.defineLinear(0, 1, "linear", 0.5);
		text3Appear.defineLinear(0, 1, "linear", 1);
		text4Appear.defineLinear(0, 1, "linear", 1);
		text1Appear.chainAnimation(text2Appear, 1);
		text2Appear.endScript = function(){
			const textLayer = rendererObject.getLayer("textLayer");
			const text3 = textLayer.getObject("text3");
			const text4 = textLayer.getObject("text4");
			text3.getAnimation("text3FadeIn").playAnimation();
			text4.getAnimation("text4FadeIn").playAnimation();
		}

		//Overlay layer
		const overlayLayer = rendererObject.newLayer("overlayLayer", []);
		const overlayRect = overlayLayer.newObject("overlayRect", "rect");
		const overlayFadeIn = overlayRect.newAnimation("fadeIn", "opacity");
		overlayRect.defineRect("rgb(255 255 255 / 0)", 0, 0, 320, 180);
		overlayFadeIn.defineLinear(0, 1, "linear", 2);
		overlayFadeIn.endScript = function(){
			sceneTutorialPart1.load();
		};
		text4Appear.chainAnimation(overlayFadeIn, 1);

		rendererObject.renderLoop();
		text1Appear.playAnimation();
	}
}