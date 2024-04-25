//Screen pixel resolution 320x180
//GLOBAL
const rendererObject = {
	renderQueue: [],
	context: undefined,
	render: function(){
		let renderer = this;
		let canvasWidth = this.context.canvas.width;
		let canvasHeight = this.context.canvas.height;

		this.context.clearRect(0, 0, canvasWidth, canvasHeight);
		this.renderQueue.forEach(function(queueElement){
			renderer.handleLayer(queueElement);
		})
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
			this.context.fillStyle = object.color;
			this.context.fillRect(object.x, object.y, object.width, object.height);
			break;
		case "img":
			this.context.drawImage(object.img, object.x, object.y);
			break;
		default:
			console.log("[INTERNAL ERROR]: Unknown renderObject type \""+object.type+"\" of object \""+object.id+"\"");
			break;
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
	setInterval(()=>{rendererObject.render()},  1000/60)
}