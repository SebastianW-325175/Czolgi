const sceneMainGameIntro = {
	load: function(){
		gameEngine.clear()
		rendererObject.clear();
		hoverEventHandler.clear();
		clickEventHandler.clear();

		//Text layer
		const interactKey = controlsMapping.interact;
		const turretLeftKey = controlsMapping.turretLeft;
		const turretRightKey = controlsMapping.turretRight;
		const shootKey = controlsMapping.shoot;
		const textLayer = rendererObject.newLayer("textLayer", []);
		const battleOfAmiens = textLayer.newObject("battleOfAmiens", "text");
		const battleOfAmiensAppear = battleOfAmiens.newAnimation("appear", "opacity");
		const date = textLayer.newObject("date", "text");
		const dateAppear = date.newAnimation("appear", "opacity");
		const text1 = textLayer.newObject("text1", "text");
		const text1Appear = text1.newAnimation("appear", "opacity");
		const text2 = textLayer.newObject("text2", "text");
		const text2Appear = text2.newAnimation("appear", "opacity");
		const text3 = textLayer.newObject("text3", "text");
		const text3Appear = text3.newAnimation("appear", "opacity");
		const text4 = textLayer.newObject("text4", "text");
		const text4Appear = text4.newAnimation("appear", "opacity");
		battleOfAmiens.defineText("BATTLE OF AMIENS", "rgb(255 255 255 / 0)", "20px Dogica", "center", 160, 40);
		battleOfAmiensAppear.defineLinear(0, 1, "linear", 0);
		date.defineText("August 8th, 1918", "rgb(255 255 255 / 0)", "6px Dogica", "center", 160, 52);
		dateAppear.defineLinear(0, 1, "linear", 0);
		text1.defineText("Escort the French troops into the German position.", "rgb(255 255 255 / 0)", "6px Dogica", "center", 160, 80);
		text1Appear.defineLinear(0, 1, "linear", 1);
		text2.defineText("Your commander can turn the turret and shoot the machine gun.", "rgb(255 255 255 / 0)", "6px Dogica", "center", 160, 90);
		text2Appear.defineLinear(0, 1, "linear", 1);
		text3.defineText("Use ["+turretLeftKey+"] and ["+turretRightKey+"] to move the turret, and ["+shootKey+"] to shoot.", "rgb(255 255 255 / 0)", "4px pixeled", "center", 160, 120);
		text3Appear.defineLinear(0, 1, "linear", 0);
		text4.defineText("Press "+interactKey+" to begin the mission.", "rgb(255 255 255 / 0)", "6px pixeled", "center", 160, 150);
		text4Appear.defineLinear(0, 1, "linear", 1.5)


		//Animation sequencing
		battleOfAmiensAppear.chainAnimation(dateAppear, 0.75);
		dateAppear.chainAnimation(text1Appear, 0.5);
		text1Appear.chainAnimation(text2Appear, 0);
		text2Appear.chainAnimation(text3Appear, 2);
		text3Appear.chainAnimation(text4Appear, 0.5);
		text4Appear.endScript = function(){
			objectiveLibrary.startGame();
		}

		rendererObject.renderLoop();
		battleOfAmiensAppear.playAnimation();
	}
}