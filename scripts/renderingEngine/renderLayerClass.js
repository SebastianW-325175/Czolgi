class renderLayer {
	id;
	renderObjects = [];
	subLayers = [];
	constructor(id, renderObjects, subLayers) {
		this.id = id;
		renderObjects.forEach((element)=>this.renderObjects.push(element));
		subLayers.forEach((element)=>this.subLayers.push(element));
	}
}