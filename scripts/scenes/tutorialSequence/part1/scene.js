const sceneTutorialPart1 = {
	load: function(){
		gameEngine.clear()
		rendererObject.clear();
		hoverEventHandler.clear();
		clickEventHandler.clear();

		//BACKGROUND LAYER
		const backgroundLayer = rendererObject.newLayer("backgroundLayer", []);
		const tile1 = backgroundLayer.newObject("tile1", "img");
		backgroundLayer.enableOffset();
		tile1.defineImg("./assets/map/training_grounds.png", -180, -180);

		//CHARACTERS LAYER
		const characterLayer = rendererObject.newLayer("characterLayer", []);
		characterLayer.enableOffset();

		//MANNEQUIN FRENCH
		const mannequinFrenchObject = gameEngine.newObject("mannequinFrench");
		const mannequinFrenchSprite = characterLayer.newObject("mannequinFrenchSprite", "img");
		mannequinFrenchSprite.defineImg("./assets/characters/soldier/french.png", 0, 0);
		mannequinFrenchObject.sprite = mannequinFrenchSprite;
		mannequinFrenchObject.position = [-80, -155];
		mannequinFrenchObject.collisionBox = [7 ,7];
		mannequinFrenchObject.rotation = 180;

		//MANNEQUIN GERMAN
		const mannequinGermanObject = gameEngine.newObject("mannequinGerman");
		const mannequinGermanSprite = characterLayer.newObject("mannequinGermanSprite", "img");
		mannequinGermanSprite.defineImg("./assets/characters/soldier/german.png", 0, 0);
		mannequinGermanObject.sprite = mannequinGermanSprite;
		mannequinGermanObject.position = [-50, -155];
		mannequinGermanObject.collisionBox = [7 ,7];
		mannequinGermanObject.rotation = 180;

		//SERGEANT OBJECT
		const sergeantObject = gameEngine.newObject("sergeant");
		const sergeantSprite = characterLayer.newObject("sergeantSprite", "img");
		const sergeantHighlight = sergeantSprite.newAnimation("highlight");
		const sergeantUnhighlight = sergeantSprite.newAnimation("unhighlight");
		sergeantSprite.defineImg("./assets/characters/sergeant/sergeant.png", 0, 0);
		sergeantObject.sprite = sergeantSprite;
		sergeantObject.interact = function(){
			objectiveHandler.dataRegistry.set("interactedSergeant", true);
			gameEngine.controlledObject.updateControls = function(){};
		}
		sergeantHighlight.defineKeyframes([
			new animationKeyframe("./assets/characters/sergeant/sergeant_highlighted.png", 0),
		]);
		sergeantHighlight.endScript = function(){
			objectiveHandler.dataRegistry.set("nearSergeant", true);
		}
		sergeantUnhighlight.defineKeyframes([
			new animationKeyframe("./assets/characters/sergeant/sergeant.png", 0),
		]);
		sergeantObject.position = [-20, -100];
		sergeantObject.collisionBox = [7, 7];
		sergeantObject.rotation = 190;
		sergeantObject.isInteractable = true;

		//TANK OBJECT
		const tankObject = gameEngine.newObject("tank");
		const tankSprite = characterLayer.newObject("tankSprite", "img");
		const tankHighlight = tankSprite.newAnimation("highlight");
		const tankUnhighlight = tankSprite.newAnimation("unhighlight");
		tankSprite.defineImg("./assets/characters/tank/tank_hull.png", 0, 0);
		tankObject.sprite = tankSprite;
		tankHighlight.defineKeyframes([
			new animationKeyframe("./assets/characters/tank/tank_hull_highlighted.png", 0),
		]);
		tankUnhighlight.defineKeyframes([
			new animationKeyframe("./assets/characters/tank/tank_hull.png", 0),
		]);
		tankObject.position = [-60, -75];
		tankObject.collisionBox = [15, 15];
		tankObject.rotation = 90;

		//TURRET OBJECT
		const turretObject = gameEngine.newObject("turret");
		const turretSprite = characterLayer.newObject("turretSprite", "img");
		turretSprite.defineImg("./assets/characters/tank/tank_turret.png", 0, 0);
		turretObject.sprite = turretSprite;
		turretObject.position = [-60, -75];
		turretObject.collisionBox = [0,0];
		turretObject.rotation = 90;

		//DRIVER OBJECT
		const driverObject = gameEngine.newObject("driver");
		const driverSprite = characterLayer.newObject("driverSprite", "img");
		const driverWalkAnimation = driverSprite.newAnimation("walk");
		driverSprite.defineImg("./assets/characters/driver/shirt/idle.png", 0, 0);
		driverWalkAnimation.defineKeyframes([
			new animationKeyframe("./assets/characters/driver/shirt/idle.png", 100),
			new animationKeyframe("./assets/characters/driver/shirt/step_left.png", 200),
			new animationKeyframe("./assets/characters/driver/shirt/idle.png", 100),
			new animationKeyframe("./assets/characters/driver/shirt/step_right.png", 200),
		]);
		driverWalkAnimation.chainAnimation(driverWalkAnimation, 0);
		driverObject.sprite = driverSprite;
		driverObject.position = [0, 0];
		driverObject.collisionBox = [7, 7];
		driverObject.updateControls = controlSchemeLibrary.humanCharacter;

		//INVISIBLE WALLS
		const wall1 = gameEngine.newObject("wall1");
		const wall2 = gameEngine.newObject("wall2");
		const wall3 = gameEngine.newObject("wall3");
		const wall4 = gameEngine.newObject("wall4");
		wall1.position = [-55, 70];
		wall1.collisionBox = [256, 30];
		wall2.position = [-180, -55]
		wall2.collisionBox = [30, 256];
		wall3.position = [-55, -175];
		wall3.collisionBox = [256, 30];
		wall4.position = [70, -55]
		wall4.collisionBox = [30, 256];


		//INTERFACE LAYER
		const interfaceLayer = rendererObject.newLayer("interfaceLayer", []);

		//OVERLAY LAYER
		const overlayLayer = rendererObject.newLayer("overlayLayer", []);
		const overlayRect = overlayLayer.newObject("overlayRect", "rect");
		const overlayFadeOut = overlayRect.newAnimation("fadeOut", "opacity");
		const overlayFadeIn = overlayRect.newAnimation("fadeIn", "opacity");
		overlayRect.defineRect("rgb(255 255 255 / 1)", 0, 0, 320, 180);
		overlayFadeOut.defineLinear(1, 0, "linear", 4);
		overlayFadeIn.defineLinear(0, 1, "linear", 4);
		
		overlayFadeOut.endScript = function(){
			objectiveLibrary.moveAround();
			gameEngine.controlledObject = driverObject;
			this.parent.color = "rgb(0 0 0 / 0)"
			//console.log(this);
		};
		overlayFadeIn.endScript = function(){
			gameEngine.clear()
			rendererObject.clear();
			hoverEventHandler.clear();
			clickEventHandler.clear();
			sceneMainGameIntro.load();
		}

		overlayFadeOut.playAnimation();
		gameEngine.tickLoop();
		rendererObject.renderLoop();
		objectiveHandler.broadcastInit();
		dialogueHandler.dialogueInit();
	}
}