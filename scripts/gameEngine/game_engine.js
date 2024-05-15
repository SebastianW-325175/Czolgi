const gameEngine = {
	intervalID: undefined,
	gameObjects: [],
	controlledObject: undefined,
	tick: function(){
		if(this.controlledObject != undefined){
			this.controlledObject.updateControls();
		}
		this.gameObjects.forEach(function(object){
			object.updateSprite();
		})
	},
	tickLoop: function(){
		if(this.intervalID == undefined){
			this.intervalID = setInterval(()=>{gameEngine.tick()},  1000/60)
		}
	},
	newObject: function(id){
		const newObject = new gameObject(id);
		this.gameObjects.push(newObject);
		return newObject;
	}
}