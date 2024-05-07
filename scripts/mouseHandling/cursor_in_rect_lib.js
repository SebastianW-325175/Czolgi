function cursorInRect(cursorX, cursorY, x, y, width, height){
	isInX = x < cursorX && cursorX < x+width;
	isInY = y < cursorY && cursorY < y+height;
	return isInX && isInY;
}