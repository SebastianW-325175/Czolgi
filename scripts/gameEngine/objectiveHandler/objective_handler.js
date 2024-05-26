const objectiveHandler = {
	intervalID: undefined,
	condition: undefined,
	dataRegistry: new Map([]),
	conditionMet(){
		printf("Condition met, but no end script available.");
	},
	setCondition(condition){
		this.condition = condition;
		this.intervalID = setInterval(function(){objectiveHandler.testCondition()}, 1000/60);
	},
	testCondition(){
		if(this.condition()){
			clearInterval(this.intervalID);
			this.intervalID = undefined;
			this.condition = undefined;
			this.conditionMet();
		}
	},
	broadcastInit(){
		const interfaceLayer = rendererObject.getLayer("interfaceLayer");
		if(!interfaceLayer.getSublayer("objectiveBoxLayer")){
			const objectiveBoxLayer = interfaceLayer.newSublayer("objectiveBoxLayer", []);
			const objectiveBox = objectiveBoxLayer.newObject("objectiveBox", "9sliceBox");
			const objectiveText = objectiveBoxLayer.newObject("objectiveText", "text");
			const objectiveBoxAppear = objectiveBox.newAnimation("appear", "x");
			const objectiveTextAppear = objectiveText.newAnimation("appear", "x");
			const objectiveBoxDisappear = objectiveBox.newAnimation("disappear", "x");
			const objectiveTextDisappear = objectiveText.newAnimation("disappear", "x");
			objectiveBox.define9sliceBox(320, 3, 32, 32);
			objectiveText.defineText("", "#FFFFFF", "6px Dogica", "right", 320, 22);
			objectiveText.defineTextShadow("#000000", 0.75)
			objectiveBoxAppear.defineLinear(320, 288, "linear", 0.5);
		}
	},
	broadcast(text){
		const interfaceLayer = rendererObject.getLayer("interfaceLayer");
		const objectiveBoxLayer = interfaceLayer.getSublayer("objectiveBoxLayer");
		const objectiveBox = objectiveBoxLayer.getObject("objectiveBox");
		const objectiveText = objectiveBoxLayer.getObject("objectiveText");
		const objectiveBoxAppear = objectiveBox.getAnimation("appear");
		const objectiveTextAppear = objectiveText.getAnimation("appear");
		const objectiveBoxDisappear = objectiveBox.getAnimation("disappear");
		const objectiveTextDisappear = objectiveText.getAnimation("disappear");

		rendererObject.context.font = "6px Dogica"
		const textWidth = rendererObject.context.measureText(text).width;
		objectiveBox.define9sliceBox(320, 3, 32+textWidth, 32);
		objectiveBoxAppear.defineLinear(320, 288-textWidth, "linear", 0.5);
		objectiveBoxDisappear.defineLinear(288-textWidth, 320, "linear", 0.5);

		objectiveText.defineText(text, "#FFFFFF", "6px Dogica", "right", 320+textWidth, 22);
		objectiveTextAppear.defineLinear(336+textWidth, 304, "linear", 0.5);
		objectiveTextDisappear.defineLinear(304, 336+textWidth, "linear", 0.5);
		
		objectiveBoxAppear.playAnimation();
		objectiveTextAppear.playAnimation();
	},
	hideBroadcast(){
		const interfaceLayer = rendererObject.getLayer("interfaceLayer");
		const objectiveBoxLayer = interfaceLayer.getSublayer("objectiveBoxLayer");
		const objectiveBox = objectiveBoxLayer.getObject("objectiveBox");
		const objectiveText = objectiveBoxLayer.getObject("objectiveText");

		objectiveBox.getAnimation("disappear").playAnimation();
		objectiveText.getAnimation("disappear").playAnimation();
	}
}