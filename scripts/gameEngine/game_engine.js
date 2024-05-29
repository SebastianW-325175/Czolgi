const gameEngine = {
	intervalID: undefined,
	gameObjects: [],
	controlledObject: undefined,
	clear: function(){
		if(this.intervalID){
			clearInterval(this.intervalID);
			this.intervalID = undefined;
		};
		this.gameObjects = [];
		this.controlledObject = undefined;
	},
	tick: function(){
		if(this.controlledObject){
			this.controlledObject.updateControls();
			this.controlledObject.attachedObjects.forEach(function(object){
				object.updateControls();
			});
			this.controlledObject.updateInteraction();
			rendererObject.camera.position[0] = this.controlledObject.position[0];
			rendererObject.camera.position[1] = this.controlledObject.position[1];
		}
		this.gameObjects.forEach(function(object){
			object.updateSprite();
			object.ai();
		})
	},
	tickLoop: function(){
		if(this.intervalID == undefined){
			this.intervalID = setInterval(()=>{gameEngine.tick()},  1000/60)
		}
	},
	getObject: function(id){
		for(let i=0; i<this.gameObjects.length; i++){
			if(this.gameObjects[i].id == id) return this.gameObjects[i];
		}
	},
	newObject: function(id){
		const newObject = new gameObject(id);
		this.gameObjects.push(newObject);
		return newObject;
	}
}