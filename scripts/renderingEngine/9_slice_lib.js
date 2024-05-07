function render9slice(object, context){
	let widthLeft = object.width;
	let heightLeft = object.height;
	let tileWidth = undefined;
	let tileHeight = undefined;
	let tileX = object.x;
	let tileY = object.y;

	while(heightLeft > 0){
		tileX = object.x;
		widthLeft = object.width
		if(heightLeft>48) tileHeight = 48;
		else tileHeight = heightLeft;
		while(widthLeft > 0){
			if(widthLeft>48) tileWidth = 48;
			else tileWidth = widthLeft;
			context.drawImage(object.img, 0, 0, tileWidth, tileHeight, tileX, tileY, tileWidth, tileHeight);
			widthLeft -= tileWidth;
			tileX += tileWidth;
		};
		heightLeft -= tileHeight;
		tileY += tileHeight
	}
}