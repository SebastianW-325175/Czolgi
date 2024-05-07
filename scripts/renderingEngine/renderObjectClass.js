class renderObject {
	id;
	type;	//rect, img
	color;
	opacity;
	img;
	text;
	textAlign;
	x;
	y;
	width;
	height;
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
	};
	defineImg(img, x, y){
		const imageSrc = new Image();
		imageSrc.src = img;
		imageSrc.addEventListener("load", ()=>{
			this.img = imageSrc;
			this.width = imageSrc.naturalWidth;
			this.height = imageSrc.naturalHeight;
		});
		this.x = x;
		this.y = y;
	};
	defineText(text, color, font, textAlign, x, y){
		this.text = text;
		this.color = color;
		this.font = font;
		this.textAlign = textAlign;
		this.x = x;
		this.y = y;
	};
	define9sliceBox(x, y, width, height){
		const middleTexture = new Image();
		middleTexture.src = "./assets/ui/9slice/middle.png";
		middleTexture.addEventListener("load", ()=>{
			this.img = middleTexture;
		});
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
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