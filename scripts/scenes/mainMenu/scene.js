const sceneMainMenu = {
	load: function(){
		rendererObject.clear();
		hoverEventHandler.clear();
		clickEventHandler.clear();

		//Background layer
		const backgroundLayer = rendererObject.newLayer("backgroundLayer", []);
		const backgroundColor = backgroundLayer.newObject("backgroundColor", "rect")
		const backgroundArt = backgroundLayer.newObject("backgroundArt", "img");
		const planes = backgroundLayer.newObject("planes", "img");
		const driver = backgroundLayer.newObject("driver", "img");
		const commander = backgroundLayer.newObject("commander", "img")
		const planesFlyby = planes.newAnimation("flyby", "x");
		const driverIdle = driver.newAnimation("idle");
		const commanderIdle = commander.newAnimation("idle");
		backgroundColor.defineRect("#FFFFFF", 0, 0, 320, 180);
		backgroundArt.defineImg("./assets/backgrounds/main_menu.png", -70, -5);
		planes.defineImg("./assets/backgrounds/planes_main_menu.png", 520, 20);
		driver.defineImg("./assets/backgrounds/driverMainMenu/idle0.png", 142, 32);
		commander.defineImg("./assets/backgrounds/commanderMainMenu/idle0.png", 229, 33);
		planesFlyby.defineLinear(520, -100, "linear", 20);
		planesFlyby.chainAnimation(planesFlyby);
		driverIdle.defineKeyframes([
			new animationKeyframe("./assets/backgrounds/driverMainMenu/idle0.png", 500),
			new animationKeyframe("./assets/backgrounds/driverMainMenu/idle1.png", 500),
			new animationKeyframe("./assets/backgrounds/driverMainMenu/idle2.png", 1000),
			new animationKeyframe("./assets/backgrounds/driverMainMenu/idle3.png", 500),
		]);
		commanderIdle.defineKeyframes([
			new animationKeyframe("./assets/backgrounds/commanderMainMenu/idle0.png", 1500),
			new animationKeyframe("./assets/backgrounds/commanderMainMenu/idle1.png", 1500)
		])

		//Interface layer
		const interfaceLayer = rendererObject.newLayer("interfaceLayer", []);
		const gameLogo = interfaceLayer.newObject("gameLogo", "img");
		const playButton = interfaceLayer.newObject("playButton", "img");
		const settingsButton = interfaceLayer.newObject("settingsButton", "img");
		const aboutButton = interfaceLayer.newObject("aboutButton", "img");
		gameLogo.defineImg("./assets/game_logo.png", 15, 0);
		playButton.defineImg("./assets/buttons/play_button.png", 20, 90);
		settingsButton.defineImg("./assets/buttons/settings_button.png", 20, 114);
		aboutButton.defineImg("./assets/buttons/about_button.png", 20, 138);
		playButton.hoverEvent = function(){
			this.defineImg("./assets/buttons/play_button_highlighted.png", 20, 90);
		};
		playButton.unhoverEvent = function(){
			this.defineImg("./assets/buttons/play_button.png", 20, 90);
		};
		playButton.clickEvent = function(){
			hoverEventHandler.clear();
			clickEventHandler.clear();

			const overlayLayer = rendererObject.getLayer("overlayLayer");
			const overlayRect = overlayLayer.getObject("overlayRect");
			const fadeIn = overlayRect.getAnimation("fadeIn");
			fadeIn.playAnimation();
		};
		settingsButton.hoverEvent = function(){
			this.defineImg("./assets/buttons/settings_button_highlighted.png", 20, 114);
		};
		settingsButton.unhoverEvent = function(){
			this.defineImg("./assets/buttons/settings_button.png", 20, 114);
		};
		settingsButton.clickEvent = function(){
			console.log("Settings kliknięte!");
		};
		aboutButton.hoverEvent = function(){
			this.defineImg("./assets/buttons/about_button_highlighted.png", 20, 138);
		};
		aboutButton.unhoverEvent = function(){
			this.defineImg("./assets/buttons/about_button.png", 20, 138);
		};
		aboutButton.clickEvent = function(){
			hoverEventHandler.clear();
			clickEventHandler.clear();

			const overlayLayer = rendererObject.getLayer("overlayLayer");
			const overlayRect = overlayLayer.getObject("overlayRect");;
			const darken = overlayRect.getAnimation("darken");
			darken.playAnimation();

			const aboutBoxLayer = rendererObject.newLayer("aboutBoxLayer", []);
			const aboutBox = aboutBoxLayer.newObject("aboutBox", "9sliceBox");
			const closeButton = aboutBoxLayer.newObject("closeButton", "img");
			const aboutHeader = aboutBoxLayer.newObject("aboutHeader", "text");
			const aboutText1 = aboutBoxLayer.newObject("aboutText1", "text");
			const aboutText2 = aboutBoxLayer.newObject("aboutText2", "text");
			const aboutText3 = aboutBoxLayer.newObject("aboutText3", "text");
			const aboutText4 = aboutBoxLayer.newObject("aboutText4", "text");
			const aboutText5 = aboutBoxLayer.newObject("aboutText5", "text");
			const aboutText6 = aboutBoxLayer.newObject("aboutText6", "text");
			const aboutText7 = aboutBoxLayer.newObject("aboutText7", "text");
			aboutBox.define9sliceBox(70, 32, 180, 120);
			closeButton.defineImg("./assets/ui/9slice/close.png", 236, 31);
			closeButton.hoverEvent = function(){
				this.defineImg("./assets/ui/9slice/close_highlighted.png", 236, 31);
			};
			closeButton.unhoverEvent = function(){
				this.defineImg("./assets/ui/9slice/close.png", 236, 31);
			};
			closeButton.clickEvent = function(){
				const interfaceLayer = rendererObject.getLayer("interfaceLayer");
				const playButton = interfaceLayer.getObject("playButton");
				const settingsButton = interfaceLayer.getObject("settingsButton");
				const aboutButton = interfaceLayer.getObject("aboutButton");
				const overlayLayer = rendererObject.getLayer("overlayLayer");
				const overlayRect = overlayLayer.getObject("overlayRect");
				const lighten = overlayRect.getAnimation("lighten");
				const aboutBoxLayer = rendererObject.getLayer("aboutBoxLayer");
				const aboutBoxLayerIndex = rendererObject.renderQueue.indexOf(aboutBoxLayer);
				rendererObject.renderQueue.splice(aboutBoxLayerIndex, 1);
				lighten.playAnimation();
				hoverEventHandler.addHoverableObject(playButton);
				hoverEventHandler.addHoverableObject(settingsButton);
				hoverEventHandler.addHoverableObject(aboutButton);
				clickEventHandler.addClickableObject(playButton);
				clickEventHandler.addClickableObject(settingsButton);
				clickEventHandler.addClickableObject(aboutButton);
			};
			hoverEventHandler.addHoverableObject(closeButton);
			clickEventHandler.addClickableObject(closeButton);
			aboutHeader.defineText("About", "#FFFFFF", "12px dogica", "center", 160, 55);
			aboutHeader.defineTextShadow("#000000", 1.66);
			aboutText1.defineText("FT is a personal project for my university", "#FFFFFF", "4px pixeled", "center", 160, 70);
			aboutText1.defineTextShadow("#000000", 0.66);
			aboutText2.defineText("class on JavaScript. I started working on", "#FFFFFF", "4px pixeled", "center", 160, 78);
			aboutText2.defineTextShadow("#000000", 0.66);
			aboutText3.defineText("it mid-february and continued development", "#FFFFFF", "4px pixeled", "center", 160, 86);
			aboutText3.defineTextShadow("#000000", 0.66);
			aboutText4.defineText("through the months, with hopes of creating", "#FFFFFF", "4px pixeled", "center", 160, 94);
			aboutText4.defineTextShadow("#000000", 0.66);
			aboutText5.defineText("something that's fun to play.", "#FFFFFF", "4px pixeled", "center", 160, 102);
			aboutText5.defineTextShadow("#000000", 0.66);
			aboutText6.defineText("FT is entirely free and open-source.", "#FFFFFF", "4px pixeled", "center", 160, 120);
			aboutText6.defineTextShadow("#000000", 0.66);
			aboutText7.defineText("Game by Sebastian Wasik", "#FFFFFF", "4px pixeled", "center", 192, 138);
			aboutText7.defineTextShadow("#000000", 0.66);
		};

		//Overlay layer
		const overlayLayer = rendererObject.newLayer("overlayLayer", []);
		const overlayRect = overlayLayer.newObject("overlayRect", "rect");
		const fadeOut = overlayRect.newAnimation("fadeOut", "opacity");
		const darken = overlayRect.newAnimation("darken", "opacity");
		const lighten = overlayRect.newAnimation("lighten", "opacity");
		const fadeIn = overlayRect.newAnimation("fadeIn", "opacity");
		overlayRect.defineRect("rgb(0 0 0 / 1)", 0, 0, 320, 180);
		fadeOut.defineLinear(1, 0, "linear", 2);
		fadeOut.endScript = function(){
			const interfaceLayer = rendererObject.getLayer("interfaceLayer");
			const playButton = interfaceLayer.getObject("playButton");
			const settingsButton = interfaceLayer.getObject("settingsButton");
			const aboutButton = interfaceLayer.getObject("aboutButton");

			hoverEventHandler.addHoverableObject(playButton);
			hoverEventHandler.addHoverableObject(settingsButton);
			hoverEventHandler.addHoverableObject(aboutButton);
			clickEventHandler.addClickableObject(playButton);
			clickEventHandler.addClickableObject(settingsButton);
			clickEventHandler.addClickableObject(aboutButton);
		};
		darken.defineLinear(0, 0.4, "linear", 0.1);
		lighten.defineLinear(0.4, 0, "linear", 0.1);
		fadeIn.defineLinear(0, 1, "linear", 2);
		fadeIn.endScript = function(){
			sceneTutorialIntro.load();
		}

		rendererObject.renderLoop();
		fadeOut.playAnimation();
		planesFlyby.playAnimation();
		driverIdle.playAnimation();
		commanderIdle.playAnimation();
	}
}