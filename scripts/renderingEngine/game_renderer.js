//Screen pixel resolution 320x180
//GLOBAL
const rendererObject = {
	renderQueue: [],
	context: undefined,
	intervalID: undefined,
	clear: function(){
		this.renderQueue = [];
		clearInterval(this.intervalID);
		this.intervalID = undefined
		this.render();
	},
	render: function(){
		let renderer = this;
		let canvasWidth = this.context.canvas.width;
		let canvasHeight = this.context.canvas.height;

		this.context.clearRect(0, 0, canvasWidth, canvasHeight);
		this.renderQueue.forEach(function(queueElement){
			renderer.handleLayer(queueElement);
		})
	},
	renderLoop: function(){
		if(this.intervalID == undefined){
			this.intervalID = setInterval(()=>{rendererObject.render()},  1000/60)
		}
	},
	handleLayer: function(layerObject){
		let renderer = this;
		if(layerObject.renderObjects.length > 0){
			layerObject.renderObjects.forEach(function(layerElement){
				renderer.handleObject(layerElement);
			})
		};
		if(layerObject.subLayers.length > 0){
			layerObject.subLayers.forEach(function(subLayer){
				renderer.handleLayer(subLayer);
			})
		}
	},
	handleObject: function(object){
		switch(object.type){
		case "rect":
			object.updateColorOpacity();
			this.context.fillStyle = object.color;
			this.context.fillRect(object.x, object.y, object.width, object.height);
			break;
		case "img":
			object.updateColorOpacity();
			this.context.drawImage(object.img, object.x, object.y);
			break;
		case "text":
			object.updateColorOpacity();
			this.context.font = object.font;
			this.context.fillStyle = object.color;
			this.context.textAlign = object.textAlign;
			this.context.fillText(object.text, object.x, object.y);
			break;
		case "9sliceBox":
			render9slice(object, this.context);
			break;
		default:
			console.log("[INTERNAL ERROR]: Unknown renderObject type \""+object.type+"\" of object \""+object.id+"\"");
			break;
		}
	},
	newLayer: function(id, objects){
		const newLayer = new renderLayer(id, objects);
		this.renderQueue.push(newLayer);
		return newLayer;
	},
	getLayer: function(id){
		for(let i=0; i<this.renderQueue.length; i++){
			if(this.renderQueue[i].id == id) return this.renderQueue[i];
		}
	}
}

//LOCAL
{
	const canvasObject = document.querySelector("#gameWindow");
	const canvas2D = canvasObject.getContext("2d");
	rendererObject.context = canvasObject.getContext("2d");
	let canvasHeight = 1;
	let canvasWidth = 1;
	let windowHeight = window.innerHeight;
	let windowWidth = window.innerWidth;

	function updateCanvasSize(){
		windowHeight = window.innerHeight;	//Update window size
		windowWidth = window.innerWidth;

		canvasWidth = window.innerWidth;	//Try fitting the window horizontally
		canvasHeight = canvasWidth/16*9;
		if(canvasHeight < windowHeight){
			canvasObject.width = canvasWidth;
			canvasObject.height = canvasHeight;
		}else{								//If too big, try vertically
			canvasHeight = windowHeight;		//374
			canvasWidth = (canvasHeight/9)*16;
			canvasObject.width = canvasWidth;
			canvasObject.height = canvasHeight;
		}

		let canvasScale = canvasWidth/320;
		canvas2D.setTransform(1, 0, 0, 1, 0, 0);
		canvas2D.scale(canvasScale, canvasScale);
		canvas2D.imageSmoothingEnabled = false;
	};

	updateCanvasSize();
	window.addEventListener("resize", updateCanvasSize);
	rendererObject.intervalID = setInterval(()=>{rendererObject.render()},  1000/60)
}