class renderObject {
	id;
	type;	//rect, img
	color;
	img;
	x;
	y;
	width;
	height;
	constructor(id, type){
		this.id = id;
		this.type = type;
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
		});
		this.x = x;
		this.y = y;
	}
}