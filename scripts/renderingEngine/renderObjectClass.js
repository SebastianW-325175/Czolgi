class renderObject {
	id;
	type;	//rect, img
	color;
	opacity;
	img;
	imgComponents = [];
	text;
	shadowColor;
	shadowSize;
	textAlign;
	x;
	y;
	width;
	height;
	rotation;
	rotationOrigin;
	animations = [];
	hovered;
	hoverEvent;
	unhoverEvent;
	clickEvent;
	constructor(id, type){
		this.id = id;
		this.type = type;
	};
	getAnimation(id){
		for(let i=0; i<this.animations.length; i++){
			if(this.animations[i].id == id) return this.animations[i];
		}
	};
	defineRect(color, x, y, width, height){
		this.color = color;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.rotation = 0;
		this.rotationOrigin = [
			this.width/2,
			this.height/2
		];
	};
	defineImg(img, x, y){
		const imageSrc = new Image();
		imageSrc.src = img;
		imageSrc.addEventListener("load", ()=>{
			this.img = imageSrc;
			this.width = imageSrc.naturalWidth;
			this.height = imageSrc.naturalHeight;
			this.rotationOrigin = [
				this.width/2,
				this.height/2
			];
		});
		this.x = x;
		this.y = y;
		this.rotation = 0;
	};
	defineText(text, color, font, textAlign, x, y){
		this.text = text;
		this.color = color;
		this.font = font;
		this.textAlign = textAlign;
		this.x = x;
		this.y = y;
	};
	defineTextShadow(shadowColor, shadowSize){
		this.shadowColor = shadowColor;
		this.shadowSize = shadowSize;
	};
	define9sliceBox(x, y, width, height){
		if(width<32) this.width = 32;
		else this.width = width;
		if(height<32) this.height = 32;
		else this.height = height;
		this.x = x;
		this.y = y;

		const topLeftComponent = new Image();
		topLeftComponent.src = "./assets/ui/9slice/top_left.png";
		topLeftComponent.addEventListener("load", ()=>{this.imgComponents[0] = topLeftComponent});
		const topComponent = new Image();
		topComponent.src = "./assets/ui/9slice/top.png";
		topComponent.addEventListener("load", ()=>{this.imgComponents[1] = topComponent});
		const topRightComponent = new Image();
		topRightComponent.src = "./assets/ui/9slice/top_right.png";
		topRightComponent.addEventListener("load", ()=>{this.imgComponents[2] = topRightComponent});
		const leftComponent = new Image();
		leftComponent.src = "./assets/ui/9slice/left.png";
		leftComponent.addEventListener("load", ()=>{this.imgComponents[3] = leftComponent});
		const middleComponent = new Image();
		middleComponent.src = "./assets/ui/9slice/middle.png";
		middleComponent.addEventListener("load", ()=>{this.imgComponents[4] = middleComponent});
		const rightComponent = new Image();
		rightComponent.src = "./assets/ui/9slice/right.png";
		rightComponent.addEventListener("load", ()=>{this.imgComponents[5] = rightComponent});
		const bottomLeftComponent = new Image();
		bottomLeftComponent.src = "./assets/ui/9slice/bottom_left.png";
		bottomLeftComponent.addEventListener("load", ()=>{this.imgComponents[6] = bottomLeftComponent});
		const bottomComponent = new Image();
		bottomComponent.src = "./assets/ui/9slice/bottom.png";
		bottomComponent.addEventListener("load", ()=>{this.imgComponents[7] = bottomComponent});
		const bottomRightComponent = new Image();
		bottomRightComponent.src = "./assets/ui/9slice/bottom_right.png";
		bottomRightComponent.addEventListener("load", ()=>{this.imgComponents[8] = bottomRightComponent});
	};
	updateColorOpacity(){
		if(this.opacity != undefined) this.color = this.color.split("/")[0]+"/ "+this.opacity+"\)";
	};
	newAnimation(id, attribute){
		const newAnimationObject = new animationObject(id, this, attribute);
		this.animations.push(newAnimationObject);
		return newAnimationObject;
	}
}