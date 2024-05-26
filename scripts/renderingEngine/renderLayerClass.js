class renderLayer {
	id;
	offsetEnabled = false;
	renderObjects = [];
	subLayers = [];
	constructor(id, renderObjects, subLayers){
		this.id = id;
		this.renderObjects.forEach((element)=>this.renderObjects.push(element));
		this.subLayers.forEach((element)=>this.subLayers.push(element));
	};
	getObject(id){
		for(let i=0; i<this.renderObjects.length; i++){
			if(this.renderObjects[i].id == id) return this.renderObjects[i];
		}
	};
	getSublayer(id){
		for(let i=0; i<this.subLayers.length; i++){
			if(this.subLayers[i].id == id) return this.subLayers[i];
		}
	};
	newObject(id, type){
		const newObject = new renderObject(id, type);
		this.renderObjects.push(newObject);
		return newObject;
	};
	addObject(object){
		this.renderObjects.push(object);
	};
	newSublayer(id, objects){
		const newSublayer = new renderLayer(id, objects);
		this.subLayers.push(newSublayer);
		return newSublayer;
	};
	enableOffset(variable){
		if(variable != undefined) this.offsetEnabled = variable;
		else this.offsetEnabled = true;
	}
}