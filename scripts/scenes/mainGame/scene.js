const sceneMainGame = {
	load(){
		gameEngine.clear()
		rendererObject.clear();
		hoverEventHandler.clear();
		clickEventHandler.clear();
		
		//BACKGROUND LAYER
		const backgroundLayer = rendererObject.newLayer("backgroundLayer", []);
		const tile1 = backgroundLayer.newObject("tile1", "img");
		backgroundLayer.enableOffset();
		tile1.defineImg("./assets/map/field.png", -128, -1300);

		//CHARACTERS LAYER
		const characterLayer = rendererObject.newLayer("characterLayer", []);
		characterLayer.enableOffset();

		//DITCHES
		this.spawnDitch(-180);
		this.spawnDitch(-310);
		this.spawnDitch(-450);
		this.spawnDitch(-850);

		//TANK OBJECT
		const tankObject = gameEngine.newObject("tank");
		const tankSprite = characterLayer.newObject("tankSprite", "img");
		tankSprite.defineImg("./assets/characters/tank/tank_hull.png", 0, 0);
		tankObject.sprite = tankSprite;
		tankObject.position = [0, 0];
		tankObject.collisionBox = [15, 15];
		tankObject.rotation = 0;
		tankObject.updateControls = function(){
				this.objectData.updateState();
				this.objectData.updatePosition();
				this.objectData.updateEngine();
		};
		gameEngine.controlledObject = tankObject;
		tankObject.objectData = {
			parentObject: tankObject,
			leftTrack: 0,
			rightTrack: 0,
			state: "brake",
			rpm: 500,
			speed: 0,
			gear: 0,
			updateState: controlSchemeLibrary.tankCharacter.updateState,
			updatePosition: controlSchemeLibrary.tankCharacter.updatePosition,
			updateEngine: controlSchemeLibrary.tankCharacter.updateEngine,
			throttle: controlSchemeLibrary.tankCharacter.throttle,
			drive: controlSchemeLibrary.tankCharacter.drive,
			brake: controlSchemeLibrary.tankCharacter.brake,
			turn: controlSchemeLibrary.tankCharacter.turn,
		};

		//TURRET OBJECT
		const turretObject = gameEngine.newObject("turret");
		const turretSprite = characterLayer.newObject("turretSprite", "img");
		turretSprite.defineImg("./assets/characters/tank/tank_turret.png", 0, 0);
		turretObject.sprite = turretSprite;
		turretObject.position = [0, 0];
		turretObject.collisionBox = [7, 7];
		turretObject.rotation = 0;
		tankObject.attachedObjects.push(turretObject);
		turretObject.updateControls = controlSchemeLibrary.turretCharacter;
		turretObject.objectData = {
			reload: 0
		};

		//FRENCH SOLDIERS
		this.spawnFrench(54, 98);
		this.spawnFrench(23, 102);
		this.spawnFrench(-19, 94);
		this.spawnFrench(-64, 92);
		this.spawnFrench(-95, 115);
		this.spawnFrench(-42, 122);
		this.spawnFrench(-5, 118);
		this.spawnFrench(27, 129);
		this.spawnFrench(71, 119);

		//GERMAN SOLDIERS
		this.spawnGerman(0, -200);

		this.spawnGerman(-90, -310);
		this.spawnGerman(-80, -310);
		this.spawnGerman(-70, -310);
		this.spawnGerman(90, -310);
		this.spawnGerman(80, -310);
		this.spawnGerman(70, -310);

		this.spawnGerman(65, -514);
		this.spawnGerman(47, -501);
		this.spawnGerman(29, -497);
		this.spawnGerman(20, -524);
		this.spawnGerman(-12, -503);
		this.spawnGerman(-40, -495);
		this.spawnGerman(-45, -502);
		this.spawnGerman(-70, -495);

		this.spawnGerman(60, -720);
		this.spawnGerman(-10, -630);
		this.spawnGerman(14, -748);
		this.spawnGerman(-80, -870);
		this.spawnGerman(-45, -850);


		this.spawnGerman(80, -950);
		this.spawnGerman(70, -950);
		this.spawnGerman(20, -1050);
		this.spawnGerman(10, -1050);
		this.spawnGerman(-40, -1150);
		this.spawnGerman(-50, -1150);

		//OVERLAY LAYER
		const overlayLayer = rendererObject.newLayer("overlayLayer", []);
		const overlayRect = overlayLayer.newObject("overlayRect", "rect");
		const overlayFadeOut = overlayRect.newAnimation("fadeOut", "opacity");
		const overlayFadeIn = overlayRect.newAnimation("fadeIn", "opacity");
		overlayRect.defineRect("rgb(0 0 0 / 1)", 0, 0, 320, 180);
		overlayFadeOut.defineLinear(1, 0, "linear", 4);

		gameEngine.tickLoop();
		rendererObject.renderLoop();
		overlayFadeOut.playAnimation();
		objectiveLibrary.allTroopsDie();
	},
	spawnFrench(x, y){
		const characterLayer = rendererObject.getLayer("characterLayer");
		let i = 0;
		while(characterLayer.getObject("frenchSoldier"+i)){
			i++;
		};

		const newFrenchSoldier = gameEngine.newObject("frenchSoldier"+i);
		const newFrenchSoldierSprite = characterLayer.newObject("frenchSoldier"+i, "img");
		newFrenchSoldierSprite.defineImg("./assets/characters/soldier/french_rifle.png", 0, 0);
		newFrenchSoldier.sprite = newFrenchSoldierSprite;
		newFrenchSoldier.position = [x, y];
		newFrenchSoldier.collisionBox = [7, 7];
		newFrenchSoldier.rotation = 0;
		newFrenchSoldier.damage = function(){
			const characterLayer = rendererObject.getLayer("characterLayer");
			gameEngine.gameObjects.splice(gameEngine.gameObjects.indexOf(this), 1);
			characterLayer.renderObjects.splice(characterLayer.renderObjects.indexOf(this.sprite), 1);
		};
		newFrenchSoldier.objectData = {
			parent: newFrenchSoldier,
			reload: 0,
		}
		newFrenchSoldier.ai = controlSchemeLibrary.allyAi;
	},
	spawnGerman(x, y){
		const characterLayer = rendererObject.getLayer("characterLayer");
		let i = 0;
		while(characterLayer.getObject("germanSoldier"+i)){
			i++;
		};

		const newGermanSoldier = gameEngine.newObject("germanSoldier"+i);
		const newGermanSoldierSprite = characterLayer.newObject("germanSoldier"+i, "img");
		newGermanSoldierSprite.defineImg("./assets/characters/soldier/german_rifle.png", 0, 0);
		newGermanSoldier.sprite = newGermanSoldierSprite;
		newGermanSoldier.position = [x, y];
		newGermanSoldier.collisionBox = [7, 7];
		newGermanSoldier.rotation = 180;
		newGermanSoldier.damage = function(){
			const characterLayer = rendererObject.getLayer("characterLayer");
			gameEngine.gameObjects.splice(gameEngine.gameObjects.indexOf(this), 1);
			characterLayer.renderObjects.splice(characterLayer.renderObjects.indexOf(this.sprite), 1);
		};
		newGermanSoldier.objectData = {
			parent: newGermanSoldier,
			reload: 0,
		}
		newGermanSoldier.ai = controlSchemeLibrary.enemyAi;
	},
	spawnDitch(y){
		const characterLayer = rendererObject.getLayer("characterLayer");
		let i = 0;
		while(characterLayer.getObject("ditch"+i)){
			i++;
		};

		const newDitch = gameEngine.newObject("ditch"+i);
		const newDitchSprite = characterLayer.newObject("ditch"+i, "img");
		newDitchSprite.defineImg("./assets/characters/ditch/ditch.png", 0, 0);
		newDitch.sprite = newDitchSprite;
		newDitch.position = [0, y];
		newDitch.collisionBox = [256, 20];
	}
}