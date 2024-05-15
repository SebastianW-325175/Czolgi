//Screen pixel resolution 320x180
//GLOBAL
const rendererObject = {
	renderQueue: [],
	context: undefined,
	intervalID: undefined,
	camera: {
		position: [0,0],
		zoom: 1,
		enabled: false,
		offsetX: 0,
		offsetY: 0
	},
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

		this.camera.offsetX = (-this.camera.position[0])+160;
		this.camera.offsetY = (-this.camera.position[1])+90;

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
			layerObject.renderObjects.forEach(function(layerElement, offsetEnabled){
				renderer.handleObject(layerElement, layerObject.offsetEnabled);
			})
		};
		if(layerObject.subLayers.length > 0){
			layerObject.subLayers.forEach(function(subLayer){
				renderer.handleLayer(subLayer);
			})
		}
	},
	handleObject: function(object, offsetEnabled){
		this.context.save();
		if(offsetEnabled){
			this.context.scale(this.camera.zoom, this.camera.zoom);
			this.context.translate(
				((320-(320/this.camera.zoom))/2)*-1,
				((180-(180/this.camera.zoom))/2)*-1
			);
		}
		switch(object.type){
		case "rect":
			object.updateColorOpacity();
			this.context.fillStyle = object.color;
			this.context.fillRect(
				object.x+(this.camera.offsetX*offsetEnabled),
				object.y+(this.camera.offsetY*offsetEnabled),
				object.width,
				object.height
			);
			break;
		case "img":
			object.updateColorOpacity();
			this.context.drawImage(
				object.img, 
				object.x+(this.camera.offsetX*offsetEnabled), 
				object.y+(this.camera.offsetY*offsetEnabled)
			);
			break;
		case "text":
			object.updateColorOpacity();
			this.context.font = object.font;
			this.context.textAlign = object.textAlign;
			if(object.shadowColor != undefined){
				this.context.fillStyle = object.shadowColor;
				this.context.fillText(
					object.text, 
					object.x+(this.camera.offsetX*offsetEnabled), 
					object.y+object.shadowSize+(this.camera.offsetY*offsetEnabled)
				);
			}
			this.context.fillStyle = object.color;
			this.context.fillText(
				object.text, 
				object.x+(this.camera.offsetX*offsetEnabled), 
				object.y+(this.camera.offsetY*offsetEnabled)
			);
			break;
		case "9sliceBox":
			render9slice(object, this.context);
			break;
		default:
			console.log("[INTERNAL ERROR]: Unknown renderObject type \""+object.type+"\" of object \""+object.id+"\"");
			break;
		}
		this.context.restore();
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
	rendererObject.intervalID = setInterval(()=>{rendererObject.render()}, 1000/60)
}