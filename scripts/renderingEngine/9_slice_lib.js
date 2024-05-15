function render9slice(object, context){
	let heightLeft = object.height;
	let tileWidth = undefined;
	let tileHeight = undefined;
	let tileX = object.x;
	let tileY = object.y;

	//Top left corner
	context.drawImage(object.imgComponents[0], object.x, object.y);
	tileX += 16;
	//Top edge
	for(let widthLeft = object.width-32; widthLeft > 0; widthLeft -= tileWidth){
		if(widthLeft>48) tileWidth = 48;
		else tileWidth = widthLeft;
		context.drawImage(object.imgComponents[1], 0, 0, tileWidth, 16, tileX, tileY, tileWidth, 16);
		tileX += tileWidth;
	};
	//Top right corner
	context.drawImage(object.imgComponents[2], tileX, object.y);
	heightLeft -= 16;
	tileY += 16;
	tileX = object.x
	//Middle parts	 - TODO
	for(; heightLeft > 16; heightLeft -= tileHeight){
		if(heightLeft>64) tileHeight = 48;
		else tileHeight = heightLeft-16;
		//Left edge
		context.drawImage(object.imgComponents[3], 0, 0, 16, tileHeight, tileX, tileY, 16, tileHeight);
		tileX += 16;
		//Middle part
		for(let widthLeft = object.width-32; widthLeft > 0; widthLeft -= tileWidth){
			if(widthLeft>48) tileWidth = 48;
			else tileWidth = widthLeft;
			context.drawImage(object.imgComponents[4], 0, 0, tileWidth, tileHeight, tileX, tileY, tileWidth, tileHeight);
			tileX += tileWidth;
		}
		//Right edge
		context.drawImage(object.imgComponents[5], 0, 0, 16, tileHeight, tileX, tileY, 16, tileHeight);
		tileY += tileHeight;
		tileX = object.x;
	};
	//Bottom left corner
	context.drawImage(object.imgComponents[6], tileX, tileY);
	tileX += 16;
	//Bottom edge
	for(let widthLeft = object.width-32; widthLeft > 0; widthLeft -= tileWidth){
		if(widthLeft>48) tileWidth = 48;
		else tileWidth = widthLeft;
		context.drawImage(object.imgComponents[7], 0, 0, tileWidth, 16, tileX, tileY, tileWidth, 16);
		tileX += tileWidth;
	};
	//Bottom right corner
	context.drawImage(object.imgComponents[8], tileX, tileY);
}