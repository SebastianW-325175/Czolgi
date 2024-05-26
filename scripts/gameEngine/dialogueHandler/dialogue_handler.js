const dialogueHandler = {
	dialogueInit(){
		const interfaceLayer = rendererObject.getLayer("interfaceLayer");
		if(!interfaceLayer.getSublayer("dialogueBoxLayer")){
			const dialogueBoxLayer = interfaceLayer.newSublayer("dialogueBoxLayer", []);
			const dialogueTextLayer = dialogueBoxLayer.newSublayer("dialogueTextLayer", []);
		}
	},
	showDialogue(textArray){
		const interfaceLayer = rendererObject.getLayer("interfaceLayer");
		const dialogueBoxLayer = interfaceLayer.getSublayer("dialogueBoxLayer");
		const dialogueTextLayer = dialogueBoxLayer.getSublayer("dialogueTextLayer");
		const dialogueBox = dialogueBoxLayer.newObject("dialogueBox", "9sliceBox");
		dialogueBox.define9sliceBox(3, 113, 314, 64);
		dialogueTextLayer.renderObjects = [];
		for(let i=0; i<textArray.length; i++){
			const text = dialogueTextLayer.newObject("dialogueText"+i, "text");
			text.defineText(textArray[i], "#FFFFFF", "6px Dogica", "left", 19, 129+(10*i));
			text.defineTextShadow("#000000", 0.75)
		}
		const interactKey = controlsMapping.interact;
		const proceedText = dialogueBoxLayer.newObject("proceedText", "text");
		proceedText.defineText(interactKey+" to continue", "#FFFFFF", "6px pixeled", "right", 305, 168);
		proceedText.defineTextShadow("#000000", 1.33)
	},
	hideDialogue(){
		const interfaceLayer = rendererObject.getLayer("interfaceLayer");
		const dialogueBoxLayer = interfaceLayer.getSublayer("dialogueBoxLayer");
		const dialogueTextLayer = dialogueBoxLayer.getSublayer("dialogueTextLayer");
		dialogueBoxLayer.renderObjects = [];
		dialogueTextLayer.renderObjects = [];
	}
}