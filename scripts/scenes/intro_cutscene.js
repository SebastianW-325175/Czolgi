const sceneIntroCutscene = {
	load: function(){
		gameEngine.clear()
		rendererObject.clear();
		hoverEventHandler.clear();
		clickEventHandler.clear();

		//Background layer
		const backgroundLayer = rendererObject.newLayer("backgroundLayer", []);
		const backgroundColor = backgroundLayer.newObject("backgroundColor", "rect")
		backgroundColor.defineRect("#111111", 0, 0, 320, 180);

		//Slideshow layer
		const slideshowLayer = rendererObject.newLayer("slideshowLayer", []);
		const madeBy = slideshowLayer.newObject("madeBy", "text");				//"Made by" text
		const frost = slideshowLayer.newObject("frost", "text");				//"FROST" text
		const madeByDisappear = madeBy.newAnimation("disappear", "opacity");
		const frostDisappear = frost.newAnimation("disappear", "opacity");
		madeBy.defineText("Made by", "#FFFFFF", "8px dogica", "center", 160, 70);
		frost.defineText("FROST", "#FFFFFF", "10.75px dogica", "center", 160, 82);
		madeByDisappear.defineLinear(1, 0, "linear", 0);
		frostDisappear.defineLinear(1, 0, "linear", 0);

		//Text of slide 1
		const slide1 = slideshowLayer.newObject("slide1", "img");
		const text1 = slideshowLayer.newObject("text1", "text");
		const slide1Appear = slide1.newAnimation("appear", "y");
		const slide1Disappear = slide1.newAnimation("disappear", "y");
		const text1Appear = text1.newAnimation("appear", "opacity");
		const text1Disappear = text1.newAnimation("disappear", "opacity");;
		slide1.defineImg("./assets/backgrounds/slide1.png", 3, 183);
		text1.defineText("In 1918, war has already ravaged Europe for more than 4 years.", "rgb(255 255 255 / 0)", "6px dogica", "center", 160, 170);
		slide1Appear.defineLinear(183, 3, "linear", 0);
		slide1Disappear.defineLinear(3, 183, "linear", 0);
		text1Appear.defineLinear(0, 1, "linear", 0);
		text1Disappear.defineLinear(1, 0, "linear", 0);

		//Text of slide 2
		const slide2 = slideshowLayer.newObject("slide2", "img");
		const text2 = slideshowLayer.newObject("text2", "text");
		const text21 = slideshowLayer.newObject("text21", "text");
		const slide2Appear = slide2.newAnimation("appear", "y");
		const slide2Disappear = slide2.newAnimation("disappear", "y");
		const text2Appear = text2.newAnimation("appear", "opacity");
		const text2Disappear = text2.newAnimation("disappear", "opacity");
		const text21Appear = text21.newAnimation("appear", "opacity");
		const text21Disappear = text21.newAnimation("disappear", "opacity");
		slide2.defineImg("./assets/backgrounds/slide2.png", 3, 183);
		text2.defineText("West of the German Empire, a bloody stalemate has proven", "rgb(255 255 255 / 0)", "6px dogica", "center", 160, 164);
		text21.defineText("impossible to break.", "rgb(255 255 255 / 0)", "6px dogica", "center", 160, 174);
		slide2Appear.defineLinear(183, 3, "linear", 0);
		slide2Disappear.defineLinear(3, 183, "linear", 0);
		text2Appear.defineLinear(0, 1, "linear", 0);
		text2Disappear.defineLinear(1, 0, "linear", 0);
		text21Appear.defineLinear(0, 1, "linear", 0);
		text21Disappear.defineLinear(1, 0, "linear", 0);

		//Text of slide 3
		/*
		const slide3 = slideshowLayer.newObject("slide3", "rect");
		const text3 = slideshowLayer.newObject("text3", "text");
		const slide3Appear = slide3.newAnimation("appear", "opacity");
		const slide3Disappear = slide3.newAnimation("disappear", "opacity");
		const text3Appear = text3.newAnimation("appear", "opacity");
		const text3Disappear = text3.newAnimation("disappear", "opacity");;
		slide3.defineRect("rgb(25 187 44 / 0)", 3, 3, 314, 152);
		text3.defineText("...even with support from over the ocean.", "rgb(255 255 255 / 0)", "6px dogica", "center", 160, 170);
		slide3Appear.defineLinear(0, 1, "linear", 0);
		slide3Disappear.defineLinear(1, 0, "linear", 0);
		text3Appear.defineLinear(0, 1, "linear", 0);
		text3Disappear.defineLinear(1, 0, "linear", 0);
		*/

		//Text of slide 4
		const slide4 = slideshowLayer.newObject("slide4", "img");
		const text4 = slideshowLayer.newObject("text4", "text");
		const text41 = slideshowLayer.newObject("text41", "text");
		const slide4Appear = slide4.newAnimation("appear", "y");
		const slide4Disappear = slide4.newAnimation("disappear", "y");
		const text4Appear = text4.newAnimation("appear", "opacity");
		const text4Disappear = text4.newAnimation("disappear", "opacity");
		const text41Appear = text41.newAnimation("appear", "opacity");
		const text41Disappear = text41.newAnimation("disappear", "opacity");
		slide4.defineImg("./assets/backgrounds/slide4.png", 3, 183, );
		text4.defineText("But the French army, together with Louis Renault", "rgb(255 255 255 / 0)", "6px dogica", "center", 160, 164);
		text41.defineText("in secret factories deep inside France...", "rgb(255 255 255 / 0)", "6px dogica", "center", 160, 174);
		slide4Appear.defineLinear(183, 3, "linear", 0);
		slide4Disappear.defineLinear(3, 183, "linear", 0);
		text4Appear.defineLinear(0, 1, "linear", 0);
		text4Disappear.defineLinear(1, 0, "linear", 0);
		text41Appear.defineLinear(0, 1, "linear", 0);
		text41Disappear.defineLinear(1, 0, "linear", 0);

		//Text of slide 5
		const slide5 = slideshowLayer.newObject("slide5", "img");
		const text5 = slideshowLayer.newObject("text5", "text");
		const slide5Appear = slide5.newAnimation("appear", "y");
		const slide5Disappear = slide5.newAnimation("disappear", "y");
		const text5Appear = text5.newAnimation("appear", "opacity");
		const text5Disappear = text5.newAnimation("disappear", "opacity");;
		slide5.defineImg("./assets/backgrounds/slide5.png", 3, 183);
		text5.defineText("...designed a machine. A machine to win the war.", "rgb(255 255 255 / 0", "6px dogica", "center", 160, 170);
		slide5Appear.defineLinear(183, 3, "linear", 0);
		slide5Disappear.defineLinear(3, 183, "linear", 0);
		text5Appear.defineLinear(0, 1, "linear", 0);
		text5Disappear.defineLinear(1, 0, "linear", 0);

		//The black overlay that works as a fade in-out
		const overlayLayer = rendererObject.newLayer("overlayLayer", []);
		const overlayRect = overlayLayer.newObject("overlayRect", "rect");
		const rectFadeOut1 = overlayRect.newAnimation("rectFadeOut1", "opacity");
		const rectFadeIn1 = overlayRect.newAnimation("rectFadeIn1", "opacity");
		const rectFadeOut2 = overlayRect.newAnimation("rectFadeOut2", "opacity");
		const rectFadeIn2 = overlayRect.newAnimation("rectFadeIn2", "opacity");
		const rectFadeOut3 = overlayRect.newAnimation("rectFadeOut3", "opacity");
		const rectFadeIn3 = overlayRect.newAnimation("rectFadeIn3", "opacity");
		const rectFadeOut4 = overlayRect.newAnimation("rectFadeOu4", "opacity");
		const rectFadeIn4 = overlayRect.newAnimation("rectFadeIn4", "opacity");
		const rectFadeOut5 = overlayRect.newAnimation("rectFadeOut5", "opacity");
		const rectFadeIn5 = overlayRect.newAnimation("rectFadeIn5", "opacity");
		const rectFadeOut6 = overlayRect.newAnimation("rectFadeOut6", "opacity");
		const rectFadeIn6 = overlayRect.newAnimation("rectFadeIn6", "opacity");
		overlayRect.defineRect("rgb(0 0 0 / 1.0)", 0, 0, 320, 180);
		rectFadeOut1.defineLinear(1, 0, "linear", 2)
		rectFadeIn1.defineLinear(0, 1, "linear", 1);
		rectFadeOut2.defineLinear(1, 0, "linear", 1);
		rectFadeIn2.defineLinear(0, 1, "linear", 1);
		rectFadeOut3.defineLinear(1, 0, "linear", 1);
		rectFadeIn3.defineLinear(0, 1, "linear", 1);
		rectFadeOut4.defineLinear(1, 0, "linear", 1);
		rectFadeIn4.defineLinear(0, 1, "linear", 1);
		rectFadeOut5.defineLinear(1, 0, "linear", 1);
		rectFadeIn5.defineLinear(0, 1, "linear", 1);
		rectFadeOut6.defineLinear(1, 0, "linear", 1);
		rectFadeIn6.defineLinear(0, 1, "linear", 4);

		//Animation sequencing
		rectFadeOut1.chainAnimation(rectFadeIn1, 1);
		rectFadeIn1.chainAnimation(madeByDisappear, 0);
		madeByDisappear.chainAnimation(frostDisappear, 0);
		frostDisappear.chainAnimation(slide1Appear, 0);
		slide1Appear.chainAnimation(text1Appear, 0);
		text1Appear.chainAnimation(rectFadeOut2, 0);
		rectFadeOut2.chainAnimation(rectFadeIn2, 4);
		rectFadeIn2.chainAnimation(slide1Disappear, 0);
		slide1Disappear.chainAnimation(text1Disappear, 0);
		text1Disappear.chainAnimation(slide2Appear, 0);
		slide2Appear.chainAnimation(text2Appear, 0);
		text2Appear.chainAnimation(text21Appear, 0);
		text21Appear.chainAnimation(rectFadeOut3, 0);
		rectFadeOut3.chainAnimation(rectFadeIn3, 4);
		rectFadeIn3.chainAnimation(slide2Disappear, 0);
		slide2Disappear.chainAnimation(text2Disappear, 0);
		text2Disappear.chainAnimation(text21Disappear, 0);
		text21Disappear.chainAnimation(slide4Appear, 0);
		slide4Appear.chainAnimation(text4Appear, 0);
		text4Appear.chainAnimation(text41Appear, 0);
		text41Appear.chainAnimation(rectFadeOut5, 0);
		rectFadeOut5.chainAnimation(rectFadeIn5, 4);
		rectFadeIn5.chainAnimation(slide4Disappear, 0);
		slide4Disappear.chainAnimation(text4Disappear, 0);
		text4Disappear.chainAnimation(text41Disappear, 0);
		text41Disappear.chainAnimation(slide5Appear, 0);
		slide5Appear.chainAnimation(text5Appear, 0);
		text5Appear.chainAnimation(rectFadeOut6, 0);
		rectFadeOut6.chainAnimation(rectFadeIn6, 2);
		rectFadeIn6.endScript = function(){
			sceneMainMenu.load();
		};

		rendererObject.renderLoop();
		rectFadeOut1.playAnimation();
	}
}