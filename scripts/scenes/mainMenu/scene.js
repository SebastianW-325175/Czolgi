const sceneMainMenu = {
	load: function(){
		rendererObject.clear();
		hoverEventHandler.clear();
		clickEventHandler.clear();

		//Background layer
		const backgroundLayer = rendererObject.newLayer("backgroundLayer", []);
		const backgroundColor = backgroundLayer.newObject("backgroundColor", "rect")
		const tankers = backgroundLayer.newObject("tankers", "img");
		backgroundColor.defineRect("#FFFFFF", 0, 0, 320, 180);
		tankers.defineImg("./assets/tankers.png", -50, 0);

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
		hoverEventHandler.addHoverableObject(playButton);
		playButton.hoverEvent = function(){
			this.defineImg("./assets/buttons/play_button_highlighted.png", 20, 90);
		};
		playButton.unhoverEvent = function(){
			this.defineImg("./assets/buttons/play_button.png", 20, 90);
		};
		clickEventHandler.addClickableObject(playButton);
		playButton.clickEvent = function(){
			console.log("Play kliknięte!");
		};
		hoverEventHandler.addHoverableObject(settingsButton);
		settingsButton.hoverEvent = function(){
			this.defineImg("./assets/buttons/settings_button_highlighted.png", 20, 114);
		};
		settingsButton.unhoverEvent = function(){
			this.defineImg("./assets/buttons/settings_button.png", 20, 114);
		};
		clickEventHandler.addClickableObject(settingsButton);
		settingsButton.clickEvent = function(){
			console.log("Settings kliknięte!");
		};
		hoverEventHandler.addHoverableObject(aboutButton);
		aboutButton.hoverEvent = function(){
			this.defineImg("./assets/buttons/about_button_highlighted.png", 20, 138);
		};
		aboutButton.unhoverEvent = function(){
			this.defineImg("./assets/buttons/about_button.png", 20, 138);
		};
		clickEventHandler.addClickableObject(aboutButton);
		aboutButton.clickEvent = function(){
			const overlayLayer = rendererObject.getLayer("overlayLayer");
			const overlayRect = overlayLayer.getObject("overlayRect");;
			const darken = overlayRect.getAnimation("darken");
			darken.playAnimation();

			const aboutBoxLayer = rendererObject.newLayer("aboutBoxLayer", []);
			const aboutBox = aboutBoxLayer.newObject("aboutBox", "9sliceBox");
			const aboutHeader = aboutBoxLayer.newObject("aboutHeader", "text");
			const aboutText1 = aboutBoxLayer.newObject("aboutText1", "text");
			const aboutText2 = aboutBoxLayer.newObject("aboutText2", "text");
			aboutBox.define9sliceBox(80, 40, 160, 100);
			aboutHeader.defineText("About", "#FFFFFF", "12px dogica", "center", 160, 55);
			aboutText1.defineText("FT is a personal project for my", "#FFFFFF", "6px dogica", "center", 160, 70);
			aboutText2.defineText("university class on JavaScript.", "#FFFFFF", "6px dogica", "center", 160, 78);
		};

		//Overlay layer
		const overlayLayer = rendererObject.newLayer("overlayLayer", []);
		const overlayRect = overlayLayer.newObject("overlayRect", "rect");
		const fadeOut = overlayRect.newAnimation("fadeOut", "opacity");
		const darken = overlayRect.newAnimation("darken", "opacity");
		const lighten = overlayRect.newAnimation("lighten", "opacity");;
		overlayRect.defineRect("rgb(0 0 0 / 1)", 0, 0, 320, 180);
		fadeOut.defineAnimation(1, 0, "linear", 2);
		darken.defineAnimation(0, 0.4, "linear", 0.1);
		lighten.defineAnimation(0.4, 0, "linear", 0.1);

		rendererObject.renderLoop();
		fadeOut.playAnimation();
	}
}