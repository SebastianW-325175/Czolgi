{
	const body = document.querySelector("body");
	body.style.cursor = "url(./assets/cursor/cursor0.png) 6 21, auto"

	body.addEventListener("mousedown", changeCursor);
	body.addEventListener("mouseup", changeCursor);

	function changeCursor(event){
		if(event.type == "mousedown") body.style.cursor = "url(./assets/cursor/cursor1.png) 9 18, auto"
		else body.style.cursor = "url(./assets/cursor/cursor0.png) 6 21, auto"
	}
}